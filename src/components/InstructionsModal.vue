<template>
    <ion-header>
    <ion-toolbar color="primary">
        <ion-title>Instructions</ion-title>
        <ion-buttons slot="end">
        <ion-button fill="clear" @click="finish(false)">Close</ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-list lines="none" class="tips">
            <ion-item>
                <ion-icon slot="start" :icon="informationCircleOutline" class="tip-icon" />
                <ion-label><strong>Help Mode</strong>: access Tips, Motor Exam Guide and Key Sensory Point Guide.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="manOutline" class="tip-icon" />
                <ion-label><strong>Dermatome</strong>: review the chart any time.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="documentOutline" class="tip-icon" />
                <ion-label><strong>New Exam</strong>: starts a blank form. Unsaved changes? You’ll be asked to save or discard.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="saveOutline" class="tip-icon" />
                <ion-label><strong>Save exam</strong>: enter a worksheet name and exam date.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="calculatorOutline" class="tip-icon" />
                <ion-label><strong>Calculate</strong>: runs classification. Missing inputs show an error with the required cells.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="chevronUp" class="tip-icon" />
                <ion-label><strong>Arrow-Up menu</strong>: EULA, Saved Worksheets, Export, Learning Mode, Contact Us.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="newspaperOutline" class="tip-icon" />
                <ion-label><strong>EULA</strong>: review User Agreement.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="bulbOutline" class="tip-icon" />
                <ion-label><strong>Learning mode</strong>: turn on learning mode.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="folderOpenOutline" class="tip-icon" />
                <ion-label><strong>Saved Worksheets</strong>: rename/change exam date, edit, or delete saved exams.</ion-label>
            </ion-item>

            <!-- <ion-item>
                <ion-icon slot="start" :icon="downloadOutline" class="tip-icon" />
                <ion-label><strong>Export PDF</strong>: export all data; empty form exports a blank ASIA form.</ion-label>
            </ion-item> -->
            <ion-item>
                <ion-icon slot="start" :icon="downloadOutline" class="tip-icon" />
                <ion-label><strong>Export PDF</strong>: export all data; empty form exports a blank ASIA form.</ion-label>
                <!-- <ion-label>
                    <strong>Export&nbsp;PDF</strong>:
                    saves to <em>Files › On My iPhone › ISNCSCI</em> on iOS, or the
                    <em>Downloads</em> folder on Android.
                </ion-label> -->
                <ion-label>
                    <strong>Saves to</strong>: <br>
                    <em>Files › On My iPhone › isncsci</em> on iOS, 
                    <br>
                    <em>Files app › Internal storage › Documents</em> on Android.
                </ion-label>
            </ion-item>

            <ion-item> 
                <ion-icon slot="start" :icon="mailOutline" class="tip-icon" />
                <ion-label><strong>Contact Us</strong>: send your feedback or question to the team.</ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Multi-select</strong>: pick two cells to select a range for bulk fill/clear.</ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Remove values</strong>: select the cell or range of cells, tap the highlighted button.</ion-label>
            </ion-item>
            
        </ion-list>
    </ion-content>

    <ion-footer>
    <ion-toolbar>
        <ion-button expand="block" @click="finish(true)">Got it</ion-button>
    </ion-toolbar>
    </ion-footer>
</template>

<script setup lang="ts">
import { modalController, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { markInstructionsSeen } from '@/utils/instructions';
import { bulbOutline, calculatorOutline, chevronUp, documentOutline, downloadOutline, folderOpenOutline, informationCircleOutline, mailOutline, manOutline, newspaperOutline, saveOutline } from 'ionicons/icons';

const props = withDefaults(defineProps<{
    rememberOnClose?: boolean;   // true when shown on first use
}>(), { rememberOnClose: false });

function finish(primary: boolean) {
    if (primary && props.rememberOnClose) markInstructionsSeen();
    modalController.dismiss();
}
</script>

<style scoped>
.tip-icon { font-size: 24px; color: var(--ion-color-primary); }
.tips ion-item { --inner-padding-end: 0; }
</style>
