<template>
    <ion-modal :is-open="isOpen" @willDismiss="onWillDismiss">
        <ion-header>
            <ion-toolbar>
                <ion-title>Contact Us</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">
                    <ion-icon name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
    
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label position="stacked">Your Email</ion-label>
                    <ion-input
                    type="email"
                    v-model="senderEmail"
                    placeholder="Email to contact you" />
                </ion-item>
    
                <ion-item>
                    <ion-label>Attach Worksheet (optional)</ion-label>
                    <ion-select
                    v-model="selectedWorksheetId"
                    placeholder="Select a Worksheet"
                    >
                    <ion-select-option
                        v-for="ws in allWorksheets"
                        :key="ws.id"
                        :value="ws.id"
                    >
                        {{ ws.name }}
                    </ion-select-option>
                    </ion-select>
                </ion-item>
    
                <ion-item>
                    <ion-label position="stacked">Your Message</ion-label>
                    <ion-textarea
                    placeholder="Type your message here..."
                    v-model="contactMessage"
                    ></ion-textarea>
                </ion-item>
            </ion-list>
    
            <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                <ion-button color="primary" @click="sendContactForm" :disabled="sending">
                    <span v-if="sending">
                        <ion-spinner name="crescent"></ion-spinner>
                        Sending...
                    </span>
                    <span v-else>Send</span>
                </ion-button>
                <ion-button color="medium" @click="closeModal">Close</ion-button>
            </div>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from "vue";
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonSpinner
    } from "@ionic/vue";
    import { showToast } from "@/utils/alertsPrompts";
    import { IWorksheetMetaItem, Worksheets } from "@/utils/worksheetUtils";

    defineProps<{ isOpen: boolean }>();
    const emit = defineEmits(["update:isOpen"]);

    const senderEmail = ref("");
    const contactMessage = ref("");
    const selectedWorksheetId = ref<string | null>(null);
    const allWorksheets = ref<IWorksheetMetaItem[]>([]);
    const sending = ref(false);
    const worksheets = Worksheets.getInstance();

    onMounted(async () => {
        await worksheets.loadMeta();
        allWorksheets.value = worksheets.getAllMeta();
    });

    const closeModal = () => {
        emit("update:isOpen", false);
    };
    const onWillDismiss = () => {
        emit("update:isOpen", false);
    };

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const sendContactForm = async () => {
        if (sending.value) return;
        sending.value = true;

        if (!senderEmail.value.trim()) {
            await showToast("Please enter your email.");
            sending.value = false;
            return;
        }

        if (!EMAIL_RE.test(senderEmail.value)) {
            await showToast("Please enter a valid email.");
            sending.value = false;
            return;
        }

        const payload: any = {
            Email:   senderEmail.value.trim(),
            Name:    `ISNCSCI App User — ${senderEmail.value.trim()}`,
            Comment: contactMessage.value,
            NeurologyModel: null
        };

        if (selectedWorksheetId.value) {
            const worksheet = await worksheets.getWorksheet(selectedWorksheetId.value);
            if (!worksheet) {
                await showToast("Selected worksheet not found.");
                sending.value = false;
                return;
            }
            payload.NeurologyModel = worksheet.examData;
        }

        console.log("sending to BE w/ examData:", payload);

        try {
            const response = await fetch("https://isncscialgorithm.com/Contact/Feedback2", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(payload)
            });
            if (!response.ok) {
            console.error(await response.text()); 
        throw new Error("network");}
            await showToast(
            selectedWorksheetId.value
                ? "Message with attachment sent. Thanks for contacting us."
                : "Message sent. Thanks for contacting us."
            );
            contactMessage.value     = "";
            selectedWorksheetId.value = null;
            closeModal();

        } catch (e) {
            console.error(e);
            await showToast("Failed to send. Please try again.");
        } finally {
            sending.value = false;
        }
        };

</script>

<style scoped>
</style>
