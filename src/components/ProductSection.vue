<template>
  <section id="product" class="section">
    <div class="wrap">
      <!-- the problem -->
      <div class="center">
        <span class="eyebrow" v-reveal>The problem</span>
        <h2 class="h2" v-reveal="80">Great businesses are still <span class="grad-text">invisible online.</span></h2>
        <p class="lead mx" v-reveal="140">Customers search before they buy. But for most small businesses, getting online is the hardest part.</p>
      </div>

      <div class="problems">
        <div v-for="(p, i) in problems" :key="p.title" class="prob glass" v-reveal="i * 110">
          <span class="prob-ic"><AppIcon :name="p.icon" :size="20" /></span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
          <span class="x" aria-hidden="true">✕</span>
        </div>
      </div>

      <!-- the answer -->
      <div class="answer" v-reveal>
        <span class="answer-line"></span>
        <span class="answer-pill"><span class="v">V</span> {{ brand.name }} is the answer</span>
        <span class="answer-line"></span>
      </div>

      <div class="center sol-head">
        <span class="eyebrow" v-reveal>The product</span>
        <h2 class="h2" v-reveal="80">One platform to take any business <span class="grad-text">from offline to online.</span></h2>
      </div>

      <div class="bento">
        <div
          v-for="(f, i) in features" :key="f.title"
          class="feat glass glow-border" :class="{ wide: f.wide, ['f' + i]: true }" v-reveal="i * 90"
          @mousemove="spot"
        >
          <div class="feat-ic"><AppIcon :name="f.icon" :size="22" /></div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>

          <!-- small live visuals for the two wide cards -->
          <div v-if="i === 0" class="viz viz-ai" aria-hidden="true">
            <div class="ai-line"><span class="ai-k">prompt</span> "A cozy café with online menu"</div>
            <div class="ai-blocks"><i></i><i></i><i></i><i></i></div>
          </div>
          <div v-if="i === 4" class="viz viz-hub" aria-hidden="true">
            <span class="hub-c">V</span>
            <span v-for="(n, k) in hubNodes" :key="n" class="hub-n" :style="{ '--a': k * 72 + 'deg' }"><AppIcon :name="n" :size="14" /></span>
          </div>
        </div>
      </div>

      <!-- how it works -->
      <div id="how" class="how">
        <div class="center">
          <span class="eyebrow" v-reveal>How it works</span>
          <h2 class="h2" v-reveal="80">Live in <span class="grad-text">three steps.</span></h2>
        </div>
        <div class="steps">
          <div class="steps-line" aria-hidden="true"><i></i></div>
          <div v-for="(s, i) in steps" :key="s.no" class="step" v-reveal="i * 160">
            <span class="step-no">{{ s.no }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from "./AppIcon.vue";
import { brand, problems, features, steps } from "../data";

const hubNodes = ["globe", "chat", "whatsapp", "devices", "bolt"];

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--y", e.clientY - r.top + "px");
}
</script>

<style scoped>
.center { text-align: center; max-width: 820px; margin-inline: auto; }
.center .eyebrow::before { display: none; }
.mx { margin-inline: auto; }

.problems { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 52px; }
.prob { position: relative; padding: 28px; overflow: hidden; transition: transform 0.4s var(--ease), opacity 0.9s var(--ease); }
.prob:hover { transform: translateY(-5px); }
.prob-ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; color: #fca5a5; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.25); }
.prob h3 { margin: 18px 0 0; font: 600 20px/1.2 var(--display); }
.prob p { margin: 8px 0 0; font-size: 15px; color: var(--muted); }
.x { position: absolute; right: 22px; top: 18px; font-size: 54px; line-height: 1; color: rgba(248, 113, 113, 0.08); font-weight: 700; }

