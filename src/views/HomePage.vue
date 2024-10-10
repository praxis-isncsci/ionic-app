<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="currentMeta" class="worksheet-info">
      <div class="worksheet-name">Worksheet Name: {{ currentMeta.name }}</div>
      <div class="worksheet-exam-date">Exam Date: {{ currentMeta.examDate.toISOString().slice(0, 10) }}</div>
      <input type="hidden" id="worksheet-id" name="worksheet-id" value="{{ currentMeta.id }}" />
    </div>

    <IsncsciControl ref="isncsciControlRef"></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar :calculateOnClick="calculate_onClick" :saveOnClick="save_onClick" :clearExam="clearExam"
        :onNavigate="handleNavigation">
      </AppNavbar>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './MainLayout.vue';
import IsncsciControl from '@/components/IsncsciControl.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import { ref, onMounted, watch } from 'vue';
import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { IWorksheetMetaItem, Worksheets } from '@/utils/worksheetUtils';
import { useRoute } from 'vue-router';
import router from '@/router';
import { promptFoNameExist, promptForUniqueWorksheetName, showUnsavedDataAlert } from '@/utils/unsavedDataAlert';
import { inputFieldNames } from '@/utils/inputFieldNames';

const worksheets = Worksheets.getInstance();
const route = useRoute();

const currentMeta = ref<IWorksheetMetaItem | null>(null);
interface IsncsciControlMethods {
  load: (examData: ExamData) => Promise<void>;
  clear: () => Promise<void>;
  calculate: () => Promise<ExamData | undefined>;
  isFormEmpty: () => boolean;
  examData: () => ExamData | undefined;
}
const isncsciControlRef = ref<IsncsciControlMethods | null>(null);

const isLoading = ref(false);

function examDataEqual(examData1: ExamData, examData2: ExamData): boolean {
  return inputFieldNames.every((field) => {
    const val1 = examData1[field];
    const val2 = examData2[field];

    if (val1 === val2) return true;

    if (
      (val1 === null || val1 === undefined || val1 === '') &&
      (val2 === null || val2 === undefined || val2 === '')
    ) {
      return true; // Treat null, undefined, and empty string as equal
    }

    return false;
  });
}

const handleNavigation = async (path: string) => {
  if (!currentMeta.value && !isncsciControlRef.value?.isFormEmpty()) {
    if (await showUnsavedDataAlert()) {
      await save_onClick();
    }
  } else if (currentMeta.value && isncsciControlRef.value) {
    const savedWorksheet = worksheets.getWorksheet(currentMeta.value.id);
    const currentExamData = isncsciControlRef.value.examData();
    const savedExamData = savedWorksheet.examData;
    if (currentExamData && !examDataEqual(currentExamData, savedExamData)) {
      if (await showUnsavedDataAlert()) {
        await save_onClick();
      }
    }
  }

  router.push(path);
};

const calculate_onClick = async () => {
  await isncsciControlRef.value?.calculate();
};

const save_onClick = async () => {
  if (!isncsciControlRef.value) return;

  const examData: ExamData | undefined = isncsciControlRef.value.examData();
  if (!examData) {
    return;
  }

  if (!currentMeta.value) {
    let name: string | null = null;
    let nameIsValid = false;

    while (!nameIsValid) {
      name = await promptForUniqueWorksheetName(worksheets.nextWorksheetName());
      if (!name) {
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
};


const clearExam = async () => {
  await isncsciControlRef.value?.clear();
  currentMeta.value = null;
  console.log('Exam cleared');
  router.replace('/home');
};

const loadWorksheet = async () => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const worksheet = worksheets.getWorksheet(id);
    if (worksheet && worksheet.examData) {
      isLoading.value = true;
      await isncsciControlRef.value?.load(worksheet.examData);
      isLoading.value = false;
    }
    const meta = worksheets.getMeta(id);
    if (meta) {
      currentMeta.value = meta;
    }
  } else {
    await isncsciControlRef.value?.clear();
    currentMeta.value = null;
  }
};

onMounted(async () => {
  await loadWorksheet();
});

watch(
  () => route.params.id,
  async () => {
    await loadWorksheet();
  }
);
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