<template>
    <div>
        <div v-if="helpMode" class="help-icons">
            <ion-button class="help-btn" @click="openHelpDoc('Motor_Exam')">
                <ion-icon slot="start" :icon="bookOutline"></ion-icon>
                <ion-label class="ion-text-wrap">Motor</ion-label>
            </ion-button>
            <ion-button class="help-btn btn-sensory" @click="openHelpDoc('Key_Sensory')">
                <ion-icon slot="start" :icon="bookOutline"></ion-icon>
                <ion-label class="ion-text-wrap">Sensory</ion-label>
            </ion-button>
        </div>

        <ion-modal :is-open="showModal" @willDismiss="closeModal" css-class="full-modal">
            <ion-header>
                <ion-toolbar>
                    <ion-title slot="start">{{ currentGuideTitle }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="closeModal">
                            <ion-icon :ios="closeOutline" :md="close"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
                <!-- Second toolbar for navigation buttons (sections) -->
                <ion-toolbar class="nav-toolbar">
                    <ion-buttons slot="start" class="nav-buttons">
                    <!-- Render a button for each section in the current guide -->
                    <ion-button 
                        v-for="section in sections" 
                        :key="section.label" 
                        size="small" 
                        @click="scrollToSection(section)"
                    >
                        {{ section.label }}
                    </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content ref="contentRef">
                <div class="scaled-container" :style="scaledStyle">
                    <div ref="outerContainer" class="outer-container">
                        <div class="help-doc-container" v-html="docHtml"></div>
                    </div>
                </div>
                <div ref="outerContainer" class="outer-container">
                    <div ref="scaledContainer" class="scaled-container" :style="scaledStyle">
                        <div class="help-doc-container" v-html="docHtml"></div>
                    </div>
                </div>
            </ion-content>
        </ion-modal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue';
import { defineProps, ref } from 'vue';
import { IonModal, IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
import { useExamGuide } from '@/utils/useExamGuides';
import { bookOutline, close, closeOutline } from 'ionicons/icons';


defineProps<{ helpMode: boolean }>();

const {
    showModal,
    docHtml,
    openHelpDoc,
    closeModal,
    scaledContainer,
    outerContainer,
    setupResizeObserver,
    adjustScale,
    scaledStyle,
    currentGuideName
} = useExamGuide();

defineExpose({
    openHelpDoc,
    closeModal,
    showModal,
    docHtml,
});

const outerContainerRef = ref<HTMLElement | null>(null);
const scaledContainerRef = ref<HTMLElement | null>(null);
const contentRef = ref<InstanceType<typeof IonContent> | null>(null);

let resizeObs: ResizeObserver | null = null;

const currentGuideTitle = computed(() => {
    if (currentGuideName.value === 'Motor_Exam') {
        return 'Motor Exam Guide'
    } else if (currentGuideName.value === 'Key_Sensory') {
        return 'Key Sensory Point Guide'
    } else {
        return 'Exam Guide'
    }
});

const sections = computed(() => {
    if (currentGuideName.value === 'Motor_Exam') {
    return [
        { label: 'C5',  id: 'C5', offsetLg: 0, offsetSm: 0, offsetXs: 0 },
        { label: 'C6',  id: 'C6', offsetLg: 0, offsetSm: -350, offsetXs: -430 },
        { label: 'C7',  id: 'C7', offsetLg: -1000, offsetSm: -1750, offsetXs: -1930 },
        { label: 'C8',  id: 'C8', offsetLg: -1040, offsetSm: -2110, offsetXs: -2380 },
        { label: 'T1',  id: 'T1', offsetLg: -2080, offsetSm: -3550, offsetXs: -3915 },
        { label: 'L2',  id: 'L2', offsetLg: -2040, offsetSm: -3850, offsetXs: -4312 },
        { label: 'L3',  id: 'L3', offsetLg: -2800, offsetSm: -5090, offsetXs: -5665 },
        { label: 'L4',  id: 'L4', offsetLg: -4250, offsetSm: -7150, offsetXs: -7880 },
        { label: 'L5',  id: 'L5', offsetLg: -4270, offsetSm: -7510, offsetXs: -8320 },
        { label: 'S1',  id: 'S1', offsetLg: -5180, offsetSm: -8850, offsetXs: -9765 }
    ];
    } else if (currentGuideName.value === 'Key_Sensory') {
    return [
    { label: 'C2–C8',   id: 'C2', offsetLg: 0, offsetSm: 0, offsetXs: 0 },
    { label: 'T1–T2',   id: 'T1', offsetLg: -350, offsetSm: -600, offsetXs: -650 },
    { label: 'T3–T12',  id: 'T3', offsetLg: -700, offsetSm: -1200, offsetXs: -1300 },
    { label: 'L1–L5',   id: 'L1', offsetLg: -1050, offsetSm: -1800, offsetXs: -1980 },
    { label: 'S1–S4_5', id: 'S1', offsetLg: -1420, offsetSm: -2400, offsetXs: -2620 }
    ];
    }
    return [];
});


const scrollToSection = (section: { id: string; offsetLg: number; offsetSm: number; offsetXs: number }) => {
    const ionContentEl = contentRef.value?.$el ?? contentRef.value
    if (!ionContentEl) return

    const W = window.innerWidth
    const offset =
    W < 380 ? section.offsetXs :
    W < 500 ? section.offsetSm :
                section.offsetLg

    const targetEl = ionContentEl.querySelector(`[id="${section.id}"]`) as HTMLElement | null
    if (!targetEl) return

    const yOffset = targetEl.offsetTop + offset

    if (typeof (ionContentEl as any).scrollToPoint === 'function') {
        (ionContentEl as any).scrollToPoint(0, yOffset, 500)
    } else {
        targetEl.scrollIntoView({ behavior: 'smooth' })
    }
}


onMounted(() => {
    outerContainer.value = outerContainerRef.value;
    scaledContainer.value = scaledContainerRef.value;

    if (outerContainerRef.value) {
        resizeObs = setupResizeObserver(outerContainerRef.value);
    }
    adjustScale();
});

onBeforeUnmount(() => {
    if (resizeObs && outerContainer.value) {
        resizeObs.unobserve(outerContainer.value);
    }
});
</script>

<style scoped>
.full-modal .modal-wrapper {
    --width: 100%;
    --max-width: 100%;
    --height: 100%;
    --max-height: 100%;
    top: 0;
    left: 0;
}
.outer-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.scaled-container {
    transform-origin: top left;
}

.help-icons {
    position: relative;
    z-index: 9999;
    margin-top: 110px;
    display: flex;
    justify-content: center;
}

.help-icons ion-button {
    --border-radius: 4px;
    --padding-start: 8px;
    --padding-end: 8px;
    --padding-top: 0;
    --padding-bottom: 0;
    font-size: 0.5rem;
    height: auto;
    width: 5rem;
}

.help-icons ion-button.help-btn .button-native{
    white-space: normal;
}

.help-icons ion-button.help-btn{
    --border-radius: 4px;
    --padding-start: 4px;
    --padding-end: 4px;
    --padding-top: 4px;
    --padding-bottom: 4px;
    font-size: .55rem;
    width: 5rem;
    text-align: center;
}

.btns-exam-points {
    padding: 1em;
    background: #f0f0f0;
    text-align: center;
}

.btns-exam-points button {
    margin: 0 0.5em;
    padding: 0.5em 1em;
    font-weight: bold;
}

.btn-sensory, .btn-sensory:hover {
    --background: #ff4961;
}

ion-toolbar.nav-toolbar  {
    display: flex;
    flex-wrap: wrap;
}

ion-toolbar.nav-toolbar .nav-buttons ion-button {
    font-size: 0.6rem;
    min-width: 2rem; 
    width: auto;
}

@media (max-width: 849px) {

.help-icons {
    justify-content: space-between;
    padding: 0 5px;
    /* display: flex;
    justify-content: center; */
}
}

@media (max-width: 767px) {

    /* .help-icons ion-button {
        rotate: 270deg;
    flex-direction: column;
    } */

    .help-icons {
        margin-top: 0px;
        justify-content: space-between;
        /* display: flex;
        justify-content: center; */
    }
}

@media (max-width: 538px) {

    .help-icons ion-button {
        font-size: 0.42rem;
        width: 6.5rem;
    }
}


@media (max-width: 380px) {
    ion-toolbar.nav-toolbar .nav-buttons ion-button {
    font-size: 0.5rem;
    min-width: 1.6rem; 
    width: auto;
}
}

</style>
