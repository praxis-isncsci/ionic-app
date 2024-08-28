<template>
    <ion-tabs>
        <ion-tab-bar slot="bottom" class="custom-tab-bar">
            <ion-tab-button tab="chart">
                <ion-icon :icon="manOutline"></ion-icon>
                Chart
            </ion-tab-button>
            <ion-tab-button tab="clear">
                <ion-icon :icon="backspaceOutline"></ion-icon>
                Clear
            </ion-tab-button>
            <ion-tab-button tab="fab placeholder">
                <ion-icon :icon="chevronUp"></ion-icon>
            </ion-tab-button>
            <ion-tab-button tab="save" @click="saveOnClick">
                <ion-icon :icon="saveOutline"></ion-icon>
                Save
            </ion-tab-button>
            <ion-tab-button tab="calculate" @click="calculateOnClick">
                <ion-icon :icon="calculatorOutline"></ion-icon>
                Calculate
            </ion-tab-button>
        </ion-tab-bar>
        <ion-content>
            <ion-fab slot="fixed" vertical="bottom" horizontal="center" class="custom-fab">
                <ion-fab-button class="small-fab">
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
        </ion-content>
    </ion-tabs>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonTabButton, IonTabBar, IonIcon, IonFab, IonFabButton, IonFabList } from '@ionic/vue';
import { manOutline, backspaceOutline, saveOutline, calculatorOutline, chevronUp, newspaperOutline, bookmarksOutline, helpCircleOutline } from 'ionicons/icons';

const { calculateOnClick, saveOnClick } = defineProps<{ calculateOnClick: () => void, saveOnClick: () => void }>();

const router = useRouter();

const redirectToEula = () => {
    router.push('/eula');
}
</script>

<style scoped>
.custom-tab-bar {
    display: flex;
    justify-content: space-evenly;
}

.custom-fab {
    bottom: calc(40px + env(safe-area-inset-bottom));
    transform: translateY(-50%);
}
</style>