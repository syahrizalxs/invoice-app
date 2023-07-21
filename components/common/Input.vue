<template>
  <div class="flex flex-col gap-1">
    <input
      v-model="value"
      class="p-3 outline-none text-sm dark:text-white bg-indigo-50 dark:bg-space-cadet"
      :class="{
        'outline-1 outline-red-400 outline-offset-0': errorMessage,
      }"
      v-bind="$attrs"
    />
    <span
      v-if="!hideMessage"
      class="text-xs font-thin text-red-500 dark:text-red-400"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
defineComponent({
  name: "CustomInput",
});

interface Props {
  name?: string;
  hideMessage?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  hideMessage: false,
  name: "",
});

const { value, errorMessage } = useField(() => props.name || "");
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
