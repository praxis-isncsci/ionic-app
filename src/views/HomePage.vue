<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="worksheetName" class="worksheet-info">
      <div class="worksheet-name">Worksheet Name: {{ worksheetName }}</div>
      <div v-if="examDate" class="worksheet-exam-date">Exam Date: {{ examDate }}</div>
    </div>

    <IsncsciControl ref="isncsciControlRef"></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar 
        :calculateOnClick="calculate_onClick" 
        :saveOnClick="save_onClick"
        :clearExam="clearExam"
        :onNavigate="handleNavigation"
      >
      </AppNavbar>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './MainLayout.vue';
import IsncsciControl from '@/components/IsncsciControl.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { ref, reactive, onMounted, watch, toRefs } from 'vue';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IAppState } from 'isncsci-ui/dist/esm/core/boundaries';
import { APP_PREFIX } from '@/config';
import { convertExamDataToGridModel } from '@/utils/examDataHelpers';
import { promptForUniqueWorksheetName } from '@/utils/worksheetUtils';
import { clearExamUseCase } from 'isncsci-ui/dist/esm/core/useCases';
import { IExternalMessageProvider } from 'isncsci-ui/dist/esm/core/boundaries';
import { AppStoreProvider } from 'isncsci-ui/dist/esm/app/providers';
import { useRoute } from 'vue-router';
import router from '@/router';
import { showUnsavedDataAlert } from '@/utils/unsavedDataAlert';

const route = useRoute();

const isncsciControlRef = ref<InstanceType<typeof IsncsciControl> | null>(null);

const worksheetData = reactive({
  worksheetName: '',
  examDate: '',
  hasExamData: false, 
  hasUnsavedData: false,
  isPostCalculation: false, // track if the data is post-calculation
});

const handleNavigation = async (path: string) => {
  if (worksheetData.hasUnsavedData) {
    const shouldSave = await showUnsavedDataAlert();
    if (shouldSave) {
      await save_onClick();
    } else {
      // discard changes
      worksheetData.hasUnsavedData = false;
    }
  }
  router.push(path);
};

const { worksheetName, examDate } = toRefs(worksheetData);

// function to handle form changes
const handleFormChange = () => {
  worksheetData.hasUnsavedData = true;
  if (worksheetData.isPostCalculation) {
    worksheetData.isPostCalculation = false; // reset to raw input state when examData is out of date
  }
};

const calculate_onClick = async () => {
  const isSuccess = await isncsciControlRef.value?.calculate();
  if (isSuccess) {
    worksheetData.hasExamData = true;
    worksheetData.hasUnsavedData = true;
    worksheetData.isPostCalculation = true; // mark as post-calculation, examData is available
  } else {
    console.log('Error in ISNCSCI calculation');
  }
};

const generateWorksheetName = (): string => {
  const metaKey = `${APP_PREFIX}meta`;
  const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

  let worksheetNumber = 1;
  let worksheetName = `Worksheet ${worksheetNumber}`;

  const worksheetExists = (name: string) =>
    savedMeta.some((item: any) => item.name === name);

  while (worksheetExists(worksheetName)) {
    worksheetNumber += 1;
    worksheetName = `Worksheet ${worksheetNumber}`;
  }

  return worksheetName;
};

const isFormEmpty = (state: IAppState): boolean => {
  return (
    !state.gridModel.some(row => row.some(cell => cell && cell.value)) && 
    !state.vac && 
    !state.dap && 
    !state.rightLowestNonKeyMuscleWithMotorFunction && 
    !state.leftLowestNonKeyMuscleWithMotorFunction && 
    !state.comments
  );
};

const save_onClick = async () => {
  const state: IAppState = appStore.getState();
  const examData: ExamData | null = isncsciControlRef.value?.data() ?? null;
  const metaKey = `${APP_PREFIX}meta`;
  const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

  console.log("examData:",examData)
  if (isFormEmpty(state)) {
    console.log("Form is empty, nothing to save");
    return;
  }

  if (!worksheetData.hasUnsavedData) {
    console.log("No changes to save");
    return;
  }

  let worksheetId = sessionStorage.getItem('currentWorksheetId');
  let worksheetName = worksheetData.worksheetName;

  if (!worksheetId) {
    //new worksheet
    if (!worksheetName) {
      worksheetName = await promptForUniqueWorksheetName(generateWorksheetName()) || '';
      if (!worksheetName) return;
    }
    worksheetId = new Date().getTime().toString();
    worksheetData.worksheetName = worksheetName;
  } else {
    //existing worksheet
    const existingWorksheet = savedMeta.find((item: any) => item.id === worksheetId);
    if (existingWorksheet) {
      worksheetName = existingWorksheet.name; // preserve the existing name
    }
  }
  
  saveWorksheet(worksheetId, worksheetName, worksheetData.isPostCalculation ? examData : null, state);
  sessionStorage.setItem('currentWorksheetId', worksheetId);
  sessionStorage.setItem('worksheetName', worksheetName);
  worksheetData.worksheetName = worksheetName;
  worksheetData.hasUnsavedData = false;
};

