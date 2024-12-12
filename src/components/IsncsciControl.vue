<template isncsci-web-app>
    <ion-page>
        <ion-content >
            <praxis-isncsci-app-layout 
            :classification-style="classificationStyle"
            class="app-layout"
            >
                <praxis-isncsci-input-layout 
                slot="input-layout" 
                ref="inputLayoutRef" 
                >
                    <div slot="vac" class="anal-function right">
                        <label for="vac"><span class="intermittent">(</span>VAC<span class="intermittent">) Voluntary anal
                                contraction</span></label>
                        <select name="vac" id="vac">
                            <option value="None"></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="NT">NT</option>
                        </select>
                    </div>
                    <div slot="dap" class="anal-function">
                        <select name="dap" id="dap">
                            <option value="None"></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="NT">NT</option>
                        </select>
                        <label for="dap"><span class="intermittent">(</span>DAP<span class="intermittent">) Deep anal
                                pressure</span></label>
                    </div>
                    <div slot="non-key-muscles-header">
                        Lowest non-key muscle with motor function
                    </div>
                    <label for="right-lowest" slot="right-lowest-label">Right:</label>
                    <select name="right-lowest" id="right-lowest" slot="right-lowest">
                        <option value="None"></option>
                        <option value="C5">
                            C5 - Shoulder: Flexion, extension, abduction, adduction,
                            internal and external rotation - Elbow: Supination
                        </option>
                        <option value="C6">C6 - Elbow: Pronation - Wrist: Flexion</option>
                        <option value="C7">
                            C7 - Finger: Flexion at proximal joint, extension. Thumb:
                            Flexion, extension and abduction in plane of thumb
                        </option>
                        <option value="C8">
                            C8 - Finger: Flexion at MCP joint Thumb: Opposition, adduction
                            and abduction perpendicular to palm
                        </option>
                        <option value="T1">
                            T1 - Finger: Abduction of the index finger
                        </option>
                        <option value="L2">L2 - Hip: Adduction</option>
                        <option value="L3">L3 - Hip: External rotation</option>
                        <option value="L4">
                            L4 - Hip: Extension, abduction, internal rotation - Knee:
                            Flexion - Ankle: Inversion and eversion - Toe: MP and IP
                            extension
                        </option>
                        <option value="L5">
                            L5 - Hallux and Toe: DIP and PIP flexion and abduction
                        </option>
                        <option value="S1">S1 - Hallux: Adduction</option>
                    </select>
                    <label for="left-lowest" slot="left-lowest-label">Left:</label>
                    <select name="left-lowest" id="left-lowest" slot="left-lowest">
                        <option value="None"></option>
                        <option value="C5">
                            C5 - Shoulder: Flexion, extension, abduction, adduction,
                            internal and external rotation - Elbow: Supination
                        </option>
                        <option value="C6">C6 - Elbow: Pronation - Wrist: Flexion</option>
                        <option value="C7">
                            C7 - Finger: Flexion at proximal joint, extension. Thumb:
                            Flexion, extension and abduction in plane of thumb
                        </option>
                        <option value="C8">
                            C8 - Finger: Flexion at MCP joint Thumb: Opposition, adduction
                            and abduction perpendicular to palm
                        </option>
                        <option value="T1">
                            T1 - Finger: Abduction of the index finger
                        </option>
                        <option value="L2">L2 - Hip: Adduction</option>
                        <option value="L3">L3 - Hip: External rotation</option>
                        <option value="L4">
                            L4 - Hip: Extension, abduction, internal rotation - Knee:
                            Flexion - Ankle: Inversion and eversion - Toe: MP and IP
                            extension
                        </option>
                        <option value="L5">
                            L5 - Hallux and Toe: DIP and PIP flexion and abduction
                        </option>
                        <option value="S1">S1 - Hallux: Adduction</option>
                    </select>
                    <label for="comments" slot="comments-label">Comments:</label>
                    <div name="cell-comments-display" id="cell-comments-display" slot="cell-comments-display"></div>
                    <textarea name="comments" id="comments" slot="comments"></textarea>
                    <!-- Chart component for large screens -->
                    <praxis-isncsci-key-points-diagram
                        v-if="isLargeScreen"
                        slot="key-points-diagram"
                        ref="keyPointsDiagramRef"
                    ></praxis-isncsci-key-points-diagram>

                    <!-- Modal for small screens -->
                    <ion-modal
                        :is-open="isChartModalOpen"
                        @didDismiss="onModalDidDismiss"
                        @didPresent="onModalDidPresent"
                    >
                        <ion-header>
                            <ion-toolbar>
                            <ion-title>Dermatome Chart</ion-title>
                            <ion-buttons slot="end">
                                <ion-button @click="isChartModalOpen = false">
                                <ion-icon :icon="close"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content>
                            <div class="diagram-container">
                                <!-- Chart component for small screens inside the modal -->
                                <praxis-isncsci-key-points-diagram
                                    ref="modalKeyPointsDiagramRef"
                                ></praxis-isncsci-key-points-diagram>
                            </div>
                        </ion-content>
                    </ion-modal>
                </praxis-isncsci-input-layout>
                <praxis-isncsci-input 
                    slot="input-controls" 
                    disabled 
                    ref="inputButtonsRef"
                >
                    <label for="consider-normal" slot="consider-normal-label">Consider normal or not normal for
                        classification:</label>
                    <select name="consider-normal" id="consider-normal" slot="consider-normal">
                        <option></option>
                        <option value="1" class="cell-input">Consider Normal</option>
                        <option value="2" class="cell-input">Consider Not Normal</option>
                    </select>
                    <label for="reason-for-impairment-not-due-to-sci" slot="reason-for-impairment-not-due-to-sci-label">If motor
                        impairment not due to SCI, please indicate
                        reason:</label>
                    <select id="reason-for-impairment-not-due-to-sci" name="reason-for-impairment-not-due-to-sci"
                        slot="reason-for-impairment-not-due-to-sci">
                        <option></option>
                        <option value="1" class="cell-input">Plexopathy</option>
                        <option value="2" class="cell-input">
                            Peripheral neuropathy
                        </option>
                        <option value="3" class="cell-input">
                            Pre-existing myoneural disease (e.g. Stroke, MS, etc.)
                        </option>
                        <option value="6" class="cell-input">Other (specify:)</option>
                    </select>
                    <label for="reason-for-impairment-not-due-to-sci-specify"
                        slot="reason-for-impairment-not-due-to-sci-specify-label">Specify:</label>
                    <textarea id="reason-for-impairment-not-due-to-sci-specify"
                        name="reason-for-impairment-not-due-to-sci-specify"
                        slot="reason-for-impairment-not-due-to-sci-specify"></textarea>
                </praxis-isncsci-input>
                <praxis-isncsci-classification 
                slot="classification" 
                ref="classificationRef" 
                class="classification"
                >
                    <praxis-isncsci-dialog-header slot="header">
                        <div slot="title">Classification</div>
                        <div slot="close">
                            <ion-button @click="closeClassification_onClick" fill="clear">
                                <ion-icon slot="icon-only" :icon="close"></ion-icon>
                            </ion-button>
                        </div>
                    </praxis-isncsci-dialog-header>
                    <!-- Neurological levels -->
                    <praxis-isncsci-classification-grid slot="neurological-levels" class="classification-grid">
                        <div slot="heading">Neurological levels</div>
                        <div slot="grid">
                            <div>&nbsp;</div>
                            <div class="text-caption-2 col-header">R</div>
                            <div class="text-caption-2 col-header">L</div>
                            <div class="text-caption-2 row-header">Sensory</div>
                            <praxis-isncsci-classification-total
                                data-total="right-sensory">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-sensory">&nbsp;</praxis-isncsci-classification-total>
                            <div class="text-caption-2 row-header">Motor</div>
                            <praxis-isncsci-classification-total
                                data-total="right-motor">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-motor">&nbsp;</praxis-isncsci-classification-total>
                        </div>
                    </praxis-isncsci-classification-grid>
                    <!-- NLI -->
                    <praxis-isncsci-classification-grid slot="nli">
                        <div slot="heading">Neurological Level of Injury<br />(NLI)</div>
                        <div slot="grid">
                            <praxis-isncsci-classification-total
                                data-total="neurological-level-of-injury">&nbsp;</praxis-isncsci-classification-total>
                        </div>
                    </praxis-isncsci-classification-grid>
                    <!-- AIS -->
                    <praxis-isncsci-classification-grid slot="ais">
                        <div slot="heading">Asia Impairment Scale<br />(AIS)</div>
                        <div slot="grid">
                            <praxis-isncsci-classification-total
                                data-total="asia-impairment-scale">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="injury-complete">&nbsp;</praxis-isncsci-classification-total>
                        </div>
                    </praxis-isncsci-classification-grid>
                    <!-- ZPP -->
                    <praxis-isncsci-classification-grid slot="zpp">
                        <div slot="heading">Zone of partial preservation</div>
                        <div slot="grid">
                            <div>&nbsp;</div>
                            <div class="text-caption-2 col-header">R</div>
                            <div class="text-caption-2 col-header">L</div>
                            <div class="text-caption-2 row-header">Sensory</div>
                            <praxis-isncsci-classification-total
                                data-total="right-sensory-zpp">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-sensory-zpp">&nbsp;</praxis-isncsci-classification-total>
                            <div class="text-caption-2 row-header">Motor</div>
                            <praxis-isncsci-classification-total
                                data-total="right-motor-zpp">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-motor-zpp">&nbsp;</praxis-isncsci-classification-total>
                        </div>
                    </praxis-isncsci-classification-grid>
                    <!-- Sub-scores -->
                    <praxis-isncsci-classification-grid slot="sub-scores">
                        <div slot="heading">Sub-scores</div>
                        <div slot="grid">
                            <div>&nbsp;</div>
                            <div class="text-caption-2 col-header">R</div>
                            <div class="text-caption-2 col-header">L</div>
                            <div class="text-caption-2 col-header">Total</div>
                            <div class="text-caption-2 row-header">UEMS</div>
                            <praxis-isncsci-classification-total
                                data-total="right-upper-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-upper-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="upper-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <div class="text-caption-2 row-header">LEMS</div>
                            <praxis-isncsci-classification-total
                                data-total="right-lower-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-lower-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="lower-motor-total">&nbsp;</praxis-isncsci-classification-total>
                            <div class="text-caption-2 row-header">Light touch</div>
                            <praxis-isncsci-classification-total
                                data-total="right-light-touch-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-light-touch-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="light-touch-total">&nbsp;</praxis-isncsci-classification-total>
                            <div class="text-caption-2 row-header">Pin prick</div>
                            <praxis-isncsci-classification-total
                                data-total="right-pin-prick-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="left-pin-prick-total">&nbsp;</praxis-isncsci-classification-total>
                            <praxis-isncsci-classification-total
                                data-total="pin-prick-total">&nbsp;</praxis-isncsci-classification-total>
                        </div>
                    </praxis-isncsci-classification-grid>
                </praxis-isncsci-classification>
            </praxis-isncsci-app-layout>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { close } from 'ionicons/icons';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonPage } from '@ionic/vue';
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { bindExamDataToGridModel, bindExamDataToTotals, getEmptyExamData, getExamDataFromGridModel } from 'isncsci-ui/dist/esm/core/helpers'
import {
    AppStoreProvider,
    IsncsciExamProvider,
} from 'isncsci-ui/dist/esm/app/providers';
import { appStore, Actions } from 'isncsci-ui/dist/esm/app/store';

