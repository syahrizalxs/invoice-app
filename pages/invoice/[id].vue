<template>
  <section class="p-5 w-full md:max-w-3xl mx-auto gap-4 flex flex-col">
    <div
      class="bg-indigo-50 dark:bg-space-cadet dark:text-white px-5 py-3 rounded-md flex-col md:flex-row gap-5 flex justify-between w-full"
    >
      <span class="text-2xl font-semibold">#{{ route.params.id }}</span>
      <div class="flex justify-center gap-2">
        <CommonButton
          class="bg-gray-500 dark:bg-ultra-violet px-5 text-white py-2"
          @click="showModal = true"
          >Edit</CommonButton
        >
        <CommonButton
          class="bg-red-500 dark:text-white px-5 py-2"
          @click="doDelete()"
          >Delete</CommonButton
        >
        <CommonButton
          class="bg-tropical-indigo dark:text-white px-5 py-2"
          @click="
            changeStatusInvoice(route.params.id, 'paid');
            router.replace('/');
          "
          >Mark as Paid</CommonButton
        >
      </div>
    </div>

    <div
      class="bg-indigo-50 dark:bg-space-cadet dark:text-white px-5 py-5 flex flex-col gap-10 w-full rounded-md"
    >
      <div class="flex w-full flex-col gap-2 items-end text-gray-400">
        <span>{{ invoice?.bill.to.address }}</span>
        <span>{{ invoice?.bill.to.city }}</span>
        <span>{{ invoice?.bill.to.postCode }}</span>
        <span>{{ invoice?.bill.to.country }}</span>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-gray-400">Name</span>
          <span class="text-xl">{{ invoice?.bill.to.name }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-gray-400">Sent to</span>
          <span class="text-xl">{{ invoice?.bill.to.email }}</span>
        </div>
      </div>

      <div>
        <div
          class="bg-tropical-indigo dark:bg-gray-900 rounded-md p-3 flex flex-col"
        >
          <table class="dark:text-white w-full">
            <thead>
              <tr class="text-right p-3">
                <th class="font-light">Item Name</th>
                <th class="font-light">Qty</th>
                <th class="font-light">Price</th>
                <th class="font-light">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in invoice?.items"
                :key="index"
                class="text-right font-semibold"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>{{ formatCurrency(item.price * item.qty) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between bg-black p-3">
          <span class="text-2xl">Total</span>
          <span class="text-2xl">
            {{ formatCurrency(total(invoice?.items!) || 0) }}
          </span>
        </div>
      </div>
    </div>
    <CommonModal :show="showModal" @close="showModal = false">
      <div class="flex flex-col gap-10 w-full">
        <span class="font-semibold text-2xl dark:text-white">Add Invoice</span>
        <InvoiceForm @close="showModal = false" />
      </div>
    </CommonModal>
  </section>
</template>

<script setup lang="ts">
import type { Invoice, Items } from "@/composables/useInvoice";
const route = useRoute();
const router = useRouter();
const { getInvoice, deleteInvoice, changeStatusInvoice } = useInvoice();

const invoice = ref<Invoice>();
const showModal = ref(false);

const total = (items: Items[]): number => {
  if (!items) return 0;
  return items.reduce((acc, value) => {
    return acc + value.price * value.qty;
  }, 0);
};

const doDelete = () => {
  router.replace("/");
  deleteInvoice(route.params.id);
};
onMounted(() => {
  invoice.value = getInvoice(route.params.id);
});
</script>
