<template>
    <MainLayout
    title="Learning Mode"
    :showNavbar="true"
    :showFooter="false"
    :helpMode="false"
    >
    <!-- --------------------- header --------------------- -->
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

    <!-- --------------------- list --------------------- -->
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

        <template v-for="d in difficultyOrder" :key="d">
        <!-- skip empty groups -->
        <IonItem v-if="groupedExams[d].length" lines="none" class="category-hdr">
            <IonLabel>
            <IonIcon
                v-for="n in 3"
                :key="n"
                :icon="n <= filledCount(d) ? star : starOutline"
                :color="n <= filledCount(d) ? 'warning' : 'medium'"
                class="hdr-star"
            />
            </IonLabel>
        </IonItem>

        <IonItem
            v-for="{ ex, idx } in groupedExams[d]"
            :key="ex.name"
            button
            detail
            @click="openExam(idx)"
        >
            <IonLabel>{{ ex.name }}</IonLabel>

            <IonNote
            v-if="progressArr[idx].done"
            color="success"
            class="done-note"
            slot="end"
            >
            ✓ {{ formatDate(progressArr[idx].finishedAt) }}
            </IonNote>
        </IonItem>
        </template>
    </IonList>

    <!-- --------------------- details --------------------- -->
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
import { exams as presetExams, PracticeExam, Difficulty } from '@/utils/exams'
import LearningProgress from '@/utils/learningProgress'

const router           = useRouter()
const progressStore    = LearningProgress.getInstance()
const examList         = presetExams
const currentIndex     = ref<number | null>(null)

const filledCount = (d: Difficulty) => (d === 'easy' ? 1 : d === 'medium' ? 2 : 3)


type ExamWithIdx = { ex: PracticeExam; idx: number }
const difficultyOrder: Difficulty[] = ['easy', 'medium', 'hard']

const groupedExams = computed<Record<Difficulty, ExamWithIdx[]>>(() =>
    difficultyOrder.reduce((acc, d) => {
    acc[d] = examList
        .map((ex, idx) => ({ ex, idx }))   // keep idx
        .filter(item => item.ex.difficulty === d)
    return acc
    }, {} as Record<Difficulty, ExamWithIdx[]>)
)


const currentExam = computed<PracticeExam | null>(
    () => (currentIndex.value !== null ? examList[currentIndex.value] : null)
)

onMounted(() => progressStore.init(examList.length))

const progressArr = computed(() =>
    examList.map((_, i) => progressStore.state[i] ?? { done: false })
)

const finishedTotal = computed(
    () => Object.values(progressStore.state).filter(e => e.done).length
)


const openExam      = (idx: number) => (currentIndex.value = idx)
const backToList    = () => (currentIndex.value = null)
const closeTraining = () => router.replace('/home')
const markCompleted = () => currentIndex.value !== null && progressStore.markDone(currentIndex.value)

const formatDate = (iso?: string) =>
    iso
    ? new Intl.DateTimeFormat(undefined, {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        }).format(new Date(iso))
    : ''
</script>

<style scoped>
.exam-wrapper { 
    padding: 1rem 1.25rem 2.5rem; 
    height: 100%; 
    overflow-y: auto; 
}

.hdr { 
    display: flex; 
    flex-direction: column; 
    width: 100%; gap: .25rem; 
    padding-right: 1rem; 
}

.title { 
    font-weight: 600; 
    font-size: 1rem; 
    line-height: 1.2; 
}

.cnt { 
    font-size: .8rem; 
    font-weight: 600; 
    white-space: nowrap; 
}

.barRow { 
    display: flex; 
    align-items: center; 
    gap: .5rem; 
}

.barRow ion-progress-bar { 
    flex: 1; 
    height: 8px; 
}

.category-hdr { 
    padding-top: 1.2rem;
}

.hdr-star { 
    font-size: 1.2rem; 
    margin-right: .15rem; 
}

.done-note { 
    font-size: .8rem; 
}

</style>
