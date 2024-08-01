<template>
  <MainLayout title="EULA">
    <div class="ion-padding">
      <div v-html="eulaContent"></div>
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
import { eulaContent } from '../eulaContent.ts'

const router = useRouter();
const acceptEula = (): void => {
  localStorage.setItem('eulaAccepted', 'true');
  router.push('/home');
};
</script>