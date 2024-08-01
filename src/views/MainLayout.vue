<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title @click="handleTitleClick">{{ title }}</ion-title>
        <slot name="header-buttons"></slot>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <slot></slot>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <div class="footer-text">Copyright Praxis Institute</div>
      </ion-toolbar>
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
const props = defineProps<{
  title: string;
}>();

const router = useRouter();
const handleTitleClick = () => {
  if (props.title === 'EULA') {
    const eulaAccepted = localStorage.getItem('eulaAccepted');
    if (eulaAccepted === 'true') {
      router.push('/home');
      console.log('clicked!!!!!!')
    }
  } else if (props.title === 'ISNCSCI') {
    router.push('/eula');
    console.log('eula!!!!!!')
  }
};
</script>

<style scoped>
.footer-text {
  text-align: center;
  padding: 10px;
}
</style>