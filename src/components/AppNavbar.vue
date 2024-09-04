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
                <ion-button size="small">
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
                        <ion-fab-button>
                            <ion-icon :icon="bookmarksOutline"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button @click="redirectToEula">
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
import { useRouter } from 'vue-router';
import { IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonFabList } from '@ionic/vue';
import { manOutline, backspaceOutline, saveOutline, calculatorOutline, chevronUp, newspaperOutline, bookmarksOutline, helpCircleOutline } from 'ionicons/icons';

const { calculateOnClick, saveOnClick } = defineProps<{ calculateOnClick: () => void, saveOnClick: () => void }>();

const router = useRouter();

const redirectToEula = () => {
    router.push('/eula');
}
</script>


