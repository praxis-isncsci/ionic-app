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
                <ion-label><strong>Save Exam</strong>: enter an exam name and date.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="calculatorOutline" class="tip-icon" />
                <ion-label><strong>Calculate</strong>: runs classification. Missing inputs are listed in an error message.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="chevronUp" class="tip-icon" />
                <ion-label><strong>Arrow Up Menu</strong>: access the EULA, Learning Mode, Saved Exams, Export, Contact Us.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="newspaperOutline" class="tip-icon" />
                <ion-label><strong>EULA</strong>: review the End-User Licence Agreement.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="bulbOutline" class="tip-icon" />
                <ion-label><strong>Learning Mode</strong>: practice exam classification.</ion-label>
            </ion-item>

            <ion-item>
                <ion-icon slot="start" :icon="folderOpenOutline" class="tip-icon" />
                <ion-label><strong>Saved Exams</strong>: rename and change exam date, edit or delete any saved exam.</ion-label>
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
                <ion-label><strong>Contact Us</strong>: send feedback, questions related to app functionality, or specific ISNCSCI exam questions.</ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Multi-select</strong>: 
                    <p>
                        Click on two cells to highlight the range of cells between them, then enter the value which will populate all highlighted cells. This feature can be used to both bulk enter and bulk clear a group of cells. You clear values entered in a group of cells by highlighting the cell range and then clicking on the purple highlighted button.
                    </p>
                    </ion-label>
            </ion-item>

            <ion-item>
                <ion-label class="remove-tip">
                    <strong>Remove Values</strong>:
                    <p>
                        Select a cell or range, then tap
                        <span class="purple-fake-btn">1</span>
                        (purple button) to clear them.
                    </p>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Data Input</strong>:
                    <p>
                        Click on any grid cell to select it. At the bottom of the interface you will see a collection of buttons, with values between 0 and 5, as well as ‘*’ and Not testable. The buttons will enable or disable depending on the type of cell selected. Click on any of the enabled buttons. The value will be entered on the selected cell or range of cells. If you click on an asterisk *, the value to its left will be entered.
                        The first value entered for each column (e.g. right motor) will auto-populate down through all cells below. After this, values will not auto-populate and you can use the <em>Multi-select</em> button to enter the same value for multiple cells at the same time. 
                        Once you have selected a cell, you can use the input buttons to enter data into a grid.
                        You can enter values on a selected cell by tapping the 0, 1, 2, 3, 4, 5, n, and * keys.
                        The drawing of the person ("Dermatome Chart") will change colour, indicating the minimum value entered for the sensory value at each dermatome.
                    </p>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>When to use an asterisk (*) while entering motor and sensory scores.</strong> 
                    <p>
                        If, while performing the bedside exam, a key muscle or dermatome does not test normally for a reason other than spinal cord injury (e.g., peripheral neuropathy, pre-existing myoneural disease, plexopathy, etc.), enter the motor or sensory grade obtained during testing and flag that value with an asterisk to indicate that the weakness or sensory change is due to something other than the spinal cord injury. The resulting grade will be displayed as 0*, 1*, 2*, etc. to indicate both the value obtained during bedside examination, as well as the fact that this grade represents a weakness or sensory change due to something other than the spinal cord injury.
                        In the instance that a key muscle or dermatome is not able to be tested, but is believed to have weakness or sensory change due to something other than the SCI (e.g. brachial plexus injury with an arm cast), enter NT and flag that value with an asterisk.
                        For the purposes of accurate classification of the spinal cord injury, after flagging a value with an asterisk to indicate an impairment not due to spinal cord injury, an input box will become available for you to specify if the value should be considered ‘normal’ or ‘not normal’ for classification. You are required to choose a value for this box (* tagged values without this information will display with a ! above the value). The algorithm will then use the ‘normal’ or ‘not normal’ score option(s) when determining the sensory levels, motor levels, NLI, AIS and ZPP. For this purpose, consider ‘normal’ will result in a normal value of 5(for motor) or 2(for sensory) being used. Consider ‘not normal’ will result in all possible abnormal values for motor or sensory being used. Information entered here will automatically display in the Comments section of the exam worksheet in the downloaded PDF version.
                        Note: the algorithm uses the examined and not assumed (i.e. ‘normal’ or ‘not normal’ values) for calculating the motor and sensory total and subscores, and as such these will not be tagged with an asterisk.
                    </p>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Providing a reason for impairment values not due to a Spinal Cord Injury.</strong> 
                    <p>
                        After flagging a value with an asterisk to indicate an impairment not due to spinal cord injury, extra input boxes will become available for you to specify what the reason for the impairment is (e.g. plexopathy or pain) and any comments you may need to add (e.g. brachial plexus injury). The reason dropdown box contains a list of possible reasons for the impairment and the ‘other (specify)’ option can be chosen for any reason not specifically listed. You can enter any extra information into the specify text box. All information entered here will automatically display in the Comments section of the Assessment form.
                    </p>
                    </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>When to use NT (Not Testable).</strong> 
                    <p>
                        If a motor, sensory, deep anal pressure or any anal sensation value is unable to be tested, please enter NT, or not testable. This may be for a variety of reasons: if the key muscle is not available for testing (e.g. joint is casted or fused with less than 50% of the normal range of motion available, etc.) or if the dermatome is not available for testing (e.g. covered by a dressing, burn, etc.).
                        When entering a value as NT, please use the asterisk(*) flag if it applies per the instructions above in that section.
                        The algorithm will substitute all possible values to determine the resulting classification. If more than one classification is possible, the algorithm will display ‘ND’ representing that it is Not Determinable. In calculating motor and sensory total and subscores, the algorithm will display ND if any motor or sensory values are NT.
                    </p>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Lowest non-key muscles.</strong> 
                    <p>
                        If motor function in a non-key muscle below the level of injury is noted while performing the bedside exam, choose the lowest (i.e. most caudal) muscle group with any motor function from the drop down lists provided. This information will be added to the Comments section of the Assessment form in the downloaded version. The algorithm will use this information to determine the AIS.
                    </p>
                    </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Performing a calculation.</strong> 
                    <p>
                        After you have entered all values, use the <em>Calculate</em> button to obtain the calculated classification variables.  If the form is missing information required to calculate an error box will pop up listing the missing fields. Please note, if any score has been flagged with an asterisk, entering information on how it should be considered during classification is required to calculate.
                    </p>
                    </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>What is ND (Not Determinable)?</strong> 
                    <p>
                        A calculated value of ND will be displayed when the value of that calculated field is not able to be determined conclusively. This may be due to the location or amount of Not Testable (NT) values entered, or values entered, flagged with an asterisk, and marked as consider ‘not normal’ for classification. In this case the calculated value will display ND followed by all possible values for that field. In the case of motor and sensory total and subscores, possible values are not displayed.
                    </p>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>When should an asterisk(*) be used for a classification variable?</strong> 
                    <p>
                        When determining if a classification variable requires an “*”, the International Standards Committee recommends the following steps:
                    </p>
                    <ol>
                        <li>First, perform the classification by replacing the “*”-tagged scores with the assumed ones.</li>
                        <li>Record the classification results in the respective boxes at the bottom of the ISNCSCI worksheet.</li>
                        <li>Next, use the actual examined scores and re-classify.</li>
                        <li>All classification variables that are different between the examined score value and the assumed score value (i.e. what a clinician assumes is representative of the SCI itself, without the non-SCI condition) should receive an “*”.</li>
                    </ol>
                </ion-label>
            </ion-item>

            <ion-item>
                <ion-label><strong>Reporting a form presenting an error</strong> 
                    <p>
                        We are always trying to improve the algorithm and encourage you to report any errors you may encounter. If you find that a form is not being calculated correctly please follow these steps:
                    </p>

                    <ol>
                        <li>Ensure the worksheet is saved.</li>
                        <li>Select the <em>Contact Us</em> button.</li>
                        <li>Please enter your email contact information and add the details of the error in the message box. We will keep your contact information private and will only use it to contact you in case more details are required to fix the issue.</li>
                        <li>Enter your email contact information and information about the error.</li>
                        <li>Attach a worksheet from your saved worksheets.</li>
                        <li>Click the <em>Send</em> button.</li>
                    </ol>
                </ion-label>
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
