<template>
    <div class="wrapper">
    <table class="grid">
        <colgroup>
            <!--  VAC | right labels| right scores | diagram |  left scores | left labels | DAP/descriptions -->
            <col class="col-vac" style="width:90px"  />
            <col style="width:36px" />
            <col style="width:36px" />
            <col style="width:36px" />
            <col style="width:36px" />
            <col class="col-diagram" style="width:300px" />
            <col style="width:36px" />
            <col style="width:36px" />
            <col style="width:36px" />
            <col style="width:36px" />
            <col class="col-dap" style="width:178px"  />
        </colgroup>

        <!-- -------- HEADERS -------- -->
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

        <!-- -------- BODY -------- -->
        <tbody>
            <tr v-for="(lvl,rowIdx) in levels" :key="lvl">
                <!-- VAC column -->
                <td :class="lvl==='S4_5' ? 'wideCell' : 'empty'">
                    <div v-if="lvl==='S4_5'" class="pair">
                        <span class="lbl-left">VAC</span>
                        <span class="box">{{ exam.vac ? 'Yes' : 'No' }}</span>
                    </div>
                </td>

                <!-- right label & scores -->
                <td class="lbl-right">{{ lvl }}</td>
                <td :class="motorCellClass(lvl)">
                {{ isMotorLevel(lvl) ? exam.rightMotorScores[lvl as MotorLevel] ?? '' : '' }}
                </td>
                <td class="cell">{{ exam.rightLightTouchScores[lvl as SensoryLevel] ?? '' }}</td>
                <td class="cell">{{ exam.rightPinPrickScores[lvl as SensoryLevel] ?? '' }}</td>

                <!-- diagram -->
                <td
                v-if="rowIdx === 0"
                :rowspan="levels.length + 1"
                class="diagramCell"
                >
                    <img
                        src="../../public/assets/c-isncsci-body-diagram.svg"
                        alt="diagram"
                        class="diagram"
                    />
                </td>

                <!-- left scores -->
                <td class="cell">{{ exam.leftLightTouchScores[lvl as SensoryLevel] ?? '' }}</td>
                <td class="cell">{{ exam.leftPinPrickScores[lvl as SensoryLevel] ?? '' }}</td>
                <td :class="motorCellClass(lvl)">
                    {{ isMotorLevel(lvl) ? exam.leftMotorScores[lvl as MotorLevel] ?? '' : '' }}
                </td>

                <!-- left label -->
                <td class="lbl-left">{{ lvl }}</td>

                <!-- DAP / description / scoring boxes info -->
                <template v-if="lvl === spanStart">
                    <td class="descBoxHolder">
                        <div class="scoreBoxes">
                            <div class="scoreBox">
                                <p class="sbTitle">MOTOR</p>
                                <p class="sbSub">(SCORING ON REVERSE SIDE)</p>
                                <p class="sbList">
                                0 = Total paralysis<br>
                                1 = Palpable or visible contraction<br>
                                2 = Active movement, gravity eliminated<br>
                                3 = Active movement, against gravity<br>
                                4 = Active movement, against some resistance<br>
                                5 = Active movement, against full resistance<br>
                                NT = Not testable<br>
                                0*,..., 4*, NT* = Non-SCI condition present
                                </p>
                            </div>
                            <div class="scoreBox">
                                <p class="sbTitle">SENSORY</p>
                                <p class="sbSub">(SCORING ON REVERSE SIDE)</p>
                                <div class="sbList twoCol">
                                    <div class="col">
                                        0&nbsp;=&nbsp;Absent<br>
                                        1&nbsp;=&nbsp;Altered<br>
                                        2&nbsp;=&nbsp;Normal
                                    </div>

                                    <div class="col">
                                        NT&nbsp;=&nbsp;Not&nbsp;testable<br>
                                        0* 1* NT* =&nbsp;Non-SCI&nbsp;condition&nbsp;present
                                    </div>
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
                    <template v-else>
                    {{ levelDescriptions[lvl] ?? '' }}
                    </template>
                </td>
                </template>
            </tr>

            <!-- -------- small screens VAC DAP  -------- -->
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

    <!-- -------- COMMENTS -------- -->
    <section class="comments">
        <p class="label">
        <span class="sub"><strong>Comments </strong>(Non-key Muscle? Reason for NT? Pain? Non-SCI condition?)</span>:
        </p>
        <p class="body">{{ exam.comments }}</p>
    </section>
    </div>
</template>

<script setup lang="ts">
import { PracticeExam } from '../utils/exams'
import type { MotorLevel, SensoryLevel } from 'isncsci-ui/dist/esm/core/domain'

