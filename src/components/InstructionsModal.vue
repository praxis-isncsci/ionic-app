<template>
    <ion-header>
    <ion-toolbar color="primary">
        <ion-title>Help</ion-title>
        <ion-buttons slot="end">
        <ion-button fill="clear" @click="finish(false)">Close</ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-list lines="none" class="tips">
            <ion-item>
                <ion-icon slot="start" :icon="informationCircleOutline" class="tip-icon" />
                <ion-label><strong>Help Mode</strong>: access Help, Motor Exam Guide and Key Sensory Point Guide.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="manOutline" class="tip-icon" />
                <ion-label><strong>Dermatome</strong>: open the dermatome chart at any time.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="documentOutline" class="tip-icon" />
                <ion-label><strong>New Exam</strong>: opens a blank form. If there are unsaved changes you’ll be asked to save or discard them.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="saveOutline" class="tip-icon" />
                <ion-label><strong>Save exam</strong>: enter a worksheet name and exam date.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="calculatorOutline" class="tip-icon" />
                <ion-label><strong>Calculate</strong>: runs classification. Missing inputs are listed in an error message.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="chevronUp" class="tip-icon" />
                <ion-label><strong>Arrow-Up menu</strong>: EULA, Saved Worksheets, Export, Learning Mode, Contact Us.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="newspaperOutline" class="tip-icon" />
                <ion-label><strong>EULA</strong>: review the End-User Licence Agreement.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="bulbOutline" class="tip-icon" />
                <ion-label><strong>Learning mode</strong>: practice exam classification.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="folderOpenOutline" class="tip-icon" />
                <ion-label><strong>Saved Worksheets</strong>: rename and change exam date, edit or delete any saved exam.</ion-label>
            </ion-item>

            <!-- <ion-item>
                <ion-icon slot="start" :icon="downloadOutline" class="tip-icon" />
                <ion-label><strong>Export PDF</strong>: export all data; empty form exports a blank ASIA form.</ion-label>
            </ion-item> -->
            <ion-item>
                <ion-icon slot="start" :icon="downloadOutline" class="tip-icon" />
                <ion-label>
                    <strong>Export PDF</strong>:
                    exports all data (exports a blank ASIA form if the worksheet is empty).<br />
                    <em>Saves to {{ exportPath }}</em>.
                </ion-label>
            </ion-item>

            <ion-item> 
                <ion-icon slot="start" :icon="mailOutline" class="tip-icon" />
                <ion-label><strong>Contact Us</strong>: send feedback or questions related to app functionality or specific ISNCSCI exams questions.</ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Multi-select</strong>: pick two cells to highlight a range for bulk fill or clear.</ion-label>
            </ion-item>

            <ion-item>
                <ion-label class="remove-tip">
                    <strong>Remove values</strong>:
                    select a cell or range, then tap
                    <span class="purple-fake-btn">1</span>
                    (purple button) to clear them.
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Basic Data Input</strong>: placeholder.</ion-label>
            </ion-item>
            
        </ion-list>
    </ion-content>

    <ion-footer>
    <ion-toolbar>
        <ion-button slot="end" expand="block" @click="finish(true)">Got it</ion-button>
    </ion-toolbar>
    </ion-footer>
</template>

<script setup lang="ts">
import { modalController, IonContent, isPlatform, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { markInstructionsSeen } from '@/utils/instructions';
import { bulbOutline, calculatorOutline, chevronUp, documentOutline, downloadOutline, folderOpenOutline, informationCircleOutline, mailOutline, manOutline, newspaperOutline, saveOutline } from 'ionicons/icons';

const exportPath =
    isPlatform('ios')
        ? 'Files › On My iPhone › isncsci'
        : isPlatform('android')
        ? 'Files app › Internal storage › Documents'
        : 'your browser’s download folder';

const props = withDefaults(defineProps<{ rememberOnClose?: boolean }>(), {
    rememberOnClose: false,
});

const finish = (primary: boolean) => {
    if (primary && props.rememberOnClose) markInstructionsSeen();
    modalController.dismiss();
}
</script>

<style scoped>
.tip-icon { 
    font-size: 24px; color: var(--ion-color-primary); 
}

.tips ion-item { 
    --inner-padding-end: 0; 
}
.remove-tip .purple-fake-btn {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 0 2px 0 4px;
    background: #800080;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    border-radius: 4px;
    user-select: none;
}
</style>
