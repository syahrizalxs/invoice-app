<template>
  <div
    :class="{ hidden: !show, block: show }"
    class="fixed left-0 top-16 md:left-16 md:top-0 right-0 bottom-0 h-screen w-screen bg-black bg-opacity-70"
  >
    <Transition name="slide-fade">
      <div
        v-if="triggerAnimation"
        ref="modalBodyRef"
        class="absolute p-8 top-0 left-0 h-screen w-[calc(100%-2em)] md:w-1/2 xl:w-1/2 2xl:w-1/3 bg-slate-50 flex overflow-y-auto overflow-x-hidden dark:bg-rich-black bg-opacity-100"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

defineComponent({
  name: "ModalComponent",
});
const emits = defineEmits(["close"]);
const modalBodyRef = ref(null);
const triggerAnimation = ref(false);

const props = defineProps({
  show: Boolean,
});

onClickOutside(modalBodyRef, () => {
  emits("close");
});

watch(
  () => props.show,
  (val) => {
    if (val) {
      return setTimeout(() => (triggerAnimation.value = true), 200);
    }
    triggerAnimation.value = false;
    // eslint-disable-next-line prettier/prettier
  }
);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
