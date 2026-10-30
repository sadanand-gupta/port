<template>
  <section id="founder" class="section founder">
    <div class="glow" aria-hidden="true"></div>
    <div class="wrap">
      <div class="top">
        <div>
          <span class="eyebrow" v-reveal>Meet the founder</span>
          <h2 class="h2" v-reveal="80">A developer who decided to <span class="grad-text">build the solution.</span></h2>
        </div>
        <p class="lead" v-reveal="140">{{ brand.meaning }} — and that's the whole idea.</p>
      </div>

      <div class="grid">
        <!-- founder card -->
        <aside class="card glass" v-reveal>
          <div class="portrait">
            <div class="ring r1"></div><div class="ring r2"></div>
            <FounderAvatar :size="128" class="face" />
            <span class="live"><i></i>Building</span>
          </div>
          <h3>{{ profile.name }}</h3>
          <p class="role">Founder, <span class="grad-text">{{ brand.name }}</span></p>
          <div class="hats">
            <span><AppIcon name="rocket" :size="15" /> Founder</span>
            <span><AppIcon name="code" :size="15" /> Full-stack developer</span>
          </div>
          <div class="soc">
            <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name"><AppIcon :name="s.icon" :size="17" /></a>
          </div>
        </aside>

        <!-- letter -->
        <article class="letter glass" v-reveal="120">
          <span class="q"><AppIcon name="quote" :size="28" /></span>
          <h3>{{ founderLetter.heading }}</h3>
          <p v-for="(p, i) in founderLetter.paras" :key="i">{{ p }}</p>
          <div class="sign">
            <span class="sig">{{ founderLetter.sign }}</span>
            <span class="sig-role">{{ founderLetter.role }}</span>
          </div>
        </article>
      </div>

      <!-- journey -->
      <div class="journey">
        <div class="j-line" aria-hidden="true"><i></i></div>
        <div v-for="(j, i) in journey" :key="j.title" class="j-item" :class="{ now: j.now }" v-reveal="i * 140">
          <span class="j-dot"></span>
          <span class="j-tag">{{ j.tag }}</span>
          <h4>{{ j.title }}</h4>
          <p>{{ j.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from "./AppIcon.vue";
import FounderAvatar from "./FounderAvatar.vue";
import { profile, brand, socials, founderLetter, journey } from "../data";
</script>

<style scoped>
.founder { overflow: hidden; }
.glow { position: absolute; left: 50%; top: 30%; width: 900px; height: 600px; margin-left: -450px; background: radial-gradient(closest-side, rgba(124, 92, 255, 0.16), transparent); pointer-events: none; z-index: -1; }
.top { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; }
.top .h2 { max-width: 760px; }
.top .lead { max-width: 340px; margin: 0; }

.grid { display: grid; grid-template-columns: 0.75fr 1.25fr; gap: 20px; margin-top: 52px; }
.card { padding: 34px 28px; text-align: center; border-radius: 26px; transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.portrait { position: relative; width: 150px; height: 150px; margin: 0 auto; display: grid; place-items: center; }
.ring { position: absolute; inset: 0; border-radius: 50%; }
.r1 { padding: 3px; background: var(--grad); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; animation: spin 8s linear infinite; }
.r2 { inset: -14px; border: 1px dashed rgba(255, 255, 255, 0.14); animation: spin 30s linear infinite reverse; }
@keyframes spin { to { transform: rotate(360deg); } }
.face { box-shadow: 0 0 50px -10px rgba(124, 92, 255, 0.7); }
.live { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 6px; padding: 5px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 600; background: #0d1f14; border: 1px solid rgba(34, 197, 94, 0.45); color: #86efac; white-space: nowrap; }
.live i { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.3; } }
.card h3 { margin: 28px 0 0; font: 700 26px/1.2 var(--display); letter-spacing: -0.02em; }
.role { margin: 6px 0 0; color: var(--muted); font-weight: 500; }
.hats { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 20px; }
.hats span { display: inline-flex; align-items: center; gap: 7px; padding: 8px 13px; border-radius: 999px; font-size: 13px; font-weight: 500; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line); }
.hats span:first-child svg { color: var(--pink); }
.hats span:last-child svg { color: var(--cyan); }
.soc { display: flex; justify-content: center; gap: 8px; margin-top: 24px; padding-top: 22px; border-top: 1px solid var(--line); }
.soc a { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; border: 1px solid var(--line); color: var(--muted); transition: all 0.3s var(--ease); }
.soc a:hover { color: #fff; border-color: rgba(124, 92, 255, 0.6); transform: translateY(-3px); }

.letter { position: relative; padding: 42px 44px; border-radius: 26px; background: linear-gradient(160deg, rgba(124, 92, 255, 0.1), transparent 45%), var(--card); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.q { position: absolute; top: 30px; right: 34px; color: rgba(124, 92, 255, 0.5); }
.letter h3 { margin: 0 0 20px; font: 700 28px/1.2 var(--display); letter-spacing: -0.02em; }
.letter p { margin: 0 0 16px; font-size: 17px; line-height: 1.75; color: #c9c9dc; }
.sign { margin-top: 26px; display: flex; flex-direction: column; }
.sig { font: italic 600 28px/1.1 "Space Grotesk", cursive; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.sig-role { margin-top: 6px; font-size: 13.5px; color: var(--muted); }

.journey { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 70px; padding-top: 34px; }
.j-line { position: absolute; left: 0; right: 0; top: 7px; height: 2px; background: var(--line); }
.j-line i { display: block; height: 100%; width: 88%; background: linear-gradient(90deg, #7c5cff, #22d3ee 70%, transparent); }
.j-item { position: relative; transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.j-dot { position: absolute; top: -34px; left: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); border: 2px solid #7c5cff; }
.j-item.now .j-dot { border-color: #22d3ee; box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.15); animation: beat 2s ease-in-out infinite; }
@keyframes beat { 50% { box-shadow: 0 0 0 12px rgba(34, 211, 238, 0); } }
.j-tag { font: 500 12px/1 var(--mono); letter-spacing: 0.1em; text-transform: uppercase; color: var(--cyan); }
.j-item.now .j-tag { color: #86efac; }
.j-item h4 { margin: 12px 0 0; font: 600 19px/1.25 var(--display); }
.j-item p { margin: 8px 0 0; font-size: 14.5px; color: var(--muted); }

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
  .journey { grid-template-columns: 1fr 1fr; row-gap: 40px; }
  .j-line { display: none; }
  .j-dot { position: static; display: block; margin-bottom: 14px; }
}
@media (max-width: 560px) {
  .journey { grid-template-columns: 1fr; }
  .letter { padding: 30px 22px; }
}
</style>
