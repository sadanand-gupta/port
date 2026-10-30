<template>
  <section id="home" class="hero" @mousemove="onMove">
    <div class="orbs" aria-hidden="true" :style="{ transform: `translate(${mx * -20}px, ${my * -20}px)` }">
      <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>
    </div>

    <div class="wrap hero-in">
      <div class="copy">
        <a href="#founder" class="badge" v-reveal="900">
          <span class="badge-tag">{{ brand.name }}</span>
          <span>{{ brand.status }}</span>
          <AppIcon name="arrow" :size="14" />
        </a>

        <h1 class="headline">
          <span v-for="(line, li) in hero.headline" :key="li" class="hl-line">
            <span class="hl-inner" :class="{ 'grad-text': li === 2 }" :style="{ animationDelay: 1000 + li * 140 + 'ms' }">{{ line }}</span>
          </span>
        </h1>

        <p class="sub" v-reveal="1350">{{ hero.sub }}</p>

        <div class="ctas" v-reveal="1450">
          <a href="#access" class="btn btn-primary">Get early access <AppIcon name="arrow" :size="18" /></a>
          <a href="#founder" class="btn btn-ghost">Read the founder story</a>
        </div>

        <div class="who" v-reveal="1550">
          <div class="avatar"><FounderAvatar :size="50" /><span class="avatar-ring"></span></div>
          <div>
            <b>{{ profile.name }}</b>
            <span>{{ profile.title }}</span>
          </div>
          <div class="who-soc">
            <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name"><AppIcon :name="s.icon" :size="16" /></a>
          </div>
        </div>
      </div>

      <!-- product demo: prompt → build steps → site preview → live -->
      <div class="demo-wrap" v-reveal="1100" :style="{ transform: `perspective(1200px) rotateY(${mx * -7}deg) rotateX(${my * 6}deg)` }">
        <div class="demo glass">
          <div class="d-top">
            <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
            <span class="d-url"><AppIcon name="globe" :size="12" /> app.vistaar.ai</span>
            <span class="d-pill">Preview</span>
          </div>

          <div class="d-body">
            <aside class="d-side">
              <div class="d-logo">V</div>
              <i v-for="n in 5" :key="n" :class="{ on: n === 1 }"></i>
            </aside>

            <div class="d-main">
              <div class="d-prompt">
                <AppIcon name="spark" :size="15" />
                <span>{{ typedPrompt }}<b class="caret"></b></span>
                <button type="button" tabindex="-1" :class="{ go: stage >= 1 }"><AppIcon name="arrow" :size="14" /></button>
              </div>

              <div class="d-grid">
                <ul class="d-steps">
                  <li v-for="(s, i) in buildSteps" :key="s" :class="{ done: stage >= i + 2, run: stage === i + 1 }">
                    <span class="st-ic"><AppIcon v-if="stage >= i + 2" name="check" :size="11" /></span>{{ s }}
                  </li>
                </ul>

                <div class="d-site" :class="{ built: stage >= 2 }">
                  <div class="s-nav"><i></i><span></span><span></span><span></span></div>
                  <div class="s-hero"><b></b><em></em><u></u></div>
                  <div class="s-cards"><i></i><i></i><i></i></div>
                </div>
              </div>

              <div class="d-meter">
                <span>Online presence</span>
                <div class="bar"><i :style="{ transform: 'scaleX(' + meter + ')' }"></i></div>
                <b>{{ Math.round(meter * 100) }}%</b>
              </div>
            </div>
          </div>

          <transition name="toast">
            <div v-if="stage >= 6" class="d-toast"><span class="t-dot"><AppIcon name="check" :size="13" /></span>Your website is live <em>bakery.vistaar.site</em></div>
          </transition>
        </div>

        <div class="float f1 glass"><AppIcon name="spark" :size="16" /> AI-drafted in minutes</div>
        <div class="float f2 glass"><AppIcon name="devices" :size="16" /> Mobile-ready</div>
      </div>
    </div>

    <div class="wrap strip" v-reveal="1700">
      <span class="strip-k">Built for</span>
      <div class="strip-items">
        <span v-for="w in audience" :key="w">{{ w }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import AppIcon from "./AppIcon.vue";
import FounderAvatar from "./FounderAvatar.vue";
import { profile, brand, hero, socials } from "../data";

const audience = ["Local shops", "Studios", "Schools", "Gyms", "Restaurants", "Professionals", "Startups"];
const buildSteps = ["Designing layout", "Writing content", "Adding enquiry form", "Publishing site"];

// Demo loop. stage 0: typing the prompt · 1..4: steps running · 5: all done · 6: live toast.
const typedPrompt = ref("");
const stage = ref(0);
const meter = computed(() => [0.08, 0.22, 0.45, 0.66, 0.85, 1, 1][stage.value]);
let timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));

