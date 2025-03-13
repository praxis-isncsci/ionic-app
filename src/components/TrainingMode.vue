<template>
    <div>
        <ion-toggle
        :checked="props.trainingMode"
        @ionChange="onToggleChange">
            Training Mode
        </ion-toggle>
        <div v-if="props.trainingMode" class="training-icons">
            <ion-button @click="openTrainingDoc('Motor_Exam')">
                Motor Exam Guide
            </ion-button>
            <ion-button @click="openTrainingDoc('Key_Sensory')">
                Sensory Exam Guide
            </ion-button>
        </div>

        <ion-modal :is-open="showModal" @willDismiss="closeModal" css-class="full-modal">
            <ion-header>
                <ion-toolbar>
                    <ion-title slot="start">Exam Guide</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="closeModal">Close</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content ref="contentRef">
                <div ref="outerContainer" class="outer-container">
                    <div class="scaled-container" :style="scaledStyle">
                        <div class="training-doc-container" v-html="docHtml"></div>
                    </div>
                </div>
            </ion-content>
            <!-- <ion-content>
                <div>
                    <div>
                        <div class="training-doc-container" v-html="docHtml"></div>
                    </div>
                </div>
            </ion-content> -->
        </ion-modal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps<{  
    trainingMode: boolean; 
}>();

const emit = defineEmits<{
    (e: 'update:training-mode', val: boolean): void;
}>();

const onToggleChange = (e: any) => {
    const newVal = !!e.detail.checked;
    emit('update:training-mode', newVal)
}

const showModal = ref(false);
const docHtml = ref('');

const NATURAL_WIDTH = 1200;

//refs to measure the container
const contentRef = ref<HTMLElement | null>(null);
const outerContainer = ref<HTMLElement | null>(null);

//storing the computed scale factor
const scaleFactor = ref(1);

// A function to recalc the scale any time the container resizes
function adjustScale() {
    const containerWidth = outerContainer.value?.clientWidth || 0;
    if (!containerWidth) return;

    // Scale factor
    scaleFactor.value = (containerWidth / NATURAL_WIDTH) * 1.45;

    // Suppose you want to shift left by 10% of the scaled width
    const scaledWidth = NATURAL_WIDTH * scaleFactor.value;
    // shiftX.value = -0.048 * scaledWidth;// for motor exam to be oc
    shiftX.value = -0.04 * scaledWidth;
}

// We'll watch for resizing using a ResizeObserver
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    if (outerContainer.value) {
        resizeObserver = new ResizeObserver(() => {
        adjustScale();
        });
        resizeObserver.observe(outerContainer.value);
    }
    adjustScale();
});

onBeforeUnmount(() => {
    if (resizeObserver && outerContainer.value) {
        resizeObserver.unobserve(outerContainer.value);
    }
});

const shiftX = ref(0);

const scaledStyle = computed(() => ({
    transform: `translateX(${shiftX.value}px) scale(${scaleFactor.value})`,
    transformOrigin: 'top left',
    width: NATURAL_WIDTH + 'px',
    display: 'block'
}));

const openTrainingDoc = (docName: string) => {
showModal.value = true;
loadHtml(docName);
}

async function loadHtml(docName: string) {
    try {
        const response = await fetch('assets/training/' + docName + '.html');
        let htmlText = await response.text();

        // Convert relative image paths to absolute paths
        htmlText = htmlText.replace(/src="([^"]+)"/g, 'src="assets/training/$1"');

        docHtml.value = htmlText;
    } catch (err) {
        console.error('Error loading training doc:', err);
        docHtml.value = '<p>Failed to load document.</p>';
    }
}

const closeModal = () => {
showModal.value = false;
}
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

/* .training-doc-container {
    transform: translateX(-45px) scale(0.73);
    transform-origin: top left;
} */

</style>