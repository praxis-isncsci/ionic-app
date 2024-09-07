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
import { ref, reactive, onMounted } from 'vue';
import { alertController } from '@ionic/vue';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IAppState } from 'isncsci-ui/dist/esm/core/boundaries';
import { APP_PREFIX } from '@/config';

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
    return;
  }

  if (!worksheetData.worksheetName) {
    const worksheetName = await promptForWorksheetName(savedMeta);
    if (!worksheetName) return;

    worksheetData.worksheetName = worksheetName;
  }

  const worksheetId = sessionStorage.getItem('currentWorksheetId') || new Date().getTime().toString();
  saveWorksheet(worksheetId, worksheetData.worksheetName, worksheetData.isPostCalculation ? examData : null, state);
  sessionStorage.setItem('currentWorksheetId', worksheetId);
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
    savedMeta[existingWorksheetIndex] = savedItemMeta;
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
};

// Prompt for worksheet name if none exists
const promptForWorksheetName = async (savedMeta: any[]): Promise<string | null> => {
  let worksheetName: string | null = null;
  let uniqueName = false;

  while (!uniqueName) {
    const alert = await alertController.create({
      header: 'Enter worksheet name here:',
      inputs: [{ value: generateWorksheetName() }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'OK', role: 'confirm' },
      ],
    });
    await alert.present();
    const result = await alert.onDidDismiss();

    worksheetName = result.role === 'confirm' ? result.data.values[0] : null;
    if (!worksheetName) return null;

    const nameExists = savedMeta.some((item: any) => item.name === worksheetName);

    if (nameExists) {
      const errorAlert = await alertController.create({
        header: 'Error',
        message: 'A worksheet with this name already exists. Please enter a unique name.',
        buttons: ['OK'],
      });
      await errorAlert.present();
      await errorAlert.onDidDismiss();
    } else {
      uniqueName = true;
    }
  }

  return worksheetName;
};

onMounted(() => {
  const worksheetId = sessionStorage.getItem('currentWorksheetId');
  if (worksheetId) {
    const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${worksheetId}`) || '{}');
    
    // Post-calculation, handle VAC/DAP and extra inputs
    if (examData.deepAnalPressure || examData.comments) {
      appStore.dispatch({
        type: 'SET_VAC_DAP',
        payload: { vac: examData.deepAnalPressure, dap: examData.voluntaryAnalContraction },
      });
      appStore.dispatch({
        type: 'SET_EXTRA_INPUTS',
        payload: {
          rightLowestNonKeyMuscleWithMotorFunction: examData.rightLowestNonKeyMuscleWithMotorFunction,
          leftLowestNonKeyMuscleWithMotorFunction: examData.leftLowestNonKeyMuscleWithMotorFunction,
          comments: examData.comments,
        },
      });
    } else {
      // Pre-calculation: load grid model
      const sensoryData = extractSensoryDataFromExam(examData);
      const motorData = extractMotorDataFromExam(examData);

      appStore.dispatch({
        type: 'SET_GRID_MODEL',
        payload: [...sensoryData, ...motorData],
      });
    }
  }

  sessionStorage.removeItem('currentWorksheetId');
  worksheetData.worksheetName = '';
  worksheetData.hasExamData = false;
  worksheetData.hasUnsavedData = false;

  appStore.subscribe(() => {
    handleFormChange(); // calling function when form inputs change
  });
});
</script>

<style scoped>
.worksheet-name {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>