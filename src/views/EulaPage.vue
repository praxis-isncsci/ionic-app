<template>
  <MainLayout title="EULA">
    <div class=" ion-padding">
      <p>End User License Agreement content goes here...</p>
      <ion-button @click="acceptEula">Accept</ion-button>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import {
  IonButton
} from '@ionic/vue'
import { useRouter } from 'vue-router';
import MainLayout from './MainLayout.vue';

const router = useRouter();
const acceptEula = (): void => {
  localStorage.setItem('eulaAccepted', 'true');
  router.push('/home');
};
</script>