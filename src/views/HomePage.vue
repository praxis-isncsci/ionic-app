<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="worksheetData.worksheetName" class="worksheet-name">
      Worksheet Name: {{ worksheetData.worksheetName }}
    </div>
    <IsncsciControl ref="isncsciControlRef"></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar 
        :calculateOnClick="calculate_onClick" 
        :saveOnClick="save_onClick"
      >
      </AppNavbar>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './MainLayout.vue';
import IsncsciControl from '@/components/IsncsciControl.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { ref, reactive, onMounted, watch } from 'vue';
import { alertController } from '@ionic/vue';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IAppState } from 'isncsci-ui/dist/esm/core/boundaries';
import { APP_PREFIX } from '@/config';
import { convertExamDataToGridModel } from '@/utils/examDataHelpers';
import { promptForUniqueWorksheetName } from '@/utils/worksheetUtils';

const isncsciControlRef = ref<InstanceType<typeof IsncsciControl> | null>(null);

const worksheetData = reactive({
  worksheetName: '',
  hasExamData: false, 
  hasUnsavedData: false,
  isPostCalculation: false, // track if the data is post-calculation
});

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
      worksheetName = existingWorksheet.name; // Preserve the existing name
    }
    //confirm overwrite if existing worksheet
    const alert = await alertController.create({
      header: 'Confirm Save',
      message: 'Do you want to overwrite the existing worksheet?',
      buttons: [
        { text: 'Cancel', role: 'cancel'},
        { text: 'Overwrite', role: 'confirm'}
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    if (result.role !== 'confirm') return;
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

  const savedItemMeta = {
    id,
    name,
    savedAt: new Date().toLocaleString(),
  };

  const existingWorksheetIndex = savedMeta.findIndex((item) => item.id === id);

  if (existingWorksheetIndex === -1) {
    savedMeta.push(savedItemMeta);
  } else {
    savedMeta[existingWorksheetIndex] = {
      ...savedMeta[existingWorksheetIndex],
      savedAt: savedItemMeta.savedAt,
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
  sessionStorage.setItem('worksheetName', name);
};

// Function to reset the state
const resetState = () => {
  worksheetData.worksheetName = '';
  worksheetData.hasExamData = false;
  worksheetData.hasUnsavedData = false;
  worksheetData.isPostCalculation = false;

  // Clear session storage
  sessionStorage.removeItem('currentWorksheetId');
  sessionStorage.removeItem('worksheetName');
};

onMounted(() => {
  resetState();
  const worksheetId = sessionStorage.getItem('currentWorksheetId');
  if (worksheetId) {
    const sessionWorksheetName = sessionStorage.getItem('worksheetName');
    // If not found in session storage, check local storage
    if (sessionWorksheetName) {
      worksheetData.worksheetName = sessionWorksheetName;
    } else {
      // If not in session storage, try to get it from local storage
      const metaData = JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
      const currentWorksheet = metaData.find((item: any) => item.id === worksheetId);
      if (currentWorksheet) {
        worksheetData.worksheetName = currentWorksheet.name;
        // Store in session storage for future use
        sessionStorage.setItem('worksheetName', currentWorksheet.name);
      }
    }

    const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${worksheetId}`) || '{}');
    
    if (examData.asiaImpairmentScale !== undefined) {
      // Post-calculation data
      appStore.dispatch({
        type: 'SET_TOTALS',
        payload: {
          asiaImpairmentScale: examData.asiaImpairmentScale,
          injuryComplete: examData.injuryComplete,
          neurologicalLevelOfInjury: examData.neurologicalLevelOfInjury,
          // Add other totals as needed
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
    //new worksheet
    resetState();
  }

  appStore.subscribe(() => {
    handleFormChange();
  });
});

// Add a watch on worksheetData.worksheetName
watch(() => worksheetData.worksheetName, (newName) => {
  if (newName) {
    sessionStorage.setItem('worksheetName', newName);
  } else {
    sessionStorage.removeItem('worksheetName');
  }
});
</script>

<style scoped>
.worksheet-name {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>