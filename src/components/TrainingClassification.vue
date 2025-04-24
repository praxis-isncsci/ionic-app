<template>
    <form class="c-form" @submit.prevent="check">
      <!-- neurological levels ---------------------------------------- -->
      <fieldset>
        <legend>Neurological levels</legend>
        <div class="row">
          <label>Sensory R</label>
          <LevelSelect v-model="a.sensoryRight" :bad="b.sensoryRight" />
          <label>L</label>
          <LevelSelect v-model="a.sensoryLeft"  :bad="b.sensoryLeft" />
        </div>
        <div class="row">
          <label>Motor R</label>
          <LevelSelect v-model="a.motorRight" :bad="b.motorRight" />
          <label>L</label>
          <LevelSelect v-model="a.motorLeft"  :bad="b.motorLeft" />
        </div>
      </fieldset>
  
      <fieldset class="row">
        <label>NLI</label>
        <LevelSelect v-model="a.nli" :bad="b.nli" />
      </fieldset>
  
      <fieldset class="row">
        <label>AIS</label>
        <select v-model="a.ais" :class="{bad:b.ais===false}">
          <option disabled value="">—</option>
          <option v-for="g in ['A','B','C','D','E']" :key="g">{{ g }}</option>
        </select>
  
        <select v-model="a.completeness" :class="{bad:b.completeness===false}">
          <option>Complete</option><option>Incomplete</option>
        </select>
      </fieldset>
  
      <fieldset>
        <legend>ZPP</legend>
        <div class="row">
          <label>Sensory R</label>
          <LevelSelect v-model="a.zppSensoryRight" :allowNone="true" :bad="b.zppSensoryRight"/>
          <label>L</label>
          <LevelSelect v-model="a.zppSensoryLeft"  :allowNone="true" :bad="b.zppSensoryLeft"/>
        </div>
        <div class="row">
          <label>Motor R</label>
          <LevelSelect v-model="a.zppMotorRight" :allowNone="true" :bad="b.zppMotorRight"/>
          <label>L</label>
          <LevelSelect v-model="a.zppMotorLeft"  :allowNone="true" :bad="b.zppMotorLeft"/>
        </div>
      </fieldset>
  
      <p v-if="msg" :class="{'ok':ok,'err':!ok}">{{ msg }}</p>
  
      <div class="actions">
        <IonButton type="submit" color="primary">Submit</IonButton>
        <IonButton
          v-if="showKey"
          fill="outline"
          color="secondary"
          @click="reveal"
        >
          Answer key
        </IonButton>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { IonButton } from '@ionic/vue'
  import { ExpectedResults } from '@/utils/exams'
  
  /* ---------- props / emit ------------------------------------------- */
  const { expectedResults } = defineProps<{ expectedResults: ExpectedResults }>()
  const emit = defineEmits<{ completed: [] }>()
  
  /* ---------- helper data -------------------------------------------- */
  const levelsAll = [
    'C2','C3','C4','C5','C6','C7','C8','T1','T2','T3','T4','T5','T6','T7','T8',
    'T9','T10','T11','T12','L1','L2','L3','L4','L5','S1','S2','S3','S4-5'
  ]
  
  /* ---------- answers / validation ----------------------------------- */
  const a = reactive({
    sensoryRight:'', sensoryLeft:'', motorRight:'', motorLeft:'',
    nli:'', ais:'', completeness:'Incomplete',
    zppSensoryRight:'', zppSensoryLeft:'', zppMotorRight:'', zppMotorLeft:''
  })
  const b = reactive<Record<keyof typeof a, boolean | null>>(
    Object.fromEntries(Object.keys(a).map(k=>[k,null])) as any
  )
  
  const msg     = ref('')
  const ok      = ref(false)
  const showKey = ref(false)
  
  /* ---------- check logic -------------------------------------------- */
  function check(){
    const e = expectedResults
    const U = (s:string)=>s.trim().toUpperCase()
    const Z = (s:string)=>s ? s.toUpperCase() : ''
  
    b.sensoryRight     = U(a.sensoryRight)     === e.sensoryRight.toUpperCase()
    b.sensoryLeft      = U(a.sensoryLeft)      === e.sensoryLeft.toUpperCase()
    b.motorRight       = U(a.motorRight)       === e.motorRight.toUpperCase()
    b.motorLeft        = U(a.motorLeft)        === e.motorLeft.toUpperCase()
    b.nli              = U(a.nli)              === e.nli.toUpperCase()
    b.ais              = U(a.ais)              === e.ais.toUpperCase()
    b.completeness     = a.completeness        === e.completeness
    b.zppSensoryRight  = U(a.zppSensoryRight)  === Z(e.zppSensoryRight)
    b.zppSensoryLeft   = U(a.zppSensoryLeft)   === Z(e.zppSensoryLeft)
    b.zppMotorRight    = U(a.zppMotorRight)    === Z(e.zppMotorRight)
    b.zppMotorLeft     = U(a.zppMotorLeft)     === Z(e.zppMotorLeft)
  
    ok.value  = Object.values(b).every(v=>v===true)
    msg.value = ok.value ? 'All Correct' : 'Recalculate highlighted results'
    showKey.value = !ok.value
    if (ok.value) emit('completed')
  }
  
  /* ---------- reveal key --------------------------------------------- */
  function reveal(){
    Object.assign(a, {
      sensoryRight: expectedResults.sensoryRight,
      sensoryLeft : expectedResults.sensoryLeft,
      motorRight  : expectedResults.motorRight,
      motorLeft   : expectedResults.motorLeft,
      nli         : expectedResults.nli,
      ais         : expectedResults.ais,
      completeness: expectedResults.completeness,
      zppSensoryRight: expectedResults.zppSensoryRight,
      zppSensoryLeft : expectedResults.zppSensoryLeft,
      zppMotorRight  : expectedResults.zppMotorRight,
      zppMotorLeft   : expectedResults.zppMotorLeft,
    })
    showKey.value = false
  }
  
  /* ---------- inline LevelSelect component --------------------------- */
  import { defineComponent, PropType } from 'vue'
 const LevelSelect = defineComponent({
   name: 'LevelSelect',
  props: {
     modelValue: { type: String, default: '' },
     allowNone : { type: Boolean, default: false },
    /*  accept boolean **or** null  */
     bad       : { type: Boolean as PropType<boolean | null>, default: null },
   },
    emits: ['update:modelValue'],
    setup(props,{emit}){
      const opts = [
        ...(props.allowNone ? [''] : []),
        ...levelsAll
      ]
      return { opts, emit }
    },
    template: `
      <select
        :value="modelValue"
        @change="emit('update:modelValue', $event.target.value)"
        :class="{bad:bad===false}"
      >
        <option v-if="allowNone" value="">—</option>
        <option v-for="l in opts" :key="l" :value="l">{{ l }}</option>
      </select>
    `
  })
  </script>
  
  <style scoped>
  .c-form { display:flex; flex-direction:column; gap:0.75rem; font-size:0.83rem; }
  
  fieldset { border:1px solid #ccc; border-radius:4px; padding:0.5rem; }
  legend   { font-weight:600; font-size:0.78rem; }
  .row     { display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center; }
  
  select, input { padding:0.15rem 0.35rem; border:1px solid #ccc; border-radius:4px; }
  .bad { border-color:#e84d4d !important; background:#ffecec; }
  
  p.ok  { color:#2e7d32; font-weight:600; text-align:center; }
  p.err { color:#e84d4d; text-align:center; }
  
  .actions { display:flex; justify-content:center; gap:0.75rem; }
  </style>
  


<!-- <template>
    <div class="training-classification">
        <div class="classification-form">
            <h3>Neurological levels</h3>
            <div class="level-row">
                <label>Sensory R:</label>
                <input v-model="userAnswers.sensoryRight" :class="{ incorrect: validation.sensoryRight === false }" />
                <label>L:</label>
                <input v-model="userAnswers.sensoryLeft" :class="{ incorrect: validation.sensoryLeft === false }" />
            </div>
            <div class="level-row">
                <label>Motor R:</label>
                <input v-model="userAnswers.motorRight" :class="{ incorrect: validation.motorRight === false }" />
                <label>L:</label>
                <input v-model="userAnswers.motorLeft" :class="{ incorrect: validation.motorLeft === false }" />
            </div>
            <div class="nli-row">
                <label>Neurological Level of Injury (NLI):</label>
                <input v-model="userAnswers.nli" :class="{ incorrect: validation.nli === false }" />
            </div>
            <div class="ais-row">
                <label>Asia Impairment Scale (AIS):</label>
                <select v-model="userAnswers.ais" :class="{ incorrect: validation.ais === false }">
                    <option value="" disabled>Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <select v-model="userAnswers.completeness" :class="{ incorrect: validation.completeness === false }">
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>
            <div class="zpp-section">
                <h4>Zone of partial preservation (ZPP)</h4>
                <div class="level-row">
                    <label>Sensory R:</label>
                    <input v-model="userAnswers.zppSensoryRight" :class="{ incorrect: validation.zppSensoryRight === false }" />
                    <label>L:</label>
                    <input v-model="userAnswers.zppSensoryLeft" :class="{ incorrect: validation.zppSensoryLeft === false }" />
                </div>
                <div class="level-row">
                    <label>Motor R:</label>
                    <input v-model="userAnswers.zppMotorRight" :class="{ incorrect: validation.zppMotorRight === false }" />
                    <label>L:</label>
                    <input v-model="userAnswers.zppMotorLeft" :class="{ incorrect: validation.zppMotorLeft === false }" />
                </div>
            </div>
            <button class="submit-btn" @click="checkAnswers">Submit</button>
            <div class="feedback" v-if="feedbackMessage">{{ feedbackMessage }}</div>
        </div>
    <div class="solution-panel" v-if="showSolution">
        <h3>Classification</h3>
        <p><strong>Neurological levels:</strong> Sensory R = {{ expectedResults.sensoryRight }}, L = {{ expectedResults.sensoryLeft }}; 
        Motor R = {{ expectedResults.motorRight }}, L = {{ expectedResults.motorLeft }}</p>
        <p><strong>Neurological Level of Injury (NLI):</strong> {{ expectedResults.nli }}</p>
        <p><strong>Asia Impairment Scale (AIS):</strong> {{ expectedResults.ais }} ({{ expectedResults.completeness }})</p>
        <p><strong>Zone of partial preservation:</strong> Sensory R = {{ expectedResults.zppSensoryRight || 'None' }}, 
        L = {{ expectedResults.zppSensoryLeft || 'None' }}; 
        Motor R = {{ expectedResults.zppMotorRight || 'None' }}, 
        L = {{ expectedResults.zppMotorLeft || 'None' }}</p>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue';
import { ExpectedResults } from '../utils/exams';

export default defineComponent({
    name: 'TrainingClassification',
    props: {
        expectedResults: { type: Object as PropType<ExpectedResults>, required: true }
    },
    emits: ['completed'],
    setup(props, { emit }) {
        const expected = props.expectedResults;
        const userAnswers = reactive({
            sensoryRight: '',
            sensoryLeft: '',
            motorRight: '',
            motorLeft: '',
            nli: '',
            ais: '',
            completeness: 'Incomplete',
            zppSensoryRight: '',
            zppSensoryLeft: '',
            zppMotorRight: '',
            zppMotorLeft: ''
        });
        const validation = reactive({
            sensoryRight: null as boolean | null,
            sensoryLeft: null as boolean | null,
            motorRight: null as boolean | null,
            motorLeft: null as boolean | null,
            nli: null as boolean | null,
            ais: null as boolean | null,
            completeness: null as boolean | null,
            zppSensoryRight: null as boolean | null,
            zppSensoryLeft: null as boolean | null,
            zppMotorRight: null as boolean | null,
            zppMotorLeft: null as boolean | null
        });
        const feedbackMessage = ref('');
        const showSolution = ref(false);
        const checkAnswers = () => {
            // Compare each field to expected (case-insensitive for level names)
            const clean = (val: string) => val.trim().toUpperCase();
            validation.sensoryRight = clean(userAnswers.sensoryRight) === expected.sensoryRight.toUpperCase();
            validation.sensoryLeft  = clean(userAnswers.sensoryLeft)  === expected.sensoryLeft.toUpperCase();
            validation.motorRight   = clean(userAnswers.motorRight)   === expected.motorRight.toUpperCase();
            validation.motorLeft    = clean(userAnswers.motorLeft)    === expected.motorLeft.toUpperCase();
            validation.nli          = clean(userAnswers.nli)          === expected.nli.toUpperCase();
            validation.ais          = clean(userAnswers.ais)          === expected.ais.toUpperCase();
            validation.completeness = userAnswers.completeness === expected.completeness;
            // Treat blank as "none" for ZPP comparisons
            const expZ = (val: string) => val ? val.toUpperCase() : '';
            validation.zppSensoryRight = clean(userAnswers.zppSensoryRight) === expZ(expected.zppSensoryRight);
            validation.zppSensoryLeft  = clean(userAnswers.zppSensoryLeft)  === expZ(expected.zppSensoryLeft);
            validation.zppMotorRight   = clean(userAnswers.zppMotorRight)   === expZ(expected.zppMotorRight);
            validation.zppMotorLeft    = clean(userAnswers.zppMotorLeft)    === expZ(expected.zppMotorLeft);
            // Check overall result
            const allCorrect = Object.values(validation).every(val => val === true);
            if (allCorrect) {
            feedbackMessage.value = 'All Correct';
            showSolution.value = false;
            emit('completed');
            } else {
            feedbackMessage.value = 'Recalculate highlighted results';
            showSolution.value = true;
            }
        };
        return { userAnswers, validation, feedbackMessage, showSolution, expectedResults: expected, checkAnswers };
    }
});
</script>

<style scoped>
.training-classification {
    margin-top: 1em;
}
.classification-form {
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.classification-form label {
    margin-right: 0.5em;
}
.level-row {
    margin-bottom: 0.5em;
}
.level-row input {
    width: 6em;
    margin-right: 1.5em;
}
.nli-row, .ais-row {
    margin-bottom: 0.5em;
}
.ais-row select {
    margin-right: 1em;
}
.submit-btn {
    margin-top: 0.5em;
    padding: 0.5em 1em;
}
.feedback {
    margin-top: 0.5em;
    font-weight: bold;
    color: #2e7d32;
}
.incorrect {
    border: 2px solid red;
}
.solution-panel {
    margin-top: 1em;
    padding: 1em;
    border: 1px solid #bbb;
    border-radius: 4px;
    background: #f9f9f9;
}
.solution-panel h3 {
    margin-top: 0;
}
.solution-panel p {
    margin: 0.3em 0;
}
</style> -->
