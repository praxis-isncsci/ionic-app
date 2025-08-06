<template>
    <div class="wrapper">
        <p class="acknowledgment"> {{ exam.acknowledgment }} </p>
        <table class="grid">
            <!-- VAC / comments | RIGHT side | diagram | LEFT side | DAP / desc -->
            <colgroup>
            <col class="col-vac" style="width:178px"  />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col class="col-diagram" style="width:300px" />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col style="width:36px"  />
            <col class="col-dap" style="width:178px" />
            </colgroup>
    
            <!-- ───────── HEADERS ───────── -->
            <thead>
            <tr class="bigHdr">
                <th class="col-vac"></th>
                <th></th>
                <th colspan="3">Right</th>
                <th></th>
                <th colspan="3">Left</th>
                <th></th>
                <th class="col-dap"></th>
            </tr>
            <tr class="subHdr">
                <th></th><th></th>
                <th>M</th><th>LT</th><th>PP</th>
                <th></th>
                <th>LT</th><th>PP</th><th>M</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
    
            <!-- ───────── BODY ───────── -->
            <tbody>
            <tr v-for="(lvl,rowIdx) in levels" :key="lvl">
                <!-- VAC / comment column -->
                <td v-if="lvl === commentStart" class="vacAnchor">
                <section class="comments comments--inline">
                    <p class="label">
                    <span class="sub"><strong>Comments </strong>(Non-key Muscle? Reason for NT? Pain? Non-SCI condition?)</span>:
                    </p>
                    <p class="body">{{ exam.comments }}</p>
                </section>
                </td>
    
                <td v-else-if="lvl === 'S4_5'" class="wideCell">
                <div class="pair">
                    <span class="lbl-left">VAC</span>
                    <span class="box">{{ exam.vac ? 'Yes' : 'No' }}</span>
                </div>
                </td>
    
                <td v-else class="empty"></td>
    
                <!-- Right label & scores -->
                <td class="lbl-right">{{ lvl }}</td>
                <td :class="motorCellClass(lvl)">{{ isMotorLevel(lvl) ? exam.rightMotorScores[lvl as MotorLevel] ?? '' : '' }}</td>
                <td class="cell">{{ exam.rightLightTouchScores[lvl as SensoryLevel] ?? '' }}</td>
                <td class="cell">{{ exam.rightPinPrickScores[lvl as SensoryLevel]   ?? '' }}</td>
    
                <!-- diagram -->
                <td v-if="rowIdx === 0" :rowspan="levels.length + 1" class="diagramCell">
                <img src="../../public/assets/c-isncsci-body-diagram.svg" alt="diagram" class="diagram" />
                </td>
    
                <!-- Left scores -->
                <td class="cell">{{ exam.leftLightTouchScores[lvl as SensoryLevel] ?? '' }}</td>
                <td class="cell">{{ exam.leftPinPrickScores[lvl as SensoryLevel]   ?? '' }}</td>
                <td :class="motorCellClass(lvl)">{{ isMotorLevel(lvl) ? exam.leftMotorScores[lvl as MotorLevel] ?? '' : '' }}</td>
    
                <!-- Left label -->
                <td class="lbl-left">{{ lvl }}</td>
    
                <!-- DAP / description column -->
                <template v-if="lvl === spanStart">
                <td class="descBoxHolder">
                    <div class="scoreBoxes">
                    <div class="scoreBox">
                        <p class="sbTitle">MOTOR</p>
                        <p class="sbSub">(SCORING ON REVERSE SIDE)</p>
                        <p class="sbList">
                        0 = Total paralysis<br>
                        1 = Palpable / visible contraction<br>
                        2 = Active movement, gravity eliminated<br>
                        3 = Active movement, against gravity<br>
                        4 = Active movement, against some resistance<br>
                        5 = Active movement, against full resistance<br>
                        NT = Not testable<br>
                        0*…4*, NT* = Non-SCI condition present
                        </p>
                    </div>
                    <div class="scoreBox">
                        <p class="sbTitle">SENSORY</p>
                        <p class="sbSub">(SCORING ON REVERSE SIDE)</p>
                        <div class="sbList twoCol">
                        <div class="col">0 = Absent<br>1 = Altered<br>2 = Normal</div>
                        <div class="col">NT = Not testable<br>0* 1* NT* = Non-SCI condition present</div>
                        </div>
                    </div>
                    </div>
                </td>
                </template>
    
                <template v-else-if="withinSpan(lvl)">
                <td class="blankDesc"></td>
                </template>
    
                <template v-else>
                <td :class="lvl==='S4_5' ? 'wideCell' : 'description'">
                    <template v-if="lvl==='S4_5'">
                    <div class="pair">
                        <span class="box">{{ exam.dap ? 'Yes' : 'No' }}</span>
                        <span class="lbl-right">DAP</span>
                    </div>
                    </template>
                    <template v-else>{{ levelDescriptions[lvl] ?? '' }}</template>
                </td>
                </template>
            </tr>
    
            <!-- mobile VAC / DAP row -->
            <tr class="vac-dap-row">
                <td class="empty"></td>
                <td class="lbl-right">VAC</td>
                <td colspan="3" class="bigCell">{{ exam.vac ? 'Yes' : 'No' }}</td>
                <td colspan="3" class="bigCell">{{ exam.dap ? 'Yes' : 'No' }}</td>
                <td class="lbl-left">DAP</td>
                <td class="empty"></td>
            </tr>
            </tbody>
        </table>
        
        <!-- mobile comments -->
        <section class="comments comments--mobile">
            <p class="label">
            <span class="sub"><strong>Comments </strong>(Non-key Muscle? Reason for NT? Pain? Non-SCI condition?)</span>:
            </p>
            <p class="body">{{ exam.comments }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { PracticeExam } from '@/utils/exams'
import type { MotorLevel, SensoryLevel } from 'isncsci-ui/dist/esm/core/domain'


defineProps<{ exam: PracticeExam }>()

const levels = [
    'C2','C3','C4','C5','C6','C7','C8',
    'T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12',
    'L1','L2','L3','L4','L5','S1','S2','S3','S4_5'
]

const commentStart = 'T2'

const levelDescriptions: Record<string,string> = {
    C5:'Elbow flexors', C6:'Wrist extensors', C7:'Elbow extensors', C8:'Finger flexors',
    T1:'Finger abductors (little finger)',
    L2:'Hip flexors', L3:'Knee extensors', L4:'Ankle dorsiflexors',
    L5:'Long toe extensors', S1:'Ankle plantar flexors'
}

const motorSet = new Set(['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1'])
const isMotorLevel   = (l:string) => motorSet.has(l)
const motorCellClass = (l:string) => ({ cell:true, blank:!isMotorLevel(l) })

const spanStart = 'T2'
const spanEnd = 'L1'
const withinSpan = (l:string) => {
    const i = levels.indexOf(l)
    return i > levels.indexOf(spanStart) && i <= levels.indexOf(spanEnd)
}
</script>

<style scoped>
:root {
    --row-h : 18px;
    --cmt-w : 178px;
    --cmt-gap : 8px;
}

/* layout */
.wrapper {
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow-x:auto;
}

.acknowledgment {
    font:200 0.75rem 'Inter',sans-serif;
    text-align:center;
}

@media (min-width:751px){
    .wrapper {
        padding-left:calc(var(--cmt-w) + var(--cmt-gap)); 
    }
}

.grid{
    margin:0 auto;
    table-layout:fixed;
    border-collapse:separate;
    border-spacing:1.5px .5px;
}

/* headers */
.bigHdr th {
    font:500 1.35rem/1 'Inter',sans-serif;
    text-align:center;
    padding-bottom:4px;
}
.subHdr th {
    font:500 .86rem/1 'Inter',sans-serif;
    text-align:center;
    padding-bottom:4px;
}

/* labels & cells */
.lbl-left,.lbl-right {
    font:400 .8rem/1.2 'Inter',sans-serif;
    color:#3B3B3B;
}
.lbl-left {
    text-align:left;
}
.lbl-right {
    text-align:right;
}

.cell {
    width:45px;
    height:var(--row-h);
    line-height:var(--row-h);
    border:1px solid #3B3B3B;
    background:#fff;
    text-align:center;
    vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif
}
.blank,.empty {
    background:transparent;
    border:1px solid transparent;
}

/* VAC / DAP boxes */
.wideCell {
    width:90px;
    height:var(--row-h);
    padding:0;
}
.pair {
    height:100%;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:2px;
    white-space:nowrap;
}
.box {
    width:45px;
    height:calc(var(--row-h) - 2px);
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid #3B3B3B;
    background:#fff;
    font:500 .85rem/1 'Inter',sans-serif;
}

/* VAC anchor (row T2) */
.vacAnchor {
    position:relative;
    width:90px;height:var(--row-h);
    padding:0;
    border:none;
}

/* floating comment panel */
.comments--inline {
    position:absolute;
    top:0;
    right:0;
    transform:translateX(calc(-1 * var(--cmt-w) - var(--cmt-gap)));
    width:var(--cmt-w);
    background:#fff;
    border:1px solid #3B3B3B;
    padding:.55rem .85rem;
    font:500 .75rem 'Inter',sans-serif;
}
.comments--inline .label {
    margin:0 0 .25rem;
}
.comments--inline .sub {
    font-weight:400;
    font-style:italic;
}
.comments--inline .body {
    white-space:pre-wrap;
}

/* mobile comment box */
.comments--mobile {
    border:1px solid #3B3B3B;
    padding:.55rem .85rem;
    font:500 .75rem 'Inter',sans-serif;
}
.comments--mobile .label {
    margin:0 0 .25rem;
}
.comments--mobile .sub {
    font-weight:400;
    font-style:italic;
}
.comments--mobile .body {
    white-space:pre-wrap;
}

/* description / score-boxes (unchanged) */
.description {
    font:400 .8rem/1.2 'Inter',sans-serif;
    white-space:nowrap;
    border:1px solid transparent;
}
.descBoxHolder {
    position:relative;
    height:var(--row-h);
    padding:0;
    border:1px solid transparent;
}
.blankDesc {
    height:var(--row-h);
    border:1px solid transparent;
}
.scoreBoxes {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    pointer-events:none;
}
.scoreBox {
    border:1px solid #3B3B3B;
    padding:3px 4px;
    font:500 .6rem/1.25 'Inter',sans-serif;
    margin:2px 0;
}
.scoreBox:last-child {
    margin-bottom:0;
}
.sbTitle {
    font-weight:700;
    font-size:.6rem;
    text-align:center;
    margin:0 0 2px;
}
.sbSub {
    font-weight:600;
    font-size:.5rem;
    text-align:center;
    margin:0 0 4px;
}
.sbList {
    margin:0;
    font-size:.5rem;
    line-height:1.2;
}
.sbList.twoCol {
    display:flex;
}
.sbList.twoCol .col {
    flex:1 1 0;
}

/* diagram */
.diagramCell {
    padding:0;
    border:none;
}
.diagram {
    display:block;
    width:100%;
    height:auto;
    max-height:100%;
    margin:auto;
}

/* big VAC/DAP row (mobile) */
.bigCell {
    width:90px;
    height:var(--row-h);
    border:1px solid #3B3B3B;
    background:#fff;
    text-align:center;
    vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif;
}

/* responsive switches */
@media (max-width:750px){
    .col-vac,.col-dap {
        width:0!important
    }
    .wideCell>*,
    .description,.descBoxHolder,.blankDesc {
        display:none!important
    }
    .col-diagram {
        width:20px!important
    }
    .diagram {
        display:none;
    }
    .vac-dap-row {
        display:table-row;
    }

    .comments--inline {
        display:none;
    }
}

@media (min-width:751px){
    .vac-dap-row {
        display:none;
    }
    .comments--mobile {
        display:none;
    }
}

@media (max-width:600px) {
    .description {
        display:none;
    }
}
</style>
