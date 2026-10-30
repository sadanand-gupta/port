<template>
  <div class="bg-grid" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true" :style="{ transform: `translate(${cx}px, ${cy}px)` }"></div>

  <transition name="splash">
    <div v-if="loading" class="splash" aria-hidden="true">
      <div class="splash-mark">V</div>
      <div class="splash-bar"><span></span></div>
    </div>
  </transition>

  <NavBar />
  <main>
    <HeroSection />
    <ProductSection />
    <FounderSection />
    <BuilderSection />
    <AccessSection />
  </main>
  <SiteFooter />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import ProductSection from "./components/ProductSection.vue";
import FounderSection from "./components/FounderSection.vue";
import BuilderSection from "./components/BuilderSection.vue";
import AccessSection from "./components/AccessSection.vue";
import SiteFooter from "./components/SiteFooter.vue";

// A short intro screen, then the site.
const loading = ref(true);

// A soft light that trails the cursor (pointer devices only).
const cx = ref(-600), cy = ref(-600);
let raf = 0, tx = -600, ty = -600;
function onMove(e) { tx = e.clientX - 300; ty = e.clientY - 300; }
function follow() {
  cx.value += (tx - cx.value) * 0.12;
  cy.value += (ty - cy.value) * 0.12;
  raf = requestAnimationFrame(follow);
}

onMounted(() => {
  setTimeout(() => (loading.value = false), 1100);
  if (window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(follow);
  }
});
onBeforeUnmount(() => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); });
</script>

<style>
.cursor-glow {
  position: fixed; left: 0; top: 0; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: -1;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.12), transparent 65%);
}

.splash { position: fixed; inset: 0; z-index: 100; display: grid; place-content: center; justify-items: center; gap: 22px; background: var(--bg); }
.splash-mark {
  width: 74px; height: 74px; border-radius: 22px; display: grid; place-items: center; color: #fff;
  font: 700 28px/1 var(--display); background: var(--grad); background-size: 200% auto;
  animation: grad-move 2s linear infinite, pop 0.7s var(--ease) both; box-shadow: 0 20px 60px -15px rgba(124, 92, 255, 0.9);
}
.splash-bar { width: 140px; height: 3px; border-radius: 3px; background: rgba(255, 255, 255, 0.08); overflow: hidden; }
.splash-bar span { display: block; height: 100%; background: var(--grad); animation: load 1s var(--ease) forwards; transform-origin: left; }
@keyframes load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes pop { from { transform: scale(0.6) rotate(-12deg); opacity: 0; } }
.splash-leave-active { transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
.splash-leave-to { opacity: 0; transform: scale(1.04); }
</style>
