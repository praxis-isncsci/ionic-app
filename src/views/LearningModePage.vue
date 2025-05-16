<template>
    <MainLayout title="Learning Mode" :showNavbar="true" :showFooter="false" :helpMode="false">
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

    <!-- exam list -------------------------------------------------------- -->
    <IonList v-if="!currentExam">
        <IonListHeader>
            <div class="hdr">
                <span class="title">Start practicing by selecting a worksheet</span>

                <span class="cnt">{{ finishedTotal }}/{{ examList.length }}</span>
                <div class="barRow">
                <IonProgressBar
                    :value="finishedTotal / examList.length"
                    color="primary"
                />
                </div>
            </div>
        </IonListHeader>

        <IonItem
        v-for="(ex, idx) in examList"
        :key="ex.name"
        button
        detail
        @click="openExam(idx)"
        >
        <IonLabel>{{ ex.name }}</IonLabel>
        <!-- everything that belongs on the right -->
  <div slot="end" class="end-wrap">
    <!-- difficulty bar -->
    <IonIcon
      v-for="n in 3"
      :key="n"
      :icon="n <= filledCount(ex.difficulty) ? star : starOutline"
      :color="n <= filledCount(ex.difficulty) ? 'warning' : 'medium'"
      class="diff-icon"
    />

    <!-- completion mark -->
    <IonNote
      v-if="progressArr[idx].done"
      color="success"
      class="done-note"
    >
      ✓ {{ formatDate(progressArr[idx].finishedAt) }}
    </IonNote>
  </div>
        </IonItem>
    </IonList>

    <!-- exam detail -------------------------------------------------------- -->
    <div v-else class="exam-wrapper">
        <LearningGrid :exam="currentExam" />
        <LearningClassification
        :expectedResults="currentExam.expected"
        @completed="markCompleted"
        />
    </div>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
    IonProgressBar
} from '@ionic/vue'
import { closeOutline, star, starOutline } from 'ionicons/icons'
import MainLayout from './MainLayout.vue'
import LearningGrid from '@/components/LearningGrid.vue'
import LearningClassification from '@/components/LearningClassification.vue'
import { exams as presetExams, ExamData, Difficulty } from '@/utils/exams'
import LearningProgress from '@/utils/learningProgress'

/* ------------------------------------------------------------------ */
const router        = useRouter()
const progressStore = LearningProgress.getInstance()
const examList      = presetExams
const currentIndex  = ref<number | null>(null)
const filledCount = (d: Difficulty): number => d === 'easy' ? 1 : d === 'medium' ? 2 : 3;

const currentExam = computed<ExamData | null>(() =>
    currentIndex.value !== null ? examList[currentIndex.value] : null
)

const selectedDifficulty = ref<'all' | Difficulty>('all');          // ⬅️ add
const displayedExams = computed(() =>                              // ⬅️ add
    selectedDifficulty.value === 'all'
        ? examList
        : examList.filter(e => e.difficulty === selectedDifficulty.value)
);

onMounted(async () => {
    await progressStore.init(examList.length)
})
const progressArr = computed(() =>
    examList.map((_, i) => progressStore.state[i] ?? { done:false })
)
const finishedTotal = computed(() =>
    Object.values(progressStore.state).filter(e => e.done).length
)
/* navigation -------------------------------------------------------- */
const openExam      = (idx: number) => (currentIndex.value = idx)
const backToList    = () => (currentIndex.value = null)
const closeTraining = () => router.replace('/home')
const markCompleted = () => {
    if (currentIndex.value !== null) progressStore.markDone(currentIndex.value)
}

const formatDate = (iso?: string) =>
iso ? new Intl.DateTimeFormat(undefined,
    { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' })
    .format(new Date(iso)) : ''
</script>

<style scoped>
.exam-wrapper {
    padding: 1rem 1.25rem 2.5rem;
    height: 100%;
    overflow-y: auto;
}

.hdr{
    display:flex;
    flex-direction:column;
    width:100%;
    padding-right: 1rem;
    gap:.25rem;
}

.title{
    font-weight:600;
    font-size:1rem;
    line-height:1.2;
}

.barRow{
    display:flex;
    align-items:center;
    gap:.5rem;
}

.barRow ion-progress-bar{
    flex:1;
    height:8px;
}

.cnt{
    font-size:.8rem;
    font-weight:600;
    white-space:nowrap;
}

.diff-icon {
    font-size: 1.1rem;
    margin-left: 0.25rem;
}

</style>