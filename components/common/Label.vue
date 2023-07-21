<template>
  <label v-bind="$attrs" class="dark:text-gray-200 text-sm">
    <slot></slot>
  </label>
</template>
<script setup>
defineComponent({
  name: "CustomLabel",
});
</script>
