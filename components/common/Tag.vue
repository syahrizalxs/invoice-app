<template>
  <div
    class="flex gap-2 justify-center items-center rounded-md bg-opacity-20 px-3 py-2"
    :class="classes[status]"
  >
    <i class="i-mdi-moon-full text-xs"></i>
    <span>{{ formattedStatus }}</span>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  status: "paid" | "pending" | "draft";
}

const statuses = {
  draft: "Draft",
  paid: "Paid",
  pending: "Pending",
};

const classes = {
  paid: "bg-teal-200 text-teal-400",
  draft: "bg-slate-200 text-slate-300",
  pending: "bg-orange-200 text-orange-300",
};
const props = defineProps<Props>();

const formattedStatus = computed(() => statuses[props.status]);

defineComponent({
  name: "TagComponent",
});
</script>
