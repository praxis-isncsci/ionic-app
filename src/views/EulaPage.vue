<template>
  <MainLayout title="EULA">
    <div class="ion-padding">
      <div v-html="eulaContent" class="eula-content"></div>
      <div v-if="!isEulaAccepted">
        <ion-button @click="acceptEula">Accept</ion-button>
      </div>
      <div v-else class="accepted-container">
        <p class="accepted-text">
          <ion-icon :icon="checkmarkOutline" class="checkmark-icon"></ion-icon>
          Accepted
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonButton, IonIcon
} from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import MainLayout from './MainLayout.vue';
import { eulaContent } from '../eulaContent'

const router = useRouter();
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
  isEulaAccepted.value = true;
  router.push('/home');
};

onMounted(() => {
  checkEulaAccepted();
});

</script>

<style scoped>
.eula-content {
  display: flex;
  flex-direction: column;
  font-family: var(--ion-font-family, 'Inter', Arial, sans-serif);
  font-size: var(--ion-font-size, 14px);
  font-weight: 400;
  line-height: 20px;
}

.accepted-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.accepted-text {
  display: flex;
  align-items: center;
  font-size: var(--ion-font-size, 16px);
  font-weight: 600;
  color: var(--ion-color-success);
}

.checkmark-icon {
  margin-right: 5px;
  color: var(--ion-color-success);
  border: 1px solid var(--ion-color-success);
  border-radius: 2px;
}
</style>