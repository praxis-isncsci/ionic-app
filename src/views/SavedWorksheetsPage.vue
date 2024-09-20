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
                            <!-- <ion-button size="small" fill="clear" @click="saveWorksheetName(worksheet)"
                                class="icon-button">
                                <ion-icon :icon="checkmarkOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" @click="cancelRename" class="icon-button">
                                <ion-icon :icon="closeOutline"></ion-icon>
                            </ion-button> -->
                        </div>
                        <div v-else>
                            <h2>{{ worksheet.name }}</h2>
                            <p>{{ new Date(worksheet.lastUpdateDate).toLocaleString() }}</p>
                        </div>
                        <div class="button-group">
                            <ion-button size="small" fill="clear" @click="renameWorksheet(worksheet.id)"
                                class="icon-button">
                                <ion-icon :icon="createOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" @click="editWorksheet(worksheet.id)"
                                class="icon-button">
                                <ion-icon :icon="pencilOutline"></ion-icon>
                            </ion-button>
                            <ion-button size="small" fill="clear" color="danger" @click="removeWorksheet(worksheet.id)"
                                class="icon-button">
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
import { closeOutline, createOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { APP_PREFIX } from '@/config';
import { IWorksheetMetaItem, Worksheets } from '@/utils/worksheetUtils';
import { promptFoNameExist, promptForUniqueWorksheetName, showConfirmDeleteAlert } from '@/utils/unsavedDataAlert';

const worksheets = Worksheets.getInstance();
const router = useRouter();

// Load saved worksheets from local storage (reactive variables)
const savedWorksheets = ref<IWorksheetMetaItem[]>([]);
const editingWorksheetId = ref<string | null>(null);
const editingWorksheetName = ref<string>('');

onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem(`${APP_PREFIX}meta`) || '[]');
    savedWorksheets.value = storedData;
});

const close_onClick = () => {
    router.replace('/home');
};

// const saveWorksheetName = (meta: IWorksheetMetaItem) => {
//     worksheets.updateWorksheetName(meta.id, editingWorksheetName.value);
//     savedWorksheets.value = worksheets.getAllMeta();
//     cancelRename();
// };

// const cancelRename = () => {
//     editingWorksheetId.value = null;
//     editingWorksheetName.value = '';
// };

// Rename Worksheet
const renameWorksheet = async (id: string) => {
    let name: string | null = null;
    let isValidName = false;

    // Loop until a unique name is provided or the user cancels
    while (!isValidName) {
        // Prompt the user for a worksheet name
        name = await promptForUniqueWorksheetName(worksheets.nextWorksheetName());

        // If the user cancels, exit the function
        if (!name) {
            return;
        }

        // Check if the name already exists
        if (!worksheets.isNameExist(name)) {
            isValidName = true; // Name is valid, exit loop
        } else {
            // Alert the user if the name exists and loop again
            await promptFoNameExist();
        }
    }

    if (name) {
        // Update the worksheet name in the Worksheets utility
        worksheets.updateWorksheetName(id, name);

        // Refresh the savedWorksheets array (for the vue to detect the change)
        savedWorksheets.value = worksheets.getAllMeta().map(item => ({ ...item }));
    }
};

// Edit Worksheet
const editWorksheet = async (id: string) => {
    router.replace(`/home/${id}`);
};

// Remove Worksheet from local storage
const removeWorksheet = async (id: string) => {
    const confirm = await showConfirmDeleteAlert();
    if (confirm) {
        worksheets.removeWorksheet(id);
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