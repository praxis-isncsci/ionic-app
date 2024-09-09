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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { closeOutline, createOutline, pencilOutline, trashOutline, checkmarkOutline } from 'ionicons/icons';
import { APP_PREFIX } from '@/config';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { convertExamDataToGridModel } from '@/utils/examDataHelpers';
import { promptForUniqueWorksheetName } from '@/utils/worksheetUtils';

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
    router.replace('/home');
};

// Rename Worksheet
const renameWorksheet = async (worksheet: Worksheet) => {
    const newName = await promptForUniqueWorksheetName(worksheet.name);
    if (newName) {
        editingWorksheetId.value = worksheet.id;
        editingWorksheetName.value = newName;
        await saveWorksheetName(worksheet);
    }
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


// Edit Worksheet
const editWorksheet = async (worksheet: Worksheet) => {
    const examData = JSON.parse(localStorage.getItem(`${APP_PREFIX}${worksheet.id}`) || '{}');
    
    if (examData && Object.keys(examData).length > 0) {
        // Check if the data is post-calculation
        if (examData.asiaImpairmentScale) {
            // Post-calculation data
            appStore.dispatch({
                type: 'SET_TOTALS',
                payload: {
                    asiaImpairmentScale: examData.asiaImpairmentScale,
                    injuryComplete: examData.injuryComplete,
                    neurologicalLevelOfInjury: examData.neurologicalLevelOfInjury,
                    //!!!!check later if all needed here
                }
            });

            // Set VAC and DAP
            appStore.dispatch({
                type: 'SET_VAC_DAP',
                payload: { 
                    vac: examData.voluntaryAnalContraction, 
                    dap: examData.deepAnalPressure 
                }
            });

            // Set extra inputs
            appStore.dispatch({
                type: 'SET_EXTRA_INPUTS',
                payload: {
                    rightLowestNonKeyMuscleWithMotorFunction: examData.rightLowestNonKeyMuscleWithMotorFunction,
                    leftLowestNonKeyMuscleWithMotorFunction: examData.leftLowestNonKeyMuscleWithMotorFunction,
                    comments: examData.comments,
                }
            });

            // Set grid model
            const gridModel = convertExamDataToGridModel(examData);
            appStore.dispatch({
                type: 'SET_GRID_MODEL',
                payload: gridModel
            });
        } else {
            // Pre-calculation data
            appStore.dispatch({
                type: 'SET_GRID_MODEL',
                payload: examData.gridModel || []
            });

            appStore.dispatch({
                type: 'SET_VAC_DAP',
                payload: { vac: examData.vac, dap: examData.dap }
            });

            appStore.dispatch({
                type: 'SET_EXTRA_INPUTS',
                payload: {
                    rightLowestNonKeyMuscleWithMotorFunction: examData.rightLowestNonKeyMuscleWithMotorFunction,
                    leftLowestNonKeyMuscleWithMotorFunction: examData.leftLowestNonKeyMuscleWithMotorFunction,
                    comments: examData.comments,
                }
            });
        }

        // Set worksheet name and ID in session storage
        sessionStorage.setItem('worksheetName', worksheet.name);
        sessionStorage.setItem('currentWorksheetId', worksheet.id);

        // Update the app store with the worksheet name
        appStore.dispatch({
            type: 'SET_WORKSHEET_NAME',
            payload: worksheet.name
        });
        
        // Redirect to home to continue editing
        router.replace('/home');
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