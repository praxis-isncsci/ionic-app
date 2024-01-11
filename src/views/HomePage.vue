<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">ISNCSCI</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="calculate_onClick">
            <ion-icon slot="start" :icon="calculator"></ion-icon
            >Calculate</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div isncsci-web-app>
        <praxis-isncsci-app-layout :classification-style="classificationStyle">
          <praxis-isncsci-input-layout slot="input-layout" ref="inputLayoutRef">
            <div slot="vac" class="anal-function right">
              <label for="vac"
                ><span class="intermittent">(</span>VAC<span
                  class="intermittent"
                  >) Voluntary anal contraction</span
                ></label
              >
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
              <label for="dap"
                ><span class="intermittent">(</span>DAP<span
                  class="intermittent"
                  >) Deep anal pressure</span
                ></label
              >
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
            <textarea name="comments" id="comments" slot="comments"></textarea>
          </praxis-isncsci-input-layout>
          <praxis-isncsci-input
            slot="input-controls"
            disabled
            ref="inputButtonsRef"
          >
            <label for="consider-normal" slot="consider-normal-label"
              >Consider normal or not normal for classification:</label
            >
            <select
              name="consider-normal"
              id="consider-normal"
              slot="consider-normal"
            >
              <option></option>
              <option value="1" class="cell-input">Consider Normal</option>
              <option value="2" class="cell-input">Consider Not Normal</option>
            </select>
            <label
              for="reason-for-impairment-not-due-to-sci"
              slot="reason-for-impairment-not-due-to-sci-label"
              >If motor impairment not due to SCI, please indicate
              reason:</label
            >
            <select
              id="reason-for-impairment-not-due-to-sci"
              name="reason-for-impairment-not-due-to-sci"
              slot="reason-for-impairment-not-due-to-sci"
            >
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
            <label
              for="reason-for-impairment-not-due-to-sci-specify"
              slot="reason-for-impairment-not-due-to-sci-specify-label"
              >Specify:</label
            >
            <textarea
              id="reason-for-impairment-not-due-to-sci-specify"
              name="reason-for-impairment-not-due-to-sci-specify"
              slot="reason-for-impairment-not-due-to-sci-specify"
            ></textarea>
          </praxis-isncsci-input>
          <praxis-isncsci-classification
            slot="classification"
            ref="classificationRef"
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
            <praxis-isncsci-classification-grid
              slot="neurological-levels"
              class="classification-grid"
            >
              <div slot="heading">Neurological levels</div>
              <div slot="grid">
                <div>&nbsp;</div>
                <div class="text-caption-2 col-header">R</div>
                <div class="text-caption-2 col-header">L</div>
                <div class="text-caption-2 row-header">Sensory</div>
                <praxis-isncsci-classification-total data-total="right-sensory"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total data-total="left-sensory"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <div class="text-caption-2 row-header">Motor</div>
                <praxis-isncsci-classification-total data-total="right-motor"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total data-total="left-motor"
                  >&nbsp;</praxis-isncsci-classification-total
                >
              </div>
            </praxis-isncsci-classification-grid>
            <!-- NLI -->
            <praxis-isncsci-classification-grid slot="nli">
              <div slot="heading">Neurological Level of Injury<br />(NLI)</div>
              <div slot="grid">
                <praxis-isncsci-classification-total
                  data-total="neurological-level-of-injury"
                  >&nbsp;</praxis-isncsci-classification-total
                >
              </div>
            </praxis-isncsci-classification-grid>
            <!-- AIS -->
            <praxis-isncsci-classification-grid slot="ais">
              <div slot="heading">Asia Impairment Scale<br />(AIS)</div>
              <div slot="grid">
                <praxis-isncsci-classification-total
                  data-total="asia-impairment-scale"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="injury-complete"
                  >&nbsp;</praxis-isncsci-classification-total
                >
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
                  data-total="right-sensory-zpp"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="left-sensory-zpp"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <div class="text-caption-2 row-header">Motor</div>
                <praxis-isncsci-classification-total
                  data-total="right-motor-zpp"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total data-total="left-motor-zpp"
                  >&nbsp;</praxis-isncsci-classification-total
                >
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
                  data-total="right-upper-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="left-upper-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="upper-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <div class="text-caption-2 row-header">LEMS</div>
                <praxis-isncsci-classification-total
                  data-total="right-lower-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="left-lower-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="lower-motor-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <div class="text-caption-2 row-header">Light touch</div>
                <praxis-isncsci-classification-total
                  data-total="right-light-touch-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="left-light-touch-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total data-total="touch-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <div class="text-caption-2 row-header">Pin prick</div>
                <praxis-isncsci-classification-total
                  data-total="right-pin-prick-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="left-pin-prick-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
                <praxis-isncsci-classification-total
                  data-total="pin-prick-total"
                  >&nbsp;</praxis-isncsci-classification-total
                >
              </div>
            </praxis-isncsci-classification-grid>
          </praxis-isncsci-classification>
        </praxis-isncsci-app-layout>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