/* ISNCSCI UI */
import 'isncsci-ui/dist/esm/web/index.js';
import 'isncsci-ui/dist/css/design-system.css';

import {
    IAppState,
    IExternalMessageProvider,
    StatusCodes,
} from 'isncsci-ui/dist/esm/core/boundaries';

import {
    calculateUseCase,
    initializeAppUseCase,
} from 'isncsci-ui/dist/esm/core/useCases';

import {
    InputLayoutController,
    KeyPointDiagramController,
} from 'isncsci-ui/dist/esm/app/controllers';

import { ExamData } from 'isncsci-ui/dist/esm/core/domain';
import { inputFieldNames } from '@/utils/inputFieldNames';
import { showCalculationErrorAlert } from '@/utils/alertsPrompts';

const classificationStyle = ref('');
const inputLayoutRef = ref<HTMLElement | null>(null);
const inputButtonsRef = ref<HTMLElement | null>(null);
const classificationRef = ref<HTMLElement | null>(null);
const keyPointsDiagramRef = ref<HTMLElement | null>(null);
const modalKeyPointsDiagramRef = ref<HTMLElement | null>(null);
const isLargeScreen = ref(window.innerWidth >= 850);
const isChartModalOpen = ref(false);
const isLoading = ref(false);
const lastCalculatedExamData = ref<ExamData | undefined>(undefined);
const diagramRef = ref<HTMLElement | null>(null);

