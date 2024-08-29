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
                        <h2>{{ worksheet.name }}</h2>
                        <p>{{ worksheet.savedAt }}</p>
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
import { closeOutline, createOutline, pencilOutline, trashOutline } from 'ionicons/icons';

interface Worksheet {
    id: string;
    name: string;
    savedAt: string;
}
const router = useRouter();

// Load saved worksheets from local storage
const savedWorksheets = ref<Worksheet[]>([]);

onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem('isncsci_meta') || '[]');
    savedWorksheets.value = storedData;
});

const close_onClick = () => {
    router.push('/home');
};

const renameWorksheet = (worksheet: Worksheet) => {
    console.log('rename', worksheet)
};

const editWorksheet = (worksheet: Worksheet) => {
    console.log('edit', worksheet)
};

const removeWorksheet = (worksheet: Worksheet) => {
    console.log('remove', worksheet)
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
