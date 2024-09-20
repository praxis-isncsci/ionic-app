<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="currentMeta" class="worksheet-info">
      <div class="worksheet-name">Worksheet Name: {{ currentMeta.name }}</div>
      <div class="worksheet-exam-date">
        Exam Date: {{ currentMeta.examDate.toISOString().slice(0, 10) }}
      </div>
      <input type="hidden" id="worksheet-id" name="worksheet-id" :value="currentMeta.id" />
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
import { ref, onMounted } from 'vue';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IWorksheetMetaItem, Worksheets } from '@/utils/worksheetUtils';
import { useRoute } from 'vue-router';
import router from '@/router';
import {
  promptFoNameExist,
  promptForUniqueWorksheetName,
  showUnsavedDataAlert,
} from '@/utils/unsavedDataAlert';

const worksheets = Worksheets.getInstance();
const route = useRoute();
const isncsciControlRef = ref<InstanceType<typeof IsncsciControl> | null>(null);
const currentMeta = ref<IWorksheetMetaItem | null>(null);

let isDirty = false;
let loadingData = false;

const handleFormChange = () => {
  if (loadingData) return; // ignore changes during data loading
  if (!isncsciControlRef.value) return;

  const isFormEmpty = isncsciControlRef.value.isFormEmpty();

  if (isFormEmpty) {
    isDirty = false; // form is empty, no unsaved changes
  } else {
    isDirty = true; // form has data, mark as dirty
  }
};

const handleNavigation = async (path: string) => {
  if (isDirty) {
    const shouldSave = await showUnsavedDataAlert();
    if (shouldSave) {
      await save_onClick();
    } else {
      isDirty = false;
    }
  }
  router.push(path);
};

const calculate_onClick = async () => {
  const isSuccess = await isncsciControlRef.value?.calculate();
  if (isSuccess) {
    // true if user made changes
  } else {
    console.log('Error in ISNCSCI calculation');
  }
};

const save_onClick = async () => {
  if (!isncsciControlRef.value) return;

  const isFormEmpty = isncsciControlRef.value.isFormEmpty();
  if (isFormEmpty) {
    console.log('Nothing to save');
    return;
  }

  const examData: ExamData | undefined = isncsciControlRef.value.data();
  if (!examData) {
    return;
  }

  if (!currentMeta.value) {
    let name: string | null = null;
    let nameIsValid = false;

    while (!nameIsValid) {
      name = await promptForUniqueWorksheetName(worksheets.nextWorksheetName());
      if (!name) {
        // User canceled the prompt
        console.log('Save operation canceled by the user.');
        return;
      }
      if (worksheets.isNameExist(name)) {
        await promptFoNameExist();
      } else {
        nameIsValid = true; 
      }
    }
    currentMeta.value = worksheets.newWorksheet(name as string, examData);
    router.replace(`/home/${currentMeta.value.id}`);
  } else {
    worksheets.saveWorksheet({ id: currentMeta.value.id, examData });
  }

  isDirty = false; 
};

const clearExam = async () => {
  await isncsciControlRef.value?.clear();
  isDirty = false;
  currentMeta.value = null;
  console.log('Exam cleared');
  router.replace('/home');
};

onMounted(() => {
  if (route.params.id) {
    loadingData = true;
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const worksheet = worksheets.getWorksheet(id);
    if (worksheet && worksheet.examData) {
      isncsciControlRef.value?.load(worksheet.examData).then(() => {
        loadingData = false;
      });
      currentMeta.value = worksheets.getMeta(id) || null;
    } else {
      loadingData = false;
    }
  } else {
    loadingData = false;
  }

  isDirty = false;

  appStore.subscribe(() => {
    handleFormChange();
  });
});
</script>

<style scoped>
.worksheet-info {
  background-color: #F9F9F9;
  padding: 10px 16px;
}

.worksheet-name {
  font-weight: bold;
  color: #3B3B3B;
  display: flex;
  align-items: center;
}

.worksheet-exam-date {
  color: #5E5E5E;
  display: flex;
  align-items: center;
  margin-top: 2px;
}
</style>


