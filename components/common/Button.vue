<template>
  <button
    v-bind="$attrs"
    class="relative flex items-center gap-2 p-2 rounded-full"
  >
    <div v-if="iconClass" class="bg-white rounded-full h-5 w-5">
      <i :class="props.iconClass"></i>
    </div>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  iconClass?: String;
}

const props = defineProps<Props>();
defineComponent({
  name: "ButtonCustom",
});
</script>
