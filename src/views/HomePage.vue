<template>
  <MainLayout title="ISNCSCI" :showFooter="true">
    <div v-if="currentMeta" class="worksheet-info">
      <div class="worksheet-name">Worksheet Name: {{ currentMeta.name }}</div>
      <div class="worksheet-exam-date">Exam Date: {{ new Date(currentMeta.examDate).toLocaleString() }}</div>
      <input type="hidden" id="worksheet-id" name="worksheet-id" value="{{ currentMeta.id }}" />
    </div>

    <IsncsciControl ref="isncsciControlRef"></IsncsciControl>

    <template #footer-buttons>
      <AppNavbar 
      :calculateOnClick="calculate_onClick" 
      :saveOnClick="save_onClick" 
      :clearExam="clearExam" 
      :exportToPDF="exportToPDF"
      :onNavigate="handleNavigation"
      :showChart="showChart"
      >
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
import { IWorksheetMetaItem, WorksheetDetails, Worksheets } from '@/utils/worksheetUtils';
import { useRoute } from 'vue-router';
import router from '@/router';
import { promptFoNameExist, promptForWorksheetDetails, showToast, showUnsavedDataAlert } from '@/utils/alertsPrompts';
import { exportPDF } from '@/utils/examDataHelpers';

const worksheets = Worksheets.getInstance();
const route = useRoute();

const currentMeta = ref<IWorksheetMetaItem | null>(null);
interface IsncsciControlMethods {
  load: (examData: ExamData) => Promise<void>;
  clear: () => Promise<void>;
  calculate: () => Promise<ExamData | undefined>;
  exportToPDF: () => Promise<void>;
  isFormEmpty: () => boolean;
  examData: () => ExamData;
  showChart: () => void;
}
const isncsciControlRef = ref<IsncsciControlMethods | null>(null);

const exportToPDF = async () => {
  if (!isncsciControlRef.value) return;

  const examData = isncsciControlRef.value.examData();

  // Use worksheet name if available, otherwise default name
  const currentDateTime = new Date();
  let name = `ISNCSCI_${currentDateTime.toISOString().replace(/[:.]/g, '-')}`;

  if (currentMeta.value && currentMeta.value.name) {
    name = currentMeta.value.name;
  }

  await exportPDF(examData, name, currentMeta.value?.examDate);
};

const isLoading = ref(false);

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== typeof obj2) return false;

  if (obj1 === null || obj2 === null) return obj1 === obj2;

  if (typeof obj1 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;

    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

function examDataEqual(examData1: ExamData, examData2: ExamData): boolean {
  return deepEqual(examData1, examData2);
}

const checkUnsavedChanges = async (): Promise<boolean> => {
  if (!currentMeta.value && !isncsciControlRef.value?.isFormEmpty()) {
    // new unsaved exam
    const shouldSave = await showUnsavedDataAlert();
    if (shouldSave) {
      await save_onClick();
    }
    // proceed whether the user chose to save or discard
    return true;
  } else if (currentMeta.value && isncsciControlRef.value) {
    // exist. exam with unsaved changes
    const savedWorksheet = worksheets.getWorksheet(currentMeta.value.id);
    const currentExamData = isncsciControlRef.value.examData();
    const savedExamData = savedWorksheet.examData;
    if (!examDataEqual(currentExamData, savedExamData)) {
      const shouldSave = await showUnsavedDataAlert();
      if (shouldSave) {
        await save_onClick();
      }
      // proceed whether the user chose to save or discard
      return true;
    }
  }
  return true;
};

const handleNavigation = async (path: string) => {
  if (!(await checkUnsavedChanges())) {
    return;
  }
  router.push(path);
};

const calculate_onClick = async () => {
  await isncsciControlRef.value?.calculate();
};

const save_onClick = async () => {
  if (!isncsciControlRef.value) return;

  const examData: ExamData = isncsciControlRef.value.examData();
  if (!examData) {
    return;
  }

  if (!currentMeta.value) {
    // new worksheet
    let worksheetDetails: WorksheetDetails | null = null;
    let nameIsValid = false;

    while (!nameIsValid) {
      worksheetDetails = await promptForWorksheetDetails(
        worksheets.nextWorksheetName(),
        new Date()
      );
      if (!worksheetDetails) {
        return;
      }
      if (worksheets.isNameExist(worksheetDetails.name)) {
        await promptFoNameExist();
      } else {
        nameIsValid = true;
      }
    }
    currentMeta.value = worksheets.newWorksheet(
      worksheetDetails!.name,
      examData,
      worksheetDetails!.examDate
    );
    router.replace(`/home/${currentMeta.value.id}`);
    await showToast('Saved successfully.');
  } else {
    // exist. worksheet
    const savedWorksheet = worksheets.getWorksheet(currentMeta.value.id);
    const savedExamData = savedWorksheet.examData;

    if (!examDataEqual(examData, savedExamData)) {
      //data changed, save and show save message
      worksheets.saveWorksheet({ id: currentMeta.value.id, examData });
      await showToast('Saved successfully.');
    } else {
      //data hasn't been changed - no message
      console.log('Nothing to save.');
    }
  }
};

const clearExam = async () => {
  if (!(await checkUnsavedChanges())) {
    return;
  }

  await isncsciControlRef.value?.clear();
  currentMeta.value = null;
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

const showChart = () => {
  if (isncsciControlRef.value) {
    isncsciControlRef.value.showChart();
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

<style>
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

.custom-toast {
  --width: auto;
  max-width: 80%;
  min-width: 0;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>