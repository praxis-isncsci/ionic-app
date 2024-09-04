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
});

const calculate_onClick = async () => {
  const isSuccess = await isncsciControlRef.value?.calculate();
  if (isSuccess) {
    worksheetData.hasExamData = true;
    worksheetData.hasUnsavedData = true;
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
  // Check if all fields in in form are empty
  if (
    !state.gridModel.some(row => row.some(cell => cell && cell.value)) && 
    !state.vac && 
    !state.dap && 
    !state.rightLowestNonKeyMuscleWithMotorFunction && 
    !state.leftLowestNonKeyMuscleWithMotorFunction && 
    !state.comments 
  ) {
    return true; // form is empty
  }
  return false; // form has data
};

const save_onClick = async () => {
  const state: IAppState = appStore.getState();
  const examData: ExamData | null = isncsciControlRef.value?.data() ?? null;

  // Prevent saving if the form is empty
  if (isFormEmpty(state)) {
    console.log("Form is empty, nothing to save");
    return;
  }

  if (!worksheetData.hasUnsavedData && !worksheetData.hasExamData) {
    return;
  }

  if (!worksheetData.worksheetName) {
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

    if (result.role === 'confirm') {
      const worksheetId = new Date().getTime().toString();
      worksheetData.worksheetName = result.data.values[0];

      saveWorksheet(worksheetId, worksheetData.worksheetName, examData, state);

      sessionStorage.setItem('currentWorksheetId', worksheetId);
      worksheetData.hasUnsavedData = false;
    }
  } else {
    const worksheetId = sessionStorage.getItem('currentWorksheetId') || '';
    saveWorksheet(worksheetId, worksheetData.worksheetName, examData, state);
    worksheetData.hasUnsavedData = false;
  }
};

const saveWorksheet = (
  id: string, 
  name: string, 
  examData: ExamData | null, 
  state: IAppState
) => {
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


onMounted(() => {
  sessionStorage.removeItem('currentWorksheetId');
  worksheetData.worksheetName = '';
  worksheetData.hasExamData = false;
  worksheetData.hasUnsavedData = false;

  // Listen to the appStore for changes
  appStore.subscribe((state: IAppState) => {
    if (state.gridModel) {
      worksheetData.hasUnsavedData = true;
    }
  });
});

</script>

<style scoped>
.worksheet-name {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>