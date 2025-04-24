<template>
    <MainLayout title="Learning Mode" :showNavbar="false" :showFooter="false">
      <!-- header -------------------------------------------------------- -->
      <template #header-buttons>
        <IonButtons slot="start" v-if="currentExam">
          <IonBackButton :defaultHref="undefined" @click="backToList" />
        </IonButtons>
        <IonButtons slot="end">
          <IonButton fill="clear" @click="closeTraining">
            <IonIcon :icon="closeOutline" slot="icon-only" />
          </IonButton>
        </IonButtons>
      </template>
  
      <!-- exam list ----------------------------------------------------- -->
      <IonList v-if="!currentExam">
        <IonListHeader>Start practicing by selecting a worksheet</IonListHeader>
  
        <IonItem
          v-for="(ex, idx) in examList"
          :key="ex.name"
          button
          detail
          @click="openExam(idx)"
        >
          <IonLabel>{{ ex.name }}</IonLabel>
          <IonNote
            v-if="completed.has(idx)"
            slot="end"
            color="success"
            class="ion-text-end"
          >
            ✓ done
          </IonNote>
        </IonItem>
      </IonList>
  
      <!-- exam detail --------------------------------------------------- -->
      <div v-else class="exam-wrapper">
        <TrainingGrid :exam="currentExam" />
        <TrainingClassification
          :expectedResults="currentExam.expected"
          @completed="markCompleted"
        />
      </div>
    </MainLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  import {
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonNote,
  } from '@ionic/vue'
  import { closeOutline } from 'ionicons/icons'
  
  import MainLayout from './MainLayout.vue'
  import TrainingGrid from '@/components/TrainingGrid.vue'
  import TrainingClassification from '@/components/TrainingClassification.vue'
  import { exams as presetExams, ExamData } from '@/utils/exams'
  
  /* ------------------------------------------------------------------ */
  const router        = useRouter()
  const examList      = presetExams                     // static array
  const completed     = ref<Set<number>>(new Set())     // done flags
  const currentIndex  = ref<number | null>(null)
  
  const currentExam = computed<ExamData | null>(() =>
    currentIndex.value !== null ? examList[currentIndex.value] : null
  )
  
  /* navigation ------------------------------------------------------- */
  const openExam      = (idx: number) => (currentIndex.value = idx)
  const backToList    = () => (currentIndex.value = null)
  const closeTraining = () => router.replace('/home')
  const markCompleted = () => {
    if (currentIndex.value !== null) completed.value.add(currentIndex.value)
  }
  </script>
  
  <style scoped>
  .exam-wrapper {
    padding: 1rem 1.25rem 2.5rem;
    height: 100%;
    overflow-y: auto;
  }
  </style>
