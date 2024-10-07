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
        :exportToPDF="exportToPDF" :onNavigate="handleNavigation">
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
import { promptFoNameExist, promptForUniqueWorksheetName, showUnsavedDataAlert } from '@/utils/unsavedDataAlert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const worksheets = Worksheets.getInstance();
const route = useRoute();
const isncsciControlRef = ref<InstanceType<typeof IsncsciControl> | null>(null);
const currentMeta = ref<IWorksheetMetaItem | null>(null);

let isDirty = false;

function shallowEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

const handleFormChange = () => {
  if (!isncsciControlRef.value) return;

  const currentExamData: ExamData | undefined = isncsciControlRef.value.data();

  if (currentMeta.value) {
    // saved worksheet => compare the current data with the saved data
    const savedWorksheet = worksheets.getWorksheet(currentMeta.value.id);
    const savedExamData = savedWorksheet.examData;
    isDirty = !shallowEqual(currentExamData, savedExamData);
  } else {
    // no saved worksheet, but form has data => unsaved changes
    isDirty = true;
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
    handleFormChange();
  } else {
    console.log('Error in ISNCSCI calculation');
  }
};

const save_onClick = async () => {
  if (!isncsciControlRef.value) return;

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

async function exportToPDF() {
  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  // Set font size and type
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  // Add a title or heading
  doc.text('ISNCSCI Exam Report', 40, 50);

  // Add additional text (e.g., date, patient info)
  const examDate = currentMeta.value
    ? currentMeta.value.examDate.toLocaleDateString()
    : new Date().toLocaleDateString();
  doc.text(`Date: ${examDate}`, 40, 70);

  // Capture the dermatome chart
  const chartElement = document.getElementById('dermatome-chart');
  if (chartElement) {
    try {
      // Use html2canvas to capture the chart
      const canvas = await html2canvas(chartElement as HTMLElement, {
        backgroundColor: null, // To preserve transparency
        scale: 2, // Increase scale for better quality
      });

      // Get image data from the canvas
      const imgData = canvas.toDataURL('image/png');

      // Calculate image dimensions to fit the PDF
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 80; // 40pt margin on each side
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add the image to the PDF
      doc.addImage(
        imgData,
        'PNG',
        40, // x position
        100, // y position
        pdfWidth,
        pdfHeight
      );
    } catch (error) {
      console.error('Error capturing dermatome chart:', error);
    }
  } else {
    console.error('Dermatome chart element not found');
  }

  // Save the PDF
  doc.save('exam_report.pdf');
}

onMounted(() => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const worksheet = worksheets.getWorksheet(id);
    if (worksheet && worksheet.examData) {
      isncsciControlRef.value?.load(worksheet.examData);
    }
    const meta = worksheets.getMeta(id);
    if (meta) {
      currentMeta.value = meta;
    }
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