<template>
  <ion-page>
    <ion-header v-if="showNavbar">
      <ion-toolbar>
        <ion-title @click="handleTitleClick">{{ title }}</ion-title>

        <slot name="header-buttons"></slot>
        <ion-buttons slot="end">
          <template v-if="title === 'ISNCSCI'">

            <ion-icon
              :icon="informationCircleOutline"
              v-if="!helpMode"
              @click="enableHelp"
              style="font-size: 1.4rem; margin-right: 12px;"
            ></ion-icon>

            <ion-icon
              v-else
              :icon="informationCircle"
              @click="disableHelp"
              style="color: #428cff; font-size: 1.4rem; margin-right: 12px;"
            ></ion-icon>
          </template>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <slot name="worksheet-info-slot"></slot>
    <ion-content>
      <slot></slot>
    </ion-content>

    <ion-footer v-if="showFooter">
      <slot name="footer-buttons"></slot>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
  IonTitle
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { informationCircleOutline, informationCircle } from 'ionicons/icons';
import { IonIcon, IonButtons } from '@ionic/vue';

const props = defineProps<{
  title: string;
  showNavbar: boolean;
  showFooter: boolean;
  helpMode: boolean;
}>();

const emit = defineEmits(['update:helpMode']);

const enableHelp = () => {
  emit('update:helpMode', true);
}

const disableHelp = () => {
  emit('update:helpMode', false);
}

const router = useRouter();
const handleTitleClick = () => {
  if (props.title === 'EULA') {
    const eulaAccepted = localStorage.getItem('eulaAccepted');
    if (eulaAccepted === 'true') {
      router.push('/home');
    }
  } else if (props.title === 'ISNCSCI') {
    router.push('/eula');
  }
};
</script>

<style scoped>
.footer-text {
  text-align: center;
  padding: 5px;
  font-size: x-small;
}
</style>