let ready = false;

const externalMessagePortProvider: IExternalMessageProvider = {
    sendOutExamData: () => {
        console.log('externalMessagePortProvider called');
    },
};

const appStoreProvider = new AppStoreProvider(appStore);
const isncsciExamProvider = new IsncsciExamProvider();

const initializeKeyPointDiagram = () => {
    if (diagramRef.value) {
        new KeyPointDiagramController(appStore, diagramRef.value);
        appStoreProvider.setGridModel(appStore.getState().gridModel);
    }
};

const cleanupKeyPointDiagram = () => {
    diagramRef.value = null;
};

const isSmallScreen = ref(window.innerWidth <= 767);

const updateScreenSize = () => {
    isLargeScreen.value = window.innerWidth >= 850;
    isSmallScreen.value = window.innerWidth <= 767;
};

onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    if (
        inputLayoutRef.value &&
        inputButtonsRef.value &&
        classificationRef.value
    ) {
        new InputLayoutController(
            appStore,
            appStoreProvider,
            externalMessagePortProvider,
            inputLayoutRef.value,
            inputButtonsRef.value,
            classificationRef.value,
        );
    }

    // Initialize the chart for large screens if it's visible
    if (isLargeScreen.value) {
        diagramRef.value = keyPointsDiagramRef.value;
        initializeKeyPointDiagram();
    }

    initializeAppUseCase(appStoreProvider);

    appStore.subscribe(() => { handleFormChange(); })
});


onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize);
    unsubscribeFromStoreHandler();
    cleanupKeyPointDiagram();
});

watch(
    () => isLargeScreen.value,
    (newValue) => {
        if (newValue) {
        diagramRef.value = keyPointsDiagramRef.value;
        initializeKeyPointDiagram();
        } else {
        cleanupKeyPointDiagram();
        }
    }
);

const showChart = () => {
    if (isLargeScreen.value) {
        return;
    }
    isChartModalOpen.value = true;
};

const onModalDidPresent = () => {
    diagramRef.value = modalKeyPointsDiagramRef.value;
    initializeKeyPointDiagram();
};

const onModalDidDismiss = () => {
    cleanupKeyPointDiagram();
    isChartModalOpen.value = false;
};

const stateChanged = (state: IAppState, actionType: string) => {
    if (!ready && state.status === StatusCodes.Ready) {
        console.log(
            `The application has been initialized and is ready :: ${actionType}`,
        );
        ready = true;
    }

    if (actionType === Actions.SET_CELLS_VALUE) {
        // Reset last calculated exam data to undefined because the cell value has been changed
        lastCalculatedExamData.value = undefined;
    }

    if (
        actionType === Actions.SET_CALCULATION_ERROR &&
        state.calculationError
    ) {
        showCalculationErrorAlert(state.calculationError);
    }
};

const unsubscribeFromStoreHandler = appStore.subscribe(
    (state: IAppState, actionType: string) => stateChanged(state, actionType),
);

const handleFormChange = () => {
}

initializeAppUseCase(appStoreProvider);