const saveWorksheet = (id: string, name: string, examData: ExamData | null, state: IAppState) => {
  const metaKey =  `${APP_PREFIX}meta`;
  const savedMeta: any[] = JSON.parse(localStorage.getItem(metaKey) || '[]');

  const currentDate = new Date().toLocaleString();
  const existingWorksheetIndex = savedMeta.findIndex((item) => item.id === id);

  if (existingWorksheetIndex === -1) {

  savedMeta.push({
    id,
    name,
    savedAt: currentDate,
    examDate: currentDate
  });
  } else {
    savedMeta[existingWorksheetIndex] = {
      ...savedMeta[existingWorksheetIndex],
      name,
      savedAt: currentDate,
    };
  }

  localStorage.setItem(metaKey, JSON.stringify(savedMeta));

  const savedItemData = examData || {
    gridModel: state.gridModel, 
    vac: state.vac,  
    dap: state.dap,  
    rightLowestNonKeyMuscleWithMotorFunction: state.rightLowestNonKeyMuscleWithMotorFunction, 
    leftLowestNonKeyMuscleWithMotorFunction: state.leftLowestNonKeyMuscleWithMotorFunction, 
    comments: state.comments,
  };

  localStorage.setItem(`${APP_PREFIX}${id}`, JSON.stringify(savedItemData));
  
  // Update reactive data and session storage
  worksheetData.worksheetName = name;
  worksheetData.examDate = savedMeta.find(item => item.id === id)?.examDate || '';
  sessionStorage.setItem('worksheetName', name);
  sessionStorage.setItem('examDate', worksheetData.examDate);
  worksheetData.hasUnsavedData = false;
};

const clearExam = async () => {
  const appStoreProvider = new AppStoreProvider(appStore);
  
  const externalMessageProvider: IExternalMessageProvider = {
    sendOutExamData: async (examData: ExamData) => {
      console.log('Exam cleared:', examData);
    }
  };

  await clearExamUseCase(appStoreProvider, externalMessageProvider);

  worksheetData.hasExamData = false;
  worksheetData.hasUnsavedData = false;
  worksheetData.isPostCalculation = false;
  worksheetData.worksheetName = '';
  worksheetData.examDate = '';

  sessionStorage.removeItem('currentWorksheetId');
  sessionStorage.removeItem('worksheetName');
  sessionStorage.removeItem('examDate');

  console.log('Exam cleared');
};

const loadWorksheetData = () => {
  console.log('loadWorksheetData is called');
  const worksheetId = sessionStorage.getItem('currentWorksheetId');
  console.log('worksheetId:', worksheetId, typeof worksheetId);

  if (worksheetId) {
    const sessionWorksheetName = sessionStorage.getItem('worksheetName');
    const sessionExamDate = sessionStorage.getItem('examDate');
    console.log('sessionExamDate:', sessionExamDate);

    const metaData = JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
    console.log('metaData:', metaData);

    const currentWorksheet = metaData.find(
      (item: any) => item.id.toString() === worksheetId
    );
    console.log('currentWorksheet:', currentWorksheet);

    if (currentWorksheet) {
      worksheetData.worksheetName = currentWorksheet.name;
      worksheetData.examDate = currentWorksheet.examDate || '';

      // Update session storage
      sessionStorage.setItem('worksheetName', currentWorksheet.name);
      sessionStorage.setItem('examDate', currentWorksheet.examDate || '');
    } else if (sessionWorksheetName) {
      // Fallback to session storage if not found in local storage
      worksheetData.worksheetName = sessionWorksheetName;
      worksheetData.examDate = sessionExamDate || '';
    }

    // Load exam data and update store
    const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${worksheetId}`) || '{}');

    if (examData.asiaImpairmentScale !== undefined) {
      // Post-calculation data
      appStore.dispatch({
        type: 'SET_TOTALS',
        payload: {
          asiaImpairmentScale: examData.asiaImpairmentScale,
          injuryComplete: examData.injuryComplete,
          neurologicalLevelOfInjury: examData.neurologicalLevelOfInjury,
          // can add other totals if needed later
        }
      });
      worksheetData.isPostCalculation = true;
    }

    appStore.dispatch({
      type: 'SET_VAC_DAP',
      payload: { 
        vac: examData.voluntaryAnalContraction, 
        dap: examData.deepAnalPressure 
      }
    });

    appStore.dispatch({
      type: 'SET_EXTRA_INPUTS',
      payload: {
        rightLowestNonKeyMuscleWithMotorFunction: examData.rightLowestNonKeyMuscleWithMotorFunction,
        leftLowestNonKeyMuscleWithMotorFunction: examData.leftLowestNonKeyMuscleWithMotorFunction,
        comments: examData.comments,
      }
    });

    if (examData.gridModel) {
      appStore.dispatch({
        type: 'SET_GRID_MODEL',
        payload: examData.gridModel,
      });
    } else if (worksheetData.isPostCalculation) {
      const gridModel = convertExamDataToGridModel(examData);
      appStore.dispatch({
        type: 'SET_GRID_MODEL',
        payload: gridModel
      });
    }

    worksheetData.hasExamData = true;
    worksheetData.hasUnsavedData = false;
  } else {
    // new worksheet
    clearExam();
  }
};

onMounted(() => {
  const isEditing = sessionStorage.getItem('isEditing') === 'true';
  sessionStorage.removeItem('isEditing'); // remove the flag after loading

  if (isEditing) {
    loadWorksheetData();
  } else {
    clearExam();
  }
  appStore.subscribe(() => {
    handleFormChange();
  });
});

// watcher to sync the worksheetName reactive property with sessionStorage
watch(() => worksheetData.worksheetName, (newName) => {
  if (newName) {
    sessionStorage.setItem('worksheetName', newName);
  } else {
    sessionStorage.removeItem('worksheetName');
  }
});

// watcher to determine if exiting worksheet data to load or to clear an exam
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/home') {
      const isEditing = sessionStorage.getItem('isEditing') === 'true';
      sessionStorage.removeItem('isEditing');

      if (isEditing) {
        loadWorksheetData();
      } else {
        clearExam();
      }
    }
  }
);

</script>

<style scoped>
.worksheet-info {
  margin-bottom: 10px;
}
.worksheet-name, .worksheet-exam-date {
  font-weight: bold;
}
</style>