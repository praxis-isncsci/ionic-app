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
                            <ion-button size="small" fill="clear" @click="saveWorksheetName(worksheet)"
                                class="icon-button">
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
import { closeOutline, createOutline, pencilOutline, trashOutline, checkmarkOutline } from 'ionicons/icons';
import { APP_PREFIX } from '@/config';
import { appStore } from 'isncsci-ui/dist/esm/app/store';
import { convertExamDataToGridModel } from '@/utils/examDataHelpers';
import { IWorksheetMetaItem, Worksheets } from '@/utils/worksheetUtils';
import { promptFoNameExist, promptForUniqueWorksheetName } from '@/utils/unsavedDataAlert';
// import { promptForUniqueWorksheetName } from '@/utils/worksheetUtils';
const worksheets = Worksheets.getInstance();
const router = useRouter();

// Load saved worksheets from local storage
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

const saveWorksheetName = (meta: IWorksheetMetaItem) => {
    //update the meta data to local storage
    //add update meta function on WorksheetUtil
};

const cancelRename = () => {
    editingWorksheetId.value = null;
    editingWorksheetName.value = '';
};

// Rename Worksheet
const renameWorksheet = async (id: string) => {
    let name: string | null = null;
    while (!name || worksheets.isNameExist(name)) {
        if (name) {
            await promptFoNameExist();
        }
        name = await promptForUniqueWorksheetName(worksheets.nextWorksheetName());
    }

    if (name) {
        editingWorksheetId.value = id;
        editingWorksheetName.value = name;
        //TODO
        //update meta only
    }
};

// Edit Worksheet
const editWorksheet = async (id: string) => {
    router.replace(`/home/${id}`);
};

// Remove Worksheet from local storage
const removeWorksheet = (id: string) => {
    //Move the delete logic to worksheet Util

    // // Filter out the worksheet with the selected id
    // savedWorksheets.value = savedWorksheets.value.filter(el => el.id !== worksheet.id);

    // // Update the isncsci_meta in local storage
    // localStorage.setItem(`${APP_PREFIX}meta`, JSON.stringify(savedWorksheets.value));

    // // Remove the specific worksheet data from local storage
    // localStorage.removeItem(`${APP_PREFIX}${worksheet.id}`);
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