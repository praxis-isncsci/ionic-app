<template>
    <ion-grid>
        <ion-row>
            <ion-col class="ion-text-center">
                <ion-button size="small">
                    <ion-icon slot="start" :icon="manOutline"></ion-icon>
                    Chart
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" @click="handleClearExam">
                    <ion-icon slot="start" :icon="backspaceOutline"></ion-icon>
                    Clear
                </ion-button>
            </ion-col>
            <ion-col>
                <ion-fab horizontal="center">
                    <ion-fab-button>
                        <ion-icon :icon="chevronUp"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-list side="top">
                        <ion-fab-button>
                            <ion-icon :icon="helpCircleOutline"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button @click="onNavigate('/saved-worksheets')">
                            <ion-icon :icon="bookmarksOutline"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button @click="onNavigate('/eula')">
                            <ion-icon :icon="newspaperOutline"></ion-icon>
                        </ion-fab-button>
                    </ion-fab-list>
                </ion-fab>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" @click="saveOnClick">
                    <ion-icon slot="start" :icon="saveOutline"></ion-icon>
                    Save
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" @click="calculateOnClick">
                    <ion-icon slot="start" :icon="calculatorOutline"></ion-icon>
                    Calculate
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup lang="ts">

import { IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonFabList, IonButton } from '@ionic/vue';
import { manOutline, backspaceOutline, saveOutline, calculatorOutline, chevronUp, newspaperOutline, bookmarksOutline, helpCircleOutline } from 'ionicons/icons';

const props = defineProps<{ 
    calculateOnClick: () => void, 
    saveOnClick: () => void, 
    clearExam: () => void,
    onNavigate: (path: string) => void
}>();

const handleClearExam = () => {
    props.onNavigate('/clear');
};

</script>