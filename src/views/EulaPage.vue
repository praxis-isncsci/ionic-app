<template>
  <MainLayout title="EULA">
    <div class="ion-padding">
      <div v-html="eulaContent"></div>
      <div v-if="!isEulaAccepted">
        <ion-button @click="acceptEula">Accept</ion-button>
      </div>
      <div v-else>
        <p>Accepted</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  IonButton
} from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router';
import MainLayout from './MainLayout.vue';
import { eulaContent } from '../eulaContent.ts'

const router = useRouter();
const route = useRoute();
const isEulaAccepted = ref(false);

const checkEulaAccepted = (): void => {
  const eulaState = localStorage.getItem('eulaAccepted');
  if (eulaState === 'true') {
    isEulaAccepted.value = true;
  } else {
    isEulaAccepted.value = false;
  }
};

const acceptEula = (): void => {
  localStorage.setItem('eulaAccepted', 'true');
  router.push('/home');
};

onMounted(() => {
  checkEulaAccepted();
});

watch(route, () => {
  checkEulaAccepted();
});
</script>