defineProps<{ exam: PracticeExam }>()

/* -------- LEVELS -------- */
const levels = [
    'C2','C3','C4','C5','C6','C7','C8',
    'T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12',
    'L1','L2','L3','L4','L5','S1','S2','S3','S4_5'
]

/* -------- DESCRIPTIONS -------- */
const levelDescriptions: Record<string,string> = {
    C5:'Elbow flexors', C6:'Wrist extensors', C7:'Elbow extensors', C8:'Finger flexors',
    T1:'Finger abductors (little finger)', L2:'Hip flexors', L3:'Knee extensors',
    L4:'Ankle dorsiflexors', L5:'Long toe extensors', S1:'Ankle plantar flexors'
}

/* -------- MOTOR LEVELS -------- */
const motorLevels = new Set(['C5','C6','C7','C8','T1','L2','L3','L4','L5','S1'])
const isMotorLevel   = (lvl:string) => motorLevels.has(lvl)
const motorCellClass = (lvl:string) => ({ cell:true, blank:!isMotorLevel(lvl) })

/* ---------- SCORING BOXES HELPERS ---------- */
const spanStart = 'T2'
const spanEnd   = 'L1'
const withinSpan = (lvl:string) => {
    const i = levels.indexOf(lvl)
    return i > levels.indexOf(spanStart) && i <= levels.indexOf(spanEnd)
}
</script>

<style scoped>
:root { 
    --row-h:18px;
}

/* -------- WRAPPER & GRID -------- */
.wrapper { display:flex;
    flex-direction:column; 
    align-items:center;
    overflow-x:auto;
}

.grid {
    margin:0 auto;
    table-layout:fixed;
    border-collapse:separate;
    border-spacing:4.5px 0.5px;
}

/* ---------- HEADERS ---------- */
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

/* ---------- LABELS ---------- */
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

/* ---------- SCORE CELLS ---------- */
.cell {
    width:45px; height:var(--row-h); line-height:var(--row-h);
    border:1px solid #3B3B3B; background:#FFF;
    text-align:center; vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif;
}
.blank,.empty {
    background:transparent;
    border:1px solid transparent;
}

/* ---------- WIDE CELLS FOR VAC / DAP ---------- */
.wideCell {
    width:90px;
    height:var(--row-h);
    padding:0;
}

.pair {
    height:100%;
    display:flex;
    align-items:center;
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
    background:#FFF;
    font:500 .85rem/1 'Inter',sans-serif;
}

/* ---------- DESCRIPTION COLUMN ---------- */
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
    background:transparent;
}

.scoreBoxes {
    position:absolute;
    top:0; left:0; width:100%;
    z-index:5; pointer-events:none;
}

.blankDesc {
    height:var(--row-h);
    border:1px solid transparent;
    background:transparent;
}

.scoreBox {
    border:1px solid #3B3B3B; 
    padding:3px 4px;
    font:500 .6rem/1.25 "Inter",sans-serif; 
    /* margin-bottom:6px; */
    margin: 2px 0;
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

.sbList.twoCol{
    display:flex;
}

.sbList.twoCol .col{
    flex:1 1 0;
}

/* ---------- SMALL SCREEN VAC DAP---------- */
.bigCell {
    width:90px;
    height:var(--row-h);
    border:1px solid #3B3B3B;
    background:#FFF;
    text-align:center;
    vertical-align:middle;
    font:500 .85rem/1 'Inter',sans-serif;
}

/* ---------- DIAGRAM ---------- */
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

/* ---------- COMMENTS ---------- */
.comments {
    margin-top:1.25rem;
    max-width:750px;
    border:1px solid #3B3B3B;
    padding:.55rem .85rem;
    font:500 .75rem "Inter",sans-serif;
}

.comments .label { 
    margin:0 0 .25rem; 
}

.comments .sub {
    font-weight:400;
    font-style:italic;
}

.comments .body {
    white-space:pre-wrap;
}

/* ---------- RESPONSIVENESS ---------- */
@media (max-width:750px) {
    .col-vac, .col-dap {
        width:0!important;
    }

    .wideCell > *, .description, .descBoxHolder, .blankDesc {
        display:none!important;
    }

    .col-diagram {
        width:20px!important;
    }

    .diagram {
        display:none;
    }

    .vac-dap-row {
        display:table-row;
    }
}
@media (min-width:751px) {
    .vac-dap-row {
        display:none;
    }
}

@media (max-width:600px) {
    .description {
        display:none;
    }
}
</style>
