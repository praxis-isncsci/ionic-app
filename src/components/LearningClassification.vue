<template>
    <form class="classification" @submit.prevent="check">
        <!-- Neurological levels --------------------------------------------------->
        <fieldset class="box nl">
            <legend>NEUROLOGICAL LEVELS</legend>
    
            <div class="hdrRow">
                <span></span>
                <span class="rl">R</span>
                <span class="rl">L</span>
            </div>
            <div class="twoRows">
                <label>1.&nbsp;SENSORY</label>
                <select v-model="a.sensoryRight" :class="cellCls(b.sensoryRight)"><option value=""> </option><option v-for="l in neurologicalLevels" :key="'sr'+l">{{l}}</option></select>
                <select v-model="a.sensoryLeft"  :class="cellCls(b.sensoryLeft )"><option value=""> </option><option v-for="l in neurologicalLevels" :key="'sl'+l">{{l}}</option></select>
        
                <label>2.&nbsp;MOTOR</label>
                <select v-model="a.motorRight"   :class="cellCls(b.motorRight )"><option value=""> </option><option v-for="l in neurologicalLevels" :key="'mr'+l">{{l}}</option></select>
                <select v-model="a.motorLeft"    :class="cellCls(b.motorLeft  )"><option value=""> </option><option v-for="l in neurologicalLevels" :key="'ml'+l">{{l}}</option></select>
            </div>
        </fieldset>
    
        <!-- NLI --------------------------------------------------->
        <fieldset class="box small">
            <legend>3.&nbsp;NEUROLOGICAL&nbsp;LEVEL&nbsp;OF&nbsp;INJURY</legend>
            <select v-model="a.nli" :class="cellCls(b.nli)"><option value=""> </option><option v-for="l in neurologicalLevels" :key="'n'+l">{{l}}</option></select>
        </fieldset>
    
        <!-- Complete / AIS --------------------------------------------------->
        <fieldset class="box tiny">
            <legend>4.&nbsp;COMPLETE&nbsp;OR&nbsp;INCOMPLETE?</legend>
            <select v-model="a.completeness" :class="cellCls(b.completeness)">
            <option>Complete</option><option>Incomplete</option>
            </select>
        </fieldset>
    
        <fieldset class="box tiny">
            <legend>5.&nbsp;ASIA&nbsp;IMPAIRMENT&nbsp;SCALE&nbsp;(AIS)</legend>
            <select v-model="a.ais" :class="cellCls(b.ais)" >
            <option value=""> </option><option v-for="g in ['A','B','C','D','E', 'ND','A*','B*','C*','D*','E*']" :key="g">{{g}}</option>
            </select>
        </fieldset>
    
        <!-- ZPP --------------------------------------------------->
        <fieldset class="box zpp">
            <legend>6.&nbsp;ZONE&nbsp;OF&nbsp;PARTIAL&nbsp;PRESERVATION</legend>
    
            <div class="hdrRow">
                <span></span>
                <span class="rl">R</span>
                <span class="rl">L</span>
            </div>
            <div class="twoRows">
            <label>SENSORY</label>
            <select v-model="a.zppSensoryRight" :class="cellCls(b.zppSensoryRight)"><option value=""> </option><option v-for="l in zppLevels" :key="'zr'+l">{{l}}</option></select>
            <select v-model="a.zppSensoryLeft"  :class="cellCls(b.zppSensoryLeft )"><option value=""> </option><option v-for="l in zppLevels" :key="'zl'+l">{{l}}</option></select>
    
            <label>MOTOR</label>
            <select v-model="a.zppMotorRight"   :class="cellCls(b.zppMotorRight )"><option value=""> </option><option v-for="l in zppLevels" :key="'mrp'+l">{{l}}</option></select>
            <select v-model="a.zppMotorLeft"    :class="cellCls(b.zppMotorLeft  )"><option value=""> </option><option v-for="l in zppLevels" :key="'mlp'+l">{{l}}</option></select>
            </div>
        </fieldset>
    
        <!-- feedback / buttons --------------------------------------------------->
        <p :class="ok ? 'msg ok' : 'msg err'">{{ msg }}</p>
    
        <div class="actions">
            <IonButton v-if="!ok" type="submit" color="primary">Submit</IonButton>
            <IonButton v-if="showKey" color="medium" @click="reveal">Answer key</IonButton>
        </div>

        <!-- explanation box --------------------------------------------------->
        <article v-if="answersToShow.length" class="akey">
            <ul>
                <li v-for="(txt,i) in answersToShow" :key="i" v-html="txt"></li>
            </ul>
        </article>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IonButton } from '@ionic/vue';
import { ExpectedResults } from '@/utils/exams';

const { expectedResults } = defineProps<{ expectedResults: ExpectedResults }>();
const emit = defineEmits<{ completed: [] }>();

/* ---------- helper data ------------------------------------------- */
const levels = [
    'C2','C3','C4','C5','C6','C7','C8','T1','T2','T3','T4','T5','T6','T7','T8',
    'T9','T10','T11','T12','L1','L2','L3','L4','L5','S1','S2','S3','S4_5'
];

const zppLevels = [...levels, 'NA']

const neurologicalLevels = [...levels, 'ND', 'INT', 'INT*','C2*','C3*','C4*','C5*','C6*','C7*','C8*','T1*','T2*','T3*','T4*','T5*','T6*','T7*','T8*',
    'T9*','T10*','T11*','T12*','L1*','L2*','L3*','L4*','L5*','S1*','S2*','S3*','S4_5*']

