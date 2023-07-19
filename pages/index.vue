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
          class="text-white bg-tropical-indigo hover:bg-indigo-400"
          @click="showModal = true"
        >
          New Invoice
        </CommonButton>
      </div>
    </div>

    <div class="task-list mt-5 grid-cols-1 grid gap-4">
      <InvoiceCard
        v-for="invoice in invoices"
        :key="invoice.id"
        class="flex-col gap-4"
        :invoice="invoice"
      />
    </div>

    <CommonModal :show="showModal" @close="showModal = false">
      <span class="font-semibold text-2xl dark:text-white">Add Invoice</span>
    </CommonModal>
  </section>
</template>
<script lang="ts" setup>
const { options, invoices } = useInvoice();
const filterInvoice = ref<String | null>(null);
const showModal = ref(false);
</script>