function runDemo() {
  stage.value = 0;
  typedPrompt.value = "";
  let i = 0;
  const type = () => {
    typedPrompt.value = hero.prompt.slice(0, ++i);
    if (i < hero.prompt.length) later(type, 45);
    else {
      [1, 2, 3, 4, 5, 6].forEach((s, k) => later(() => (stage.value = s), 500 + k * 750));
      later(runDemo, 500 + 6 * 750 + 3200);
    }
  };
  later(type, 400);
}

const mx = ref(0), my = ref(0);
function onMove(e) {
  if (window.matchMedia("(hover: none)").matches) return;
  mx.value = e.clientX / window.innerWidth - 0.5;
  my.value = e.clientY / window.innerHeight - 0.5;
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typedPrompt.value = hero.prompt; stage.value = 6; return;
  }
  later(runDemo, 1500);
});
onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<style scoped>
.hero { position: relative; min-height: 100vh; padding: 140px 0 60px; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
.hero-in { display: grid; grid-template-columns: 1fr 1.02fr; gap: 56px; align-items: center; }
.hero-in > * { min-width: 0; }

.orbs { position: absolute; inset: 0; z-index: -1; transition: transform 0.6s var(--ease); }
.orb { position: absolute; border-radius: 50%; filter: blur(100px); animation: float 18s ease-in-out infinite; }
.o1 { width: 560px; height: 560px; background: #7c5cff; top: -160px; left: -160px; opacity: 0.5; }
.o2 { width: 460px; height: 460px; background: #22d3ee; top: 20%; right: -160px; opacity: 0.3; animation-delay: -6s; }
.o3 { width: 380px; height: 380px; background: #f472b6; bottom: -180px; left: 40%; opacity: 0.25; animation-delay: -12s; }
@keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(40px, -30px) scale(1.08); } 66% { transform: translate(-30px, 25px) scale(0.95); } }

.badge {
  display: inline-flex; align-items: center; gap: 10px; max-width: 100%; padding: 5px 14px 5px 5px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line-hi); font-size: 13px; color: #d4d4e6;
  transition: border-color 0.3s, background 0.3s, opacity 0.9s var(--ease), transform 0.9s var(--ease);
}
.badge:hover { border-color: rgba(124, 92, 255, 0.6); background: rgba(124, 92, 255, 0.08); }
.badge-tag { padding: 5px 11px; border-radius: 999px; background: var(--grad); color: #fff; font-weight: 700; font-size: 12px; }
.badge svg { color: var(--muted); }

.headline { margin: 26px 0 0; font: 700 clamp(44px, 6.4vw, 84px)/1.02 var(--display); letter-spacing: -0.045em; }
.hl-line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.hl-inner { display: inline-block; transform: translateY(105%); animation: up 1s var(--ease) forwards; }
@keyframes up { to { transform: none; } }

.sub { margin: 24px 0 0; max-width: 560px; font-size: 18px; color: var(--muted); }
.ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }

.who { display: flex; align-items: center; gap: 14px; margin-top: 40px; padding-top: 26px; border-top: 1px solid var(--line); max-width: 560px; }
.avatar {
  position: relative; flex: none; width: 50px; height: 50px; border-radius: 50%; display: grid; place-items: center;
  font: 700 17px/1 var(--display); color: #fff; background: linear-gradient(135deg, #1b1b2e, #2a2350);
}
.avatar-ring { position: absolute; inset: -3px; border-radius: 50%; padding: 2px; background: var(--grad); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; animation: spin 6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.who b { display: block; font: 600 16px/1.3 var(--display); }
.who span { display: block; font-size: 13.5px; color: var(--muted); }
.who-soc { display: flex; gap: 6px; margin-left: auto; }
.who-soc a { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; border: 1px solid var(--line); color: var(--muted); transition: all 0.3s var(--ease); }
.who-soc a:hover { color: #fff; border-color: rgba(124, 92, 255, 0.6); transform: translateY(-3px); }

/* demo */
.demo-wrap { position: relative; transition: transform 0.5s var(--ease), opacity 0.9s var(--ease); }
.demo { border-radius: 22px; overflow: hidden; background: rgba(12, 12, 21, 0.85); box-shadow: 0 50px 100px -40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(124, 92, 255, 0.15), 0 0 80px -30px rgba(124, 92, 255, 0.6); }
.d-top { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid var(--line); }
.dot { width: 11px; height: 11px; border-radius: 50%; } .r { background: #ff5f57; } .y { background: #febc2e; } .g { background: #28c840; }
.d-url { display: flex; align-items: center; gap: 6px; margin: 0 auto; padding: 5px 14px; border-radius: 8px; background: rgba(255, 255, 255, 0.05); font: 500 12px/1 var(--mono); color: var(--muted); }
.d-pill { font: 600 10.5px/1 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 8px; border-radius: 6px; color: #a5f3fc; background: rgba(34, 211, 238, 0.1); }

.d-body { display: grid; grid-template-columns: 54px 1fr; min-height: 380px; }
.d-side { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 16px 0; border-right: 1px solid var(--line); }
.d-logo { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: var(--grad); color: #fff; font: 700 14px/1 var(--display); margin-bottom: 6px; }
.d-side i { width: 22px; height: 6px; border-radius: 3px; background: rgba(255, 255, 255, 0.1); }
.d-side i.on { background: rgba(124, 92, 255, 0.7); }

.d-main { padding: 18px; display: flex; flex-direction: column; gap: 16px; }
.d-prompt { display: flex; align-items: center; gap: 10px; padding: 11px 12px 11px 14px; border-radius: 12px; border: 1px solid rgba(124, 92, 255, 0.4); background: rgba(124, 92, 255, 0.07); font-size: 13.5px; color: #e4e4f2; }
.d-prompt > svg { color: #c4b5fd; flex: none; }
.d-prompt span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.caret { display: inline-block; width: 2px; height: 14px; margin-left: 2px; vertical-align: -2px; background: var(--cyan); animation: blink 1s steps(2) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.d-prompt button { flex: none; width: 28px; height: 28px; border-radius: 8px; border: 0; display: grid; place-items: center; background: rgba(255, 255, 255, 0.08); color: var(--muted); transition: background 0.3s, color 0.3s, transform 0.3s; }
.d-prompt button.go { background: var(--grad); color: #fff; transform: scale(1.06); }

.d-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 14px; flex: 1; }
.d-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; align-content: start; }
.d-steps li { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 10px; font-size: 12.5px; color: var(--dim); background: rgba(255, 255, 255, 0.025); border: 1px solid var(--line); transition: color 0.3s, border-color 0.3s, background 0.3s; }
.st-ic { flex: none; width: 18px; height: 18px; border-radius: 50%; display: grid; place-items: center; border: 1.5px solid currentColor; }
.d-steps li.run { color: #e4e4f2; border-color: rgba(34, 211, 238, 0.45); background: rgba(34, 211, 238, 0.06); }
.d-steps li.run .st-ic { border-color: var(--cyan); border-right-color: transparent; animation: spin 0.8s linear infinite; }
.d-steps li.done { color: #d4d4e6; }
.d-steps li.done .st-ic { background: #22c55e; border-color: #22c55e; color: #04130a; }

.d-site { border-radius: 12px; border: 1px solid var(--line); background: #0f0f1a; padding: 10px; display: grid; gap: 8px; align-content: start; }
.d-site > * { opacity: 0.15; transform: translateY(6px); transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
.d-site.built > * { opacity: 1; transform: none; }
.d-site.built > :nth-child(2) { transition-delay: 0.25s; } .d-site.built > :nth-child(3) { transition-delay: 0.5s; }
.s-nav { display: flex; align-items: center; gap: 6px; }
.s-nav i { width: 16px; height: 16px; border-radius: 5px; background: linear-gradient(135deg, #f59e0b, #f472b6); margin-right: auto; }
.s-nav span { width: 20px; height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.15); }
.s-hero { display: grid; gap: 6px; padding: 14px 10px; border-radius: 9px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(244, 114, 182, 0.22)); }
.s-hero b { width: 70%; height: 9px; border-radius: 3px; background: rgba(255, 255, 255, 0.85); }
.s-hero em { width: 50%; height: 5px; border-radius: 3px; background: rgba(255, 255, 255, 0.4); }
.s-hero u { width: 34%; height: 14px; margin-top: 4px; border-radius: 5px; background: #fff; }
.s-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.s-cards i { height: 38px; border-radius: 7px; background: rgba(255, 255, 255, 0.07); }

.d-meter { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--muted); }
.d-meter .bar { flex: 1; height: 6px; border-radius: 3px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.d-meter .bar i { display: block; height: 100%; background: var(--grad); transform-origin: left; transition: transform 0.7s var(--ease); }
.d-meter b { width: 36px; text-align: right; font: 600 12px/1 var(--mono); color: var(--text); }

.d-toast { position: absolute; left: 50%; bottom: 64px; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; padding: 10px 16px 10px 10px; border-radius: 12px; background: rgba(10, 30, 18, 0.95); border: 1px solid rgba(34, 197, 94, 0.45); font-size: 13px; font-weight: 600; white-space: nowrap; box-shadow: 0 16px 40px -12px rgba(34, 197, 94, 0.5); }
.d-toast em { font-style: normal; font-family: var(--mono); font-weight: 500; font-size: 12px; color: #86efac; }
.t-dot { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: #22c55e; color: #04130a; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.4s var(--ease), transform 0.5s var(--ease); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 14px); }

.float { position: absolute; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; background: rgba(13, 13, 22, 0.88); white-space: nowrap; animation: bob 6s ease-in-out infinite; box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.9); }
.float svg { color: var(--cyan); }
.f1 { top: -20px; left: -26px; }
.f1 svg { color: #c4b5fd; }
.f2 { bottom: 70px; right: -30px; animation-delay: -3s; }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

.strip { display: flex; align-items: center; gap: 26px; margin-top: 72px; padding-top: 26px; border-top: 1px solid var(--line); }
.strip-k { flex: none; font: 500 12px/1 var(--mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); }
.strip-items { display: flex; flex-wrap: wrap; gap: 8px 26px; }
.strip-items span { font: 600 17px/1.4 var(--display); color: #8f8fa8; transition: color 0.3s; }
.strip-items span:hover { color: var(--text); }

@media (max-width: 1040px) {
  .hero-in { grid-template-columns: 1fr; gap: 64px; }
  .demo-wrap { max-width: 620px; }
  .f2 { right: -6px; }
}
@media (max-width: 600px) {
  .d-body { grid-template-columns: 1fr; min-height: 0; }
  .d-side { display: none; }
  .d-grid { grid-template-columns: 1fr; }
  .d-steps { grid-template-columns: 1fr 1fr; }
  .d-toast { font-size: 12px; }
  .d-toast em { display: none; }
  .f1 { left: 0; }
  .who-soc { display: none; }
  .badge { font-size: 12px; gap: 8px; }
  .badge > span:nth-child(2) { white-space: normal; line-height: 1.35; }
  .sub { font-size: 16.5px; }
  .strip { flex-direction: column; align-items: flex-start; gap: 14px; margin-top: 50px; }
}
</style>