.answer { display: flex; align-items: center; gap: 18px; margin: 90px 0 26px; }
.answer-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--line-hi), transparent); }
.answer-pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px 8px 8px; border-radius: 999px; border: 1px solid rgba(124, 92, 255, 0.45); background: rgba(124, 92, 255, 0.1); font-weight: 600; font-size: 14px; box-shadow: 0 0 40px -10px rgba(124, 92, 255, 0.7); }
.v { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; background: var(--grad); color: #fff; font: 700 13px/1 var(--display); }
.sol-head { margin-bottom: 52px; }

.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.feat { position: relative; padding: 30px; overflow: hidden; min-height: 230px; transition: transform 0.45s var(--ease), opacity 0.9s var(--ease); }
.feat.wide { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr; column-gap: 24px; }
.feat.wide .feat-ic, .feat.wide h3, .feat.wide p { grid-column: 1; }
.feat.wide .viz { grid-column: 2; grid-row: 1 / span 3; margin-top: 0; }
.feat::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s; background: radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(124, 92, 255, 0.14), transparent 70%); }
.feat:hover { transform: translateY(-5px); }
.feat:hover::after { opacity: 1; }
.feat-ic { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; color: #fff; background: var(--grad); background-size: 200% auto; box-shadow: 0 10px 30px -10px rgba(124, 92, 255, 0.8); }
.feat h3 { margin: 20px 0 0; font: 600 21px/1.2 var(--display); letter-spacing: -0.01em; }
.feat p { margin: 8px 0 0; font-size: 15px; color: var(--muted); }

.viz { position: relative; align-self: center; margin-top: 20px; border-radius: 16px; border: 1px solid var(--line); background: rgba(7, 7, 12, 0.6); padding: 16px; }
.ai-line { font: 400 12.5px/1.5 var(--mono); color: #d4d4e6; }
.ai-k { color: #c4b5fd; margin-right: 6px; }
.ai-blocks { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 14px; }
.ai-blocks i { height: 40px; border-radius: 8px; background: linear-gradient(110deg, rgba(255, 255, 255, 0.04) 30%, rgba(124, 92, 255, 0.3) 50%, rgba(255, 255, 255, 0.04) 70%); background-size: 250% 100%; animation: shimmer 2.4s linear infinite; }
.ai-blocks i:first-child { grid-column: 1 / -1; height: 52px; }
.ai-blocks i:nth-child(3) { animation-delay: 0.3s; } .ai-blocks i:nth-child(4) { animation-delay: 0.6s; }
@keyframes shimmer { from { background-position: 150% 0; } to { background-position: -100% 0; } }

.viz-hub { height: 170px; display: grid; place-items: center; }
.hub-c { width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center; background: var(--grad); color: #fff; font: 700 22px/1 var(--display); box-shadow: 0 0 50px -6px rgba(124, 92, 255, 0.9); z-index: 1; }
.hub-n { position: absolute; left: 50%; top: 50%; width: 34px; height: 34px; margin: -17px; border-radius: 50%; display: grid; place-items: center; color: var(--cyan); background: #12121e; border: 1px solid var(--line-hi); animation: orbit 14s linear infinite; transform: rotate(var(--a)) translateX(68px) rotate(calc(-1 * var(--a))); }
@keyframes orbit { from { transform: rotate(var(--a)) translateX(68px) rotate(calc(-1 * var(--a))); } to { transform: rotate(calc(var(--a) + 360deg)) translateX(68px) rotate(calc(-1 * var(--a) - 360deg)); } }

.how { margin-top: 140px; }
.steps { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.steps-line { position: absolute; left: 16%; right: 16%; top: 31px; height: 2px; background: var(--line); overflow: hidden; }
.steps-line i { display: block; height: 100%; width: 40%; background: var(--grad); animation: run 3s var(--ease) infinite; }
@keyframes run { from { transform: translateX(-100%); } to { transform: translateX(260%); } }
.step { position: relative; text-align: center; padding: 0 12px; transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.step-no { position: relative; display: inline-grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; font: 700 20px/1 var(--display); background: var(--bg); border: 1px solid rgba(124, 92, 255, 0.5); box-shadow: 0 0 0 8px var(--bg), 0 0 40px -6px rgba(124, 92, 255, 0.7); }
.step h3 { margin: 22px 0 0; font: 600 21px/1.25 var(--display); }
.step p { margin: 8px auto 0; max-width: 300px; font-size: 15px; color: var(--muted); }

@media (max-width: 980px) {
  .problems, .bento, .steps { grid-template-columns: 1fr; }
  .feat.wide { grid-column: auto; grid-template-columns: 1fr; }
  .feat.wide .viz { grid-column: 1; grid-row: auto; margin-top: 22px; }
  .steps { gap: 44px; }
  .steps-line { display: none; }
}
</style>
