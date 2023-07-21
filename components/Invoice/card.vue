<template>
  <CommonCard>
    <div
      class="grid-cols-2 items-center grid-rows-2 md:grid-cols-4 md:grid-rows-1 grid justify-between w-full"
    >
      <div class="row-start-1 col-start-1">
        <span class="text-ultra-violet">#</span>
        <span class="dark:text-white text-space-cadet">{{ invoice.id }}</span>
      </div>
      <div
        class="row-start-2 col-start-1 md:col-start-2 md:row-start-1 flex flex-col"
      >
        <span class="dark:text-slate-300"
          >Due {{ formatDate(String(invoice.invoiceDate)) }}</span
        >
        <span class="font-semibold dark:text-white md:hidden">{{
          formatCurrency(total)
        }}</span>
      </div>
      <span class="dark:text-slate-300 flex justify-end">{{
        invoice.bill.to.name
      }}</span>
      <div class="flex justify-end">
        <CommonTag :status="invoice.status" />
      </div>
    </div>
  </CommonCard>
</template>

<script setup lang="ts">
import { formatDate, formatCurrency } from "@/utils/helper";
import { Invoice } from "~/composables/useInvoice";

interface Props {
  invoice: Invoice;
}
const props = defineProps<Props>();

defineComponent({
  name: "InvoiceCard",
});

const total: ComputedRef<number> = computed(() =>
  props.invoice.items.reduce((acc, value) => {
    return acc + value.price * value.qty;
    // eslint-disable-next-line prettier/prettier
  }, 0),
);
</script>
