<template>
    <ion-grid>
        <ion-row class="btn-row">
            <ion-col class="ion-text-center">
                <ion-button 
                size="small"  
                fill="clear" 
                color="primary" 
                class="navbar-btn" 
                @click="showChart" 
                :disabled="!isLessThan850"
                :class="{ 'disabled-button': !isLessThan850 }"
                >
                    <div class="btn-content">
                        <ion-icon :icon="manOutline"></ion-icon>
                        <span>Dermatome</span>
                    </div>
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" fill="clear" color="primary" class="navbar-btn" @click="clearExam">
                    <div class="btn-content">
                        <ion-icon slot="start" :icon="documentOutline"></ion-icon>
                        <span>New Exam</span>
                    </div>
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-fab horizontal="center">
                    <ion-fab-button size="small">
                        <ion-icon :icon="chevronUp"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-list side="top">
                        <ion-fab-button class="fab-list-btn" @click="exportToPDF">
                            <ion-icon :icon="downloadOutline"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button class="fab-list-btn" @click="onNavigate('/saved-worksheets')">
                            <ion-icon :icon="bookmarksOutline"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button class="fab-list-btn" @click="onNavigate('/eula')">
                            <ion-icon :icon="newspaperOutline"></ion-icon>
                        </ion-fab-button>
                    </ion-fab-list>
                </ion-fab>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" fill="clear" color="primary" class="navbar-btn" @click="saveOnClick">
                    <div class="btn-content">
                        <ion-icon slot="start" :icon="saveOutline"></ion-icon>
                        <span>Save</span>
                    </div>
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button size="small" fill="clear" color="primary" class="navbar-btn" @click="calculateOnClick">
                    <div class="btn-content">
                        <ion-icon slot="start" :icon="calculatorOutline"></ion-icon>
                        <span>Calculate</span>
                    </div>
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup lang="ts">

import { IonGrid, IonRow, IonCol, IonIcon, IonFab, IonFabButton, IonFabList, IonButton } from '@ionic/vue';
import { manOutline, documentOutline, saveOutline, calculatorOutline, chevronUp, newspaperOutline, bookmarksOutline, downloadOutline } from 'ionicons/icons';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{ 
    calculateOnClick: () => void, 
    saveOnClick: () => void, 
    clearExam: () => void,
    onNavigate: (path: string) => void,
    exportToPDF: () => void,
    showChart: () => void
}>();

// Reactive properties to track screen size
const isLessThan850 = ref(false);
const isLessThan500 = ref(false);

// Function to check screen size
function checkScreenSize() {
    const width = window.innerWidth;
    isLessThan850.value = width < 850;
    isLessThan500.value = width < 500;
}

onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
});

</script>

<style scoped>
.btn-row {
    display: flex;
    flex-wrap: nowrap;
}

.btn-row ion-col {
    flex: 0 0 20%;
    max-width: 20%;
    text-align: center;
}

.btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-content ion-icon {
    font-size: 16px;
}

.btn-content span {
    font-size: 12px;
    margin-left: 3px;
    white-space: nowrap;
}

.navbar-btn {
    --background: transparent;
    --background-hover: var(--ion-color-primary);
    --color: var(--ion-color-primary);
    --color-hover: var(--ion-color-light);
    width: 100%; 
}

.navbar-btn[disabled] {
    opacity: 0.5;
    pointer-events: none;
}

.disabled-button .btn-content ion-icon,
.disabled-button .btn-content span {
    color: #5E5E5E; 
}

.fab-list-btn {
    --background-hover: var(--ion-color-primary);
    --color: var(--ion-color-primary);
    --color-hover: var(--ion-color-primary);
}
@media (max-width: 650px) {
    .btn-content span {
        font-size: 10px;
    }
}
@media (max-width: 525px) {
    .btn-row {
        flex-wrap: wrap;
    }

    .btn-row ion-col {
        flex: 0 0 20%;
        max-width: 20%;
    }

    .btn-content {
        flex-direction: column;
    }

    .ion-grid,
    .ion-row {
        --ion-grid-column-padding: 0;
    }

    .ion-col {
        padding: 0;
    }

    .btn-content ion-icon {
        font-size: 15px;
    }

    .btn-content span {
        font-size: 8px;
        margin: 3px 0 0 0;
    }
}
</style>
