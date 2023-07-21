<template>
  <div
    class="rounded-md bg-tropical-indigo dark:bg-space-cadet transition-all flex p-5"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineComponent({
  name: "CardCustom",
});
</script>
