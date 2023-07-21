<template>
  <select
    v-model="value"
    class="p-3 outline-none text-sm dark:text-white bg-indigo-50 dark:bg-space-cadet"
    :class="{
      'outline-1 outline-red-400 outline-offset-0': errorMessage,
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </select>
  <span class="text-xs font-thin text-red-500 dark:text-red-400">
    {{ errorMessage }}
  </span>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
defineComponent({
  name: "CustomInput",
});

interface Props {
  name: string;
}
const props = defineProps<Props>();

const { value, errorMessage } = useField(() => props.name);
</script>
