<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="wrap nav-in">
      <a href="#home" class="logo" @click="open = false">
        <span class="logo-mark">V</span>
        <span class="logo-txt"><b>Vistaar<i>.ai</i></b><small>by {{ profile.name }}</small></span>
      </a>

      <nav class="links" :class="{ 'is-open': open }" aria-label="Main">
        <a v-for="l in links" :key="l.id" :href="'#' + l.id" :class="{ 'is-active': active === l.id }" @click="open = false">{{ l.label }}</a>
        <a href="#access" class="btn btn-primary nav-cta" @click="open = false">Get early access</a>
      </nav>

      <button class="burger" type="button" :aria-expanded="open ? 'true' : 'false'" aria-label="Menu" @click="open = !open">
        <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
      </button>
    </div>
    <div class="progress" :style="{ transform: 'scaleX(' + progress + ')' }"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import AppIcon from "./AppIcon.vue";
import { profile } from "../data";

const links = [
  { id: "product", label: "Product" },
  { id: "how", label: "How it works" },
  { id: "founder", label: "Founder" },
  { id: "builder", label: "Builder" },
  { id: "access", label: "Early access" },
];

const scrolled = ref(false);
const open = ref(false);
const active = ref("home");
const progress = ref(0);

// Scroll: shrink the bar, fill the progress line, highlight the section in view.
function onScroll() {
  const y = window.scrollY;
  scrolled.value = y > 20;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, y / max) : 0;
  let current = "";
  links.forEach((l) => {
    const el = document.getElementById(l.id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = l.id;
  });
  active.value = current;
}
onMounted(() => { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); });
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s; border-bottom: 1px solid transparent; }
.nav.is-scrolled { background: rgba(7, 7, 12, 0.72); backdrop-filter: blur(16px) saturate(140%); border-bottom-color: var(--line); }
.nav-in { height: 76px; display: flex; align-items: center; justify-content: space-between; transition: height 0.4s var(--ease); }
.is-scrolled .nav-in { height: 64px; }

.logo { display: flex; align-items: center; gap: 10px; font: 700 18px/1 var(--display); letter-spacing: 0.08em; }
.logo-mark {
  width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center;
  background: var(--grad); background-size: 200% auto; color: #fff; font-size: 14px; letter-spacing: 0;
  animation: grad-move 5s linear infinite; box-shadow: 0 6px 20px -6px rgba(124, 92, 255, 0.8);
}
.logo-txt { display: flex; flex-direction: column; gap: 3px; letter-spacing: 0; }
.logo-txt b { font: 700 18px/1 var(--display); letter-spacing: -0.01em; }
.logo-txt i { font-style: normal; color: var(--cyan); }
.logo-txt small { font: 500 11px/1 var(--font); color: var(--muted); letter-spacing: 0.02em; }

.links { display: flex; align-items: center; gap: 4px; }
.links a:not(.btn) {
  position: relative; padding: 8px 14px; font-size: 14.5px; font-weight: 500; color: var(--muted); border-radius: 999px; transition: color 0.25s, background 0.25s;
}
.links a:not(.btn):hover { color: var(--text); }
.links a.is-active { color: var(--text); background: rgba(255, 255, 255, 0.06); }
.nav-cta { height: 40px; padding: 0 18px; margin-left: 10px; font-size: 14px; }

.burger { display: none; width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--line-hi); background: var(--card); color: var(--text); cursor: pointer; place-items: center; }

.progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--grad); transform-origin: left; transform: scaleX(0); }

@media (max-width: 980px) {
  .burger { display: grid; }
  .links {
    position: fixed; top: 64px; left: 12px; right: 12px; flex-direction: column; align-items: stretch; gap: 2px; padding: 12px;
    background: rgba(13, 13, 22, 0.96); border: 1px solid var(--line); border-radius: 18px; backdrop-filter: blur(18px);
    opacity: 0; transform: translateY(-10px) scale(0.98); pointer-events: none; transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
  }
  .links.is-open { opacity: 1; transform: none; pointer-events: auto; }
  .links a:not(.btn) { padding: 13px 16px; font-size: 16px; }
  .nav-cta { margin: 8px 0 0; justify-content: center; height: 48px; }
}
</style>
