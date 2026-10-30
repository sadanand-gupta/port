<template>
  <section id="builder" class="section">
    <div class="wrap">
      <div class="head">
        <div>
          <span class="eyebrow" v-reveal>The builder behind it</span>
          <h2 class="h2" v-reveal="80">Founder by vision. <span class="grad-text">Developer by craft.</span></h2>
        </div>
        <p class="lead" v-reveal="140">Vistaar.ai is built in-house, end to end. These are the skills and shipped work behind it.</p>
      </div>

      <div class="stats">
        <div v-for="(s, i) in stats" :key="s.label" :ref="(el) => (statEls[i] = el)" class="stat" v-reveal="i * 100">
          <b class="grad-text">{{ shown[i] }}{{ s.suffix }}</b>
          <span>{{ s.label }}</span>
        </div>
      </div>

      <div class="stack" aria-label="Tech stack">
        <div class="stack-track">
          <span v-for="(t, i) in [...stack, ...stack]" :key="i" class="tech"><i></i>{{ t }}</span>
        </div>
      </div>

      <div class="projects">
        <a
          v-for="(p, i) in projects" :key="p.title" :href="p.url" target="_blank" rel="noopener"
          class="proj glass" :style="{ '--h': p.hue }" v-reveal="i * 110"
          @mousemove="tilt" @mouseleave="untilt"
        >
          <div class="art" aria-hidden="true">
            <div class="frame">
              <div class="bar"><i></i><i></i><i></i></div>
              <div class="fb"><span class="b1"></span><span></span><span></span><span class="b4"></span></div>
            </div>
          </div>
          <div class="body">
            <span class="kind">{{ p.kind }}</span>
            <h3>{{ p.title }} <AppIcon name="external" :size="16" /></h3>
            <p>{{ p.text }}</p>
            <div class="tags"><span v-for="t in p.tech" :key="t">{{ t }}</span></div>
          </div>
        </a>
      </div>

      <div class="hire glass" v-reveal>
        <div class="hire-l">
          <span class="eyebrow">Work with Shivam</span>
          <h3>Need a website while Vistaar.ai is in the oven?</h3>
          <p>Shivam takes on selected client projects — built with the same care as the product.</p>
        </div>
        <div class="hire-list">
          <div v-for="s in services" :key="s.title" class="svc">
            <span class="svc-ic"><AppIcon :name="s.icon" :size="18" /></span>
            <div><b>{{ s.title }}</b><small>{{ s.text }}</small></div>
          </div>
          <a href="#access" class="btn btn-ghost">Start a project <AppIcon name="arrow" :size="17" /></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import AppIcon from "./AppIcon.vue";
import { stats, stack, projects, services } from "../data";

const shown = ref(stats.map(() => 0));
const statEls = [];
let io = null;
function countUp(i) {
  const target = stats[i].value, start = performance.now(), dur = 1400;
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    shown.value[i] = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countUp(statEls.indexOf(e.target));
      io.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  statEls.forEach((el) => el && io.observe(el));
});
onBeforeUnmount(() => io && io.disconnect());

