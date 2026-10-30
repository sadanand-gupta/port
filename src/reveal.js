// v-reveal: fades and lifts an element in the first time it scrolls into
// view. `v-reveal="120"` delays it by 120 ms (for staggered lists).
const observer =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-in");
            observer.unobserve(e.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

export default {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value) el.style.transitionDelay = binding.value + "ms";
    if (observer) observer.observe(el);
    else el.classList.add("is-in");
  },
  unmounted(el) {
    if (observer) observer.unobserve(el);
  },
};
