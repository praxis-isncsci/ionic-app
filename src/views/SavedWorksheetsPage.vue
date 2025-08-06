<template>
    <MainLayout title="Saved Worksheets"  :showNavbar="true" :showFooter="false" :helpMode="false" >
        <template #header-buttons>
            <ion-buttons slot="end">
            <ion-button @click="close_onClick" fill="clear">
                <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
            </ion-button>
            </ion-buttons>
        </template>
        <ion-list>
            <ion-item v-for="worksheet in savedWorksheets" :key="worksheet.id">
            <ion-label class="worksheet-row">
                <div v-if="editingWorksheetId === worksheet.id">
                <input v-model="editingWorksheetName" />
                </div>
                <div v-else>
                <h2>{{ worksheet.name }}</h2>
                <p class="text-description">Exam date: {{ new Date(worksheet.examDate).toLocaleString() }}</p>
                <p class="text-description">Last time edited: {{ new Date(worksheet.lastUpdateDate).toLocaleString() }}</p>
                </div>
                <div class="button-group">
                <ion-button size="small" fill="clear" @click="editWorksheetDetails(worksheet.id)" class="icon-button">
                    <ion-icon :icon="createOutline"></ion-icon>
                </ion-button>
                <ion-button size="small" fill="clear" @click="editWorksheet(worksheet.id)" class="icon-button">
                    <ion-icon :icon="pencilOutline"></ion-icon>
                </ion-button>
                <ion-button size="small" fill="clear" color="danger" @click="removeWorksheet(worksheet.id)" class="icon-button">
                    <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
                </div>
            </ion-label>
            </ion-item>
        </ion-list>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './MainLayout.vue';
import { IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { closeOutline, createOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { IWorksheetMetaItem, WorksheetDetails, Worksheets } from '@/utils/worksheetUtils';
import { promptFoNameExist, promptForWorksheetDetails, showConfirmDeleteAlert } from '@/utils/alertsPrompts';

const worksheets = Worksheets.getInstance();
const router = useRouter();

// Load saved worksheets from local storage (reactive variables)
const savedWorksheets = ref<IWorksheetMetaItem[]>([]);
const editingWorksheetId = ref<string | null>(null);
const editingWorksheetName = ref<string>('');

onMounted(async () => {
    // const storedData = JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
    // savedWorksheets.value = storedData;
    await worksheets.loadMeta();
    savedWorksheets.value = [...worksheets.getAllMeta()];
});

const close_onClick = () => {
    router.replace('/home');
};

// Rename Worksheet & edit exam date
const editWorksheetDetails = async (id: string) => {
    const worksheetMeta = worksheets.getMeta(id);
    if (!worksheetMeta) {
        return;
    }
    let worksheetDetails: WorksheetDetails | null = null;
    let isValidName = false;

    // Loop until a unique name is provided or the user cancels
    while (!isValidName) {
        worksheetDetails = await promptForWorksheetDetails(
            worksheetMeta.name,
            worksheetMeta.examDate
        );
        if (!worksheetDetails) {
            return;
        }

        // Check if the name already exists
        if (
            worksheets.isNameExist(worksheetDetails.name) &&
            worksheetDetails.name !== worksheetMeta.name
        ) {
            await promptFoNameExist();
        } else {
            isValidName = true;
        }
    }

    // Update the worksheet details in the Worksheets utility
    await worksheets.updateWorksheetDetails(
        id,
        worksheetDetails!.name,
        worksheetDetails!.examDate
    );

    // Refresh the savedWorksheets array
    savedWorksheets.value = [...worksheets.getAllMeta()];
};

// Edit Worksheet
const editWorksheet = async (id: string) => {
    router.replace(`/home/${id}`);
};

// Remove Worksheet from local storage
const removeWorksheet = async (id: string) => {
    const confirm = await showConfirmDeleteAlert();
    if (confirm) {
        await worksheets.removeWorksheet(id);
        savedWorksheets.value = worksheets.getAllMeta();
    }
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