const closeClassification_onClick = () => {
    classificationStyle.value = '';
    return false;
};

const getExamData = (): ExamData => {
    if (lastCalculatedExamData.value != undefined) {
        return lastCalculatedExamData.value;
    }

    // Get the latest exam data from the app state
    const state = appStore.getState();
    const { examData, missingValues } = getExamDataFromGridModel(
        state.gridModel ?? [],
        state.vac,
        state.dap,
        state.rightLowestNonKeyMuscleWithMotorFunction,
        state.leftLowestNonKeyMuscleWithMotorFunction,
        state.comments,
    );
    // Include the totals from the appStore state
    const totals = state.totals;

    if (totals) {
    Object.assign(examData, totals);
    }

    return examData;
}

const isFormEmpty = (): boolean => {
    const examData = getExamData();
    return inputFieldNames.every((field) => {
        return !examData[field];
    });
}

const load = async (examData: ExamData) => {
    isLoading.value = true;

    await appStoreProvider.setCalculationError('');

    // Bind exam data to a new grid model
    const gridModel = bindExamDataToGridModel(examData);

    // Bind exam data to the totals
    const totals = bindExamDataToTotals(examData);

    // Update state
    await appStoreProvider.setActiveCell(null, []);
    await appStoreProvider.setGridModel(gridModel);
    await appStoreProvider.setTotals(totals);
    await appStoreProvider.setVacDap(
        examData.voluntaryAnalContraction,
        examData.deepAnalPressure,
    );
    await appStoreProvider.setExtraInputs(
        examData.rightLowestNonKeyMuscleWithMotorFunction,
        examData.leftLowestNonKeyMuscleWithMotorFunction,
        examData.comments || '',
        examData.cellComments || '',
    );

    isLoading.value = false;
}

const clear = async () => {
    const emptyExamData = getEmptyExamData();
    const gridModel = bindExamDataToGridModel(emptyExamData);
    const totals = bindExamDataToTotals(emptyExamData);

    try {
        await appStoreProvider.setActiveCell(null, []);
        await appStoreProvider.setGridModel(gridModel);
        await appStoreProvider.setTotals(totals);
        await appStoreProvider.setVacDap(null, null);
        await appStoreProvider.setExtraInputs(null, null, '', '');
    } catch (error) {
        console.log(error);
    }
}

const calculate = async () => {
    const state = appStore.getState();
    const examData = await calculateUseCase(
        state.gridModel ?? [],
        state.vac,
        state.dap,
        state.rightLowestNonKeyMuscleWithMotorFunction,
        state.leftLowestNonKeyMuscleWithMotorFunction,
        state.comments,
        appStoreProvider,
        isncsciExamProvider,
        externalMessagePortProvider,
    );
    lastCalculatedExamData.value = examData;
    
    const updatedState = appStore.getState();
    if (!updatedState.calculationError) {
        classificationStyle.value = 'visible';

        await nextTick();
        
        const heightPx = classificationRef.value
        ? classificationRef.value.clientHeight
        : 280;
        document.documentElement.style.setProperty(
        '--calc-classification-height',
        `${heightPx / 16}rem`,
        );
        if (classificationRef.value) {
            classificationRef.value.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    } else {
        // Error - classification is hidden
        classificationStyle.value = '';
    }
    return examData;
};

defineExpose({
    load,
    clear,
    calculate,
    isFormEmpty,
    examData: getExamData,
    showChart,
});
</script>

<style>
.diagram-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

select {
    background-color: #fefefe;
    border: 1px solid #848484;
}

.app-layout {
    height: 100%;
}


@media (max-width: 500px) {
    :root {
        --cell-width: 32px;
        --cell-height: 32px;
        --isncsci-anal-function-width: 64px;
        --space-12: 24px;
        /* --isncsci-input-button-height: 35px; */
    }

    praxis-isncsci-input-layout {
        padding: 0 20px;
    }

    /* praxis-isncsci-input {
        width: 100px;
    } */

    isncsci-input-button {
        border: 1px solid red;
        width: 52px;
    }
}

</style>