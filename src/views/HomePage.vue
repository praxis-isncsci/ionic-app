<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="worksheetData.worksheetName" class="worksheet-name">
      Worksheet Name: {{ worksheetData.worksheetName }}
    </div>
    <IsncsciControl ref="isncsciControlRef"></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar :calculateOnClick="calculate_onClick" :saveOnClick="save_onClick">
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

const isncsciControlRef = ref<InstanceType<typeof IsncsciControl> | null>(null);

const worksheetData = reactive({
  worksheetName: '',
  hasExamData: false, // Track if examData exists
  hasUnsavedData: false, // Track if there is any unsaved data from inputs
});

const calculate_onClick = async () => {
  const isSuccess = await isncsciControlRef.value?.calculate();
  if (isSuccess) {
    worksheetData.hasExamData = true; // Set to true when calculation is successful
    worksheetData.hasUnsavedData = true; // Mark data as unsaved
  } else {
    console.log('Error in ISNCSCI calculation');
  }
};

const generateWorksheetName = () => {
  const metaKey = 'isncsci_meta';
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

const save_onClick = async () => {
  // To do - add raw data inputs values!!!!!!!!!!!!
  if (!worksheetData.hasUnsavedData && !worksheetData.hasExamData) {
    return;
  }

  const now = new Date();

  if (!worksheetData.worksheetName) {
    // If there's no worksheet name, ask the user for one
    const suggestedWorksheetName = generateWorksheetName();

    const alert = await alertController.create({
      header: 'Enter worksheet name here:',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          value: suggestedWorksheetName,
        },
      ],
    });

    await alert.present();

    const result = await alert.onDidDismiss();

    if (result.role === 'confirm') {
      const metaKey = 'isncsci_meta';
      const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');

      const worksheetId = now.getTime().toString();

      const savedItem = {
        id: worksheetId,
        name: result.data.values[0],
        savedAt: now.toLocaleString(),
      };

      savedMeta.push(savedItem);
      localStorage.setItem(metaKey, JSON.stringify(savedMeta));
      localStorage.setItem(`isncsci_${worksheetId}`, JSON.stringify(isncsciControlRef.value?.data() || {}));

      worksheetData.worksheetName = savedItem.name;

      // Mark data as saved
      worksheetData.hasUnsavedData = false;

      // Set the current worksheet ID in session storage
      sessionStorage.setItem('currentWorksheetId', worksheetId);
    }
  } else {
    // If worksheet name already exists, update the existing data
    const metaKey = 'isncsci_meta';
    const savedMeta = JSON.parse(localStorage.getItem(metaKey) || '[]');
    const worksheetId = sessionStorage.getItem('currentWorksheetId');

    let savedItem = savedMeta.find((item: any) => item.id === worksheetId);

    if (savedItem) {
      savedItem.savedAt = now.toLocaleString();
      localStorage.setItem(metaKey, JSON.stringify(savedMeta)); // Update meta data with the new save time
      localStorage.setItem(`isncsci_${worksheetId}`, JSON.stringify(isncsciControlRef.value?.data() || {}));
      // Mark data as saved
      worksheetData.hasUnsavedData = false;
    } else {
      console.error('Worksheet not found in local storage');
    }
  }
};

// Initialize a new worksheet on page load
onMounted(() => {
  sessionStorage.removeItem('currentWorksheetId');
  worksheetData.worksheetName = '';
  worksheetData.hasExamData = false;
  worksheetData.hasUnsavedData = false;
});

</script>

<style scoped>
.worksheet-name {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>