import {calculator, close} from 'ionicons/icons';

import {onBeforeUnmount, onMounted, ref, nextTick} from 'vue';

import {
  AppStoreProvider,
  IsncsciExamProvider,
} from 'isncsci-ui/dist/esm/app/providers';
import {appStore} from 'isncsci-ui/dist/esm/app/store';

/* ISNCSCI UI */
import 'isncsci-ui/dist/esm/web/index.js';
import 'isncsci-ui/dist/css/design-system.css';

import {
  IAppState,
  IExternalMessagePortProvider,
  StatusCodes,
} from 'isncsci-ui/dist/esm/core/boundaries';

import {
  calculateUseCase,
  initializeAppUseCase,
} from 'isncsci-ui/dist/esm/core/useCases';

import {InputLayoutController} from 'isncsci-ui/dist/esm/app/controllers';

const classificationStyle = ref('');
const inputLayoutRef = ref<HTMLElement | null>(null);
const inputButtonsRef = ref<HTMLElement | null>(null);
const classificationRef = ref<HTMLElement | null>(null);
const externalMessagePortProvider: IExternalMessagePortProvider = {
  sendOutExamData: () => {
    console.log('externalMessagePortProvider called');
  },
};

const appStoreProvider = new AppStoreProvider(appStore);
const isncsciExamProvider = new IsncsciExamProvider();
let ready = false;

const stateChanged = (state: IAppState) => {
  if (!ready && state.status === StatusCodes.Ready) {
    console.log(`The application has been initialized and is ready`);
    ready = true;
  }
};

const unsubscribeFromStoreHandler = appStore.subscribe(
  (state: IAppState, actionType: string) => stateChanged(state, actionType),
);

onMounted(() => {
  if (
    inputLayoutRef.value &&
    inputButtonsRef.value &&
    classificationRef.value
  ) {
    new InputLayoutController(
      appStore,
      appStoreProvider,
      inputLayoutRef.value,
      inputButtonsRef.value,
      classificationRef.value,
    );
  }

  initializeAppUseCase(appStoreProvider);
});

onBeforeUnmount(() => {
  if (unsubscribeFromStoreHandler) {
    unsubscribeFromStoreHandler();
  }
});

initializeAppUseCase(appStoreProvider);

const calculate_onClick = () => {
  classificationStyle.value = 'visible';

  nextTick(() => {
    document.documentElement.style.setProperty(
      '--calc-classification-height',
      `${classificationRef.value.clientHeight / 16}rem`,
    );
  });

  const state = appStore.getState();
  calculateUseCase(
    state.gridModel ?? [],
    state.vac,
    state.dap,
    state.rightLowestNonKeyMuscleWithMotorFunction,
    state.leftLowestNonKeyMuscleWithMotorFunction,
    appStoreProvider,
    isncsciExamProvider,
    externalMessagePortProvider,
  );

  return false;
};

const closeClassification_onClick = () => {
  classificationStyle.value = '';

  return false;
};
</script>

<style scoped>
[isncsci-web-app] {
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  height: 100%;
  overflow: hidden;
}
praxis-isncsci-app-layout {
  height: 25rem;
  flex-grow: 1;
}
</style>
