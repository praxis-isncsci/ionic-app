<template>
    <ion-page>
        <ion-header>
        <ion-toolbar>
            <ion-title>Saved Worksheets</ion-title>
        <ion-buttons slot="end">
            <ion-button @click="close_onClick">
                <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
        </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item v-for="worksheet in savedWorksheets" :key="worksheet.id">
                    <ion-label class="worksheet-row">
                        <div v-if="editingWorksheetId === worksheet.id">
                            <input v-model="editingWorksheetName" />
                            <ion-button size="small" fill="clear" @click="saveWorksheetName(worksheet)" class="icon-button">
                                <ion-icon :icon="checkmarkOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" @click="cancelRename" class="icon-button">
                                <ion-icon :icon="closeOutline"></ion-icon>
                            </ion-button>
                        </div>
                        <div v-else>
                            <h2>{{ worksheet.name }}</h2>
                            <p>{{ worksheet.savedAt }}</p>
                        </div>
                        <div class="button-group">
                            <ion-button size="small" fill="clear" @click="renameWorksheet(worksheet)" class="icon-button">
                                <ion-icon :icon="createOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" @click="editWorksheet(worksheet)" class="icon-button">
                                <ion-icon :icon="pencilOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" color="danger" @click="removeWorksheet(worksheet)" class="icon-button">
                                <ion-icon :icon="trashOutline"></ion-icon>
                            </ion-button>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { closeOutline, createOutline, pencilOutline, trashOutline, checkmarkOutline } from 'ionicons/icons';
import { APP_PREFIX } from '@/config';
import { loadExternalExamDataUseCase } from 'isncsci-ui/dist/esm/core/useCases';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { AppStoreProvider } from 'isncsci-ui/dist/esm/app/providers';

interface Worksheet {
    id: string;
    name: string;
    savedAt: string;
}
const router = useRouter();

// Load saved worksheets from local storage
const savedWorksheets = ref<Worksheet[]>([]);
const editingWorksheetId = ref<string | null>(null);
const editingWorksheetName = ref<string>('');

onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
    savedWorksheets.value = storedData;
});

const close_onClick = () => {
    router.push('/home');
};

// Rename Worksheet
const renameWorksheet = (worksheet: Worksheet) => {
    editingWorksheetId.value = worksheet.id;
    editingWorksheetName.value = worksheet.name;
};

const saveWorksheetName = (worksheet: Worksheet) => {
    const worksheetIndex = savedWorksheets.value.findIndex(ws => ws.id === worksheet.id);
    if (worksheetIndex !== -1) {
        savedWorksheets.value[worksheetIndex].name = editingWorksheetName.value;
        localStorage.setItem(`${APP_PREFIX}meta`, JSON.stringify(savedWorksheets.value));
        cancelRename();
    }
};

const cancelRename = () => {
    editingWorksheetId.value = null;
    editingWorksheetName.value = '';
};


const appStoreProvider = new AppStoreProvider(appStore);

// Edit Worksheet
const editWorksheet = async (worksheet: Worksheet) => {
const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${worksheet.id}`) || '{}');

console.log("data to pull", examData)
if (examData && Object.keys(examData).length > 0) {
    // Load the exam data into the app store
    await loadExternalExamDataUseCase(appStoreProvider, examData);

    // Set the worksheet name in session storage to display it on the home page
    sessionStorage.setItem('currentWorksheetId', worksheet.id);

    // Redirect to the editing page
    router.replace(`/home/${worksheet.id}`)
} else {
    console.error('No exam data found for this worksheet');
}
};


// Remove Worksheet from local storage
const removeWorksheet = (worksheet: Worksheet) => {
    // Filter out the worksheet with the selected id
    savedWorksheets.value = savedWorksheets.value.filter(el => el.id !== worksheet.id);

    // Update the isncsci_meta in local storage
    localStorage.setItem(`${APP_PREFIX}meta`, JSON.stringify(savedWorksheets.value));

    // Remove the specific worksheet data from local storage
    localStorage.removeItem(`${APP_PREFIX}${worksheet.id}`);

};
</script>

<style scoped>
.worksheet-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.button-group {
    display: flex;
    gap: 10px;
}
</style>
