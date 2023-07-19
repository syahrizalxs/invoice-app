<template>
  <div class="relative">
    <div class="flex gap-3 items-center" @click="showOptions = !showOptions">
      <span class="font-semibold text-space-cadet dark:text-white">{{
        selected?.label ?? props.placeholder
      }}</span>
      <i
        role="button"
        class="i-mdi-chevron-down text-xl dark:text-tropical-indigo"
      ></i>
    </div>
    <div
      v-if="showOptions"
      ref="dropdownRef"
      class="absolute top-full rigth-0 bg-slate-50 dark:bg-rich-black p-3 rounded-md shadow-md"
    >
      <ul class="flex flex-col gap-1">
        <li
          v-for="option in props.options"
          :key="option.value"
          role="button"
          @click="
            emit('update:modelValue', option.value);
            showOptions = false;
          "
        >
          <span
            class="text-space-cadet font-normal dark:text-white hover:text-indigo-300 dark:hover:text-tropical-indigo"
            :class="{
              'font-bold text-indigo-300': selected?.label === option.label,
            }"
          >
            {{ option.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

interface Option {
  value?: string;
  label: string;
}
interface Props {
  modelValue: String | null;
  placeholder: String;
  options: Option[];
}
defineComponent({
  name: "DropdownCustom",
});
const showOptions = ref(false);
const dropdownRef = ref(null);

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const selected = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

onClickOutside(dropdownRef, () => (showOptions.value = false));
</script>