/* ---------- answers / validation ------------------------------------------- */
const a = reactive({
    sensoryRight:'', sensoryLeft:'', motorRight:'', motorLeft:'',
    nli:'', completeness:'Incomplete', ais:'', 
    zppSensoryRight:'', zppSensoryLeft:'', zppMotorRight:'', zppMotorLeft:''
});
const b = reactive<Record<keyof typeof a, boolean|null>>(
    Object.fromEntries(Object.keys(a).map(k => [k, null])) as any
);

const msg = ref('');   
const ok = ref(false);   
const showKey = ref(false);
const clean = (s:string)=>s.trim().toUpperCase();
const answersToShow = ref<string[]>([]) 
/* ---------- check / reveal ------------------------------------------- */
const check = () => {
    const e = expectedResults;
    const Z = (s:string)=>s ? s.toUpperCase(): '';

    b.sensoryRight     = clean(a.sensoryRight)     === e.sensoryRight.toUpperCase();
    b.sensoryLeft      = clean(a.sensoryLeft)      === e.sensoryLeft.toUpperCase();
    b.motorRight       = clean(a.motorRight)       === e.motorRight.toUpperCase();
    b.motorLeft        = clean(a.motorLeft)        === e.motorLeft.toUpperCase();
    b.nli              = clean(a.nli)              === e.nli.toUpperCase();
    b.ais              = clean(a.ais)              === e.ais.toUpperCase();
    b.completeness     = a.completeness            === e.completeness;
    b.zppSensoryRight  = clean(a.zppSensoryRight)  === Z(e.zppSensoryRight);
    b.zppSensoryLeft   = clean(a.zppSensoryLeft)   === Z(e.zppSensoryLeft);
    b.zppMotorRight    = clean(a.zppMotorRight)    === Z(e.zppMotorRight);
    b.zppMotorLeft     = clean(a.zppMotorLeft)     === Z(e.zppMotorLeft);

    ok.value  = Object.values(b).every(v=>v===true);
    msg.value = ok.value ? 'All Correct!' : 'Re-calculate highlighted results';

    // reset answerkey list on every check
    answersToShow.value.length = 0;
    showKey.value  = !ok.value;   
    if(ok.value) emit('completed');
}

const reveal = () => { 
    const e = expectedResults;

    // map between each field and answerKey
    const map = {
        sensoryRight : e.answerKey?.sensoryLevels,
        sensoryLeft  : e.answerKey?.sensoryLevels,
        motorRight   : e.answerKey?.motorLevels,
        motorLeft    : e.answerKey?.motorLevels,
        nli          : e.answerKey?.nli,
        completeness : e.answerKey?.completeness,
        ais          : e.answerKey?.ais,
        zppSensoryRight : e.answerKey?.sensoryZpp,
        zppSensoryLeft  : e.answerKey?.sensoryZpp,
        zppMotorRight   : e.answerKey?.motorZpp,
        zppMotorLeft    : e.answerKey?.motorZpp
    } as Record<string, string | undefined>;

    // explanations for the wrong fields
    const unique: Set<string> = new Set();
    let hasWrong = false;

    (Object.keys(b) as (keyof typeof b)[]).forEach(k => {
        if (b[k] === false) {
        hasWrong = true;
        if (map[k]) unique.add(map[k]!);
        }
    });

    // Build final list: include optional top-level note ONLY if something is wrong
    const list: string[] = [];
    if (hasWrong && e.answerKey?.note) list.push(e.answerKey.note);
    list.push(...Array.from(unique));

    answersToShow.value = list;
};


const cellCls = (val: boolean|null)=>({
    cell:true,
    bad : val===false,
    good: val===true
});
</script>

<style scoped>
.classification {
    display:flex;
    align-items:flex-start;
    justify-content: center;
    gap:.5rem;
    flex-wrap:wrap;
    font:400 .75rem/1.1 Inter,Arial,Helvetica;
    margin-top: 0.8rem;
}

.hdrRow{
    display:grid;
    grid-template-columns:auto 60px 60px;
    align-items:center;
    margin-bottom:.15rem;
}
.hdrRow .rl{
    text-align:center;
    font-weight:400;
    font-size:.7rem;
    letter-spacing:.05em;
}

.box {
    border:1px solid #000;
    padding:.25rem .4rem;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:.2rem
}
.box>legend {
    font-size:.66rem;
    font-weight:500;
    letter-spacing:-.01em;
    padding:0 .25rem
}
.sub {
    display:block;
    font-weight:400;
    font-size:.55rem;
    line-height:1
}
.twoRows {
    display:grid;
    grid-template-columns:auto 60px 60px;
    row-gap:.15rem;
    column-gap:.25rem;
    align-items:center
}
.small {
    min-width:110px
}
.tiny {
    min-width:90px
}
.nl .twoRows select, .zpp .twoRows select {
    width:60px
}

select {
    border:1px solid #555;
    height:22px;
    font:400 .7rem/1 Inter;
    padding:0 .1rem;
    text-transform:uppercase
}
.cell.bad {
    border-color:#e84d4d;
    background:#ffecec
}
.cell.good {
    border-color:#2e7d32;
    background:#e8f8e7
}
.msg {
    width:100%;
    text-align:center;
    font-weight:600;
    margin:.2rem 0 0
}
.ok {
    color:#2e7d32
}

.err {
    color:#e84d4d
}

.actions {
    width:100%;
    display:flex;
    justify-content:center;
    gap:.75rem;
    margin-top:.25rem
}

ul {
    padding-left: 0;
}

ul li {
    list-style-type: none;
    margin-bottom: 0.5rem;
}

</style>