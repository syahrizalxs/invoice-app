<template>
  <section class="p-5 w-full md:max-w-3xl mx-auto flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-2xl font-semibold dark:text-white text-space-cadet"
          >Invoices</span
        >
        <span class="text-space-cadet-2 dark:text-slate-300">7 Invoices</span>
      </div>
      <div class="flex items-center gap-4">
        <CommonDropdown
          v-model="filterInvoice"
          :options="options"
          placeholder="Filter"
        />
        <CommonButton
          icon-class="i-mdi-plus bg-space-cadet rounded-full text-space-cadet"
          class="text-white bg-tropical-indigo"
          @click="showModal = true"
        >
          New Invoice
        </CommonButton>
      </div>
    </div>

    <div v-if="invoices.length" class="task-list mt-5 grid-cols-1 grid gap-4">
      <NuxtLink
        v-for="invoice in filteredInvoice"
        :key="invoice.id"
        :to="`invoice/${invoice.id}`"
      >
        <InvoiceCard
          class="flex-col gap-4 hover:scale-[1.02] cursor-pointer transition-all"
          :invoice="invoice"
        />
      </NuxtLink>
    </div>

    <span v-if="!invoices.length" class="text-center mt-5 dark:text-white"
      >there is no data to show</span
    >

    <CommonModal :show="showModal" @close="showModal = false">
      <div class="flex flex-col gap-10 w-full">
        <span class="font-semibold text-2xl dark:text-white">Add Invoice</span>
        <InvoiceForm @close="showModal = false" />
      </div>
    </CommonModal>
  </section>
</template>
<script lang="ts" setup>
import { Invoice } from "~/composables/useInvoice";

const { options, invoices } = useInvoice();
const filterInvoice = ref<String | null>(null);

const showModal = ref(false);

const filteredInvoice: ComputedRef<Invoice[]> = computed(() => {
  if (!filterInvoice.value) return invoices.value;
  return invoices.value.filter(
    (invoice) => invoice.status === filterInvoice.value,
  );
});
</script>