function tilt(e) {
  if (window.matchMedia("(hover: none)").matches) return;
  const el = e.currentTarget, r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(1000px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-6px)`;
}
function untilt(e) { e.currentTarget.style.transform = ""; }
</script>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; }
.head .lead { max-width: 380px; margin: 0; }

.stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 52px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.stat { padding: 30px 10px; text-align: center; transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.stat + .stat { border-left: 1px solid var(--line); }
.stat b { display: block; font: 700 clamp(40px, 5vw, 60px)/1 var(--display); letter-spacing: -0.04em; }
.stat span { display: block; margin-top: 10px; font-size: 14px; color: var(--muted); }

.stack { margin-top: 34px; overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.stack-track { display: flex; gap: 12px; width: max-content; animation: slide 30s linear infinite; }
.stack:hover .stack-track { animation-play-state: paused; }
@keyframes slide { to { transform: translateX(calc(-50% - 6px)); } }
.tech { display: inline-flex; align-items: center; gap: 9px; padding: 11px 18px; border-radius: 999px; border: 1px solid var(--line); background: var(--card); font-size: 14.5px; font-weight: 500; white-space: nowrap; }
.tech i { width: 7px; height: 7px; border-radius: 50%; background: var(--grad); }

.projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 44px; }
.proj { display: block; overflow: hidden; border-radius: 22px; transition: transform 0.5s var(--ease), border-color 0.3s, box-shadow 0.5s var(--ease), opacity 0.9s var(--ease); }
.proj:hover { border-color: hsla(var(--h), 90%, 65%, 0.45); box-shadow: 0 30px 70px -36px hsla(var(--h), 90%, 50%, 0.6); }
.art { position: relative; height: 150px; overflow: hidden; background: radial-gradient(120% 130% at 50% 0%, hsla(var(--h), 90%, 60%, 0.35), transparent 65%), #0b0b14; }
.frame { position: absolute; left: 12%; right: 12%; top: 26px; height: 160px; border-radius: 10px; background: #11111c; border: 1px solid rgba(255, 255, 255, 0.1); transition: transform 0.7s var(--ease); }
.proj:hover .frame { transform: translateY(-10px); }
.bar { display: flex; gap: 4px; padding: 8px 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
.bar i { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.2); }
.fb { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px; }
.fb span { height: 18px; border-radius: 5px; background: rgba(255, 255, 255, 0.06); }
.fb .b1 { grid-column: 1 / -1; height: 40px; background: linear-gradient(110deg, hsla(var(--h), 90%, 60%, 0.75), hsla(calc(var(--h) + 50), 90%, 60%, 0.45)); }
.fb .b4 { background: hsla(var(--h), 90%, 60%, 0.3); }
.body { padding: 22px 24px 26px; }
.kind { font: 500 11.5px/1 var(--mono); letter-spacing: 0.06em; text-transform: uppercase; color: hsl(var(--h), 90%, 75%); }
.body h3 { display: flex; align-items: center; gap: 8px; margin: 12px 0 0; font: 700 21px/1.2 var(--display); }
.body h3 svg { color: var(--dim); transition: transform 0.35s var(--ease), color 0.3s; }
.proj:hover .body h3 svg { transform: translate(3px, -3px); color: var(--text); }
.body p { margin: 8px 0 0; font-size: 14.5px; color: var(--muted); }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.tags span { padding: 4px 10px; border-radius: 7px; font-size: 12px; color: #cfcfe2; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--line); }

.hire { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 60px; padding: 40px; border-radius: 26px; transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.hire h3 { margin: 16px 0 0; font: 700 clamp(24px, 2.6vw, 32px)/1.2 var(--display); letter-spacing: -0.02em; }
.hire-l p { margin: 12px 0 0; color: var(--muted); }
.hire-list { display: grid; gap: 12px; }
.svc { display: flex; gap: 14px; align-items: center; padding: 14px 16px; border-radius: 14px; background: rgba(255, 255, 255, 0.025); border: 1px solid var(--line); transition: border-color 0.3s, transform 0.4s var(--ease); }
.svc:hover { border-color: rgba(34, 211, 238, 0.4); transform: translateX(5px); }
.svc-ic { flex: none; width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; color: var(--cyan); background: rgba(34, 211, 238, 0.08); }
.svc b { display: block; font: 600 16px/1.25 var(--display); }
.svc small { display: block; margin-top: 2px; font-size: 13.5px; color: var(--muted); }
.hire-list .btn { justify-self: start; margin-top: 6px; }

@media (max-width: 980px) {
  .projects { grid-template-columns: 1fr; }
  .hire { grid-template-columns: 1fr; padding: 30px 22px; }
}
@media (max-width: 560px) {
  .stats { grid-template-columns: 1fr; }
  .stat + .stat { border-left: 0; border-top: 1px solid var(--line); }
}
</style>
