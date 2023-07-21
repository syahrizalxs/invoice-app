<template>
  <form class="flex flex-col gap-8 w-full" @submit="onSubmit">
    <div>
      <span class="text-tropical-indigo text-base font-semibold"
        >Bill From</span
      >
      <div class="mt-3">
        <CommonFormGroup>
          <CommonLabel for="streetFrom">Street Address</CommonLabel>
          <CommonInput name="streetFrom" />
        </CommonFormGroup>
        <div class="class grid grid-cols-1 gap-x-0 md:grid-cols-3 md:gap-x-4">
          <CommonFormGroup>
            <CommonLabel for="cityFrom">City</CommonLabel>
            <CommonInput name="cityFrom" />
          </CommonFormGroup>
          <CommonFormGroup>
            <CommonLabel for="postCodeFrom">Post Code</CommonLabel>
            <CommonInput name="postCodeFrom" />
          </CommonFormGroup>
          <CommonFormGroup>
            <CommonLabel for="countryFrom">Country</CommonLabel>
            <CommonInput name="countryFrom" />
          </CommonFormGroup>
        </div>
      </div>
    </div>

    <div>
      <span class="text-tropical-indigo text-base font-semibold mt-5"
        >Bill To</span
      >
      <div class="mt-3">
        <CommonFormGroup>
          <CommonLabel for="clientName">Client's Name</CommonLabel>
          <CommonInput name="clientName" />
        </CommonFormGroup>
        <CommonFormGroup>
          <CommonLabel for="clientEmail">Client's Email</CommonLabel>
          <CommonInput name="clientEmail" />
        </CommonFormGroup>
        <CommonFormGroup>
          <CommonLabel for="clientAddress">Street Addres</CommonLabel>
          <CommonInput name="clientAddress" />
        </CommonFormGroup>
        <div class="class grid grid-cols-1 gap-x-0 md:grid-cols-3 md:gap-x-4">
          <CommonFormGroup>
            <CommonLabel for="clientCity">City</CommonLabel>
            <CommonInput name="clientCity" />
          </CommonFormGroup>
          <CommonFormGroup>
            <CommonLabel for="clientPostCode">Post Code</CommonLabel>
            <CommonInput name="clientPostCode" />
          </CommonFormGroup>
          <CommonFormGroup>
            <CommonLabel for="clientCountry">Country</CommonLabel>
            <CommonInput name="clientCountry" />
          </CommonFormGroup>
        </div>
        <div
          class="class grid grid-cols-1 mt-4 gap-x-0 md:grid-cols-2 md:gap-x-4"
        >
          <CommonFormGroup>
            <CommonLabel for="invoiceDate">Invoice Date</CommonLabel>
            <CommonInput name="invoiceDate" type="date" />
          </CommonFormGroup>
          <CommonFormGroup>
            <CommonLabel for="paymentTerms">Payment Terms</CommonLabel>
            <CommonSelect name="paymentTerms">
              <option value="30">Next 30 Days</option>
              <option value="60">Next 2 Months</option>
              <option value="90">Next 3 Months</option>
            </CommonSelect>
          </CommonFormGroup>
        </div>
        <CommonFormGroup>
          <CommonLabel for="projectDescription"
            >Project Description</CommonLabel
          >
          <CommonInput name="projectDescription" />
        </CommonFormGroup>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <span class="text-xl font-semibold text-gray-600">Item List</span>
      <div class="grid overflow-x-auto px-1 py-3">
        <div class="grid grid-cols-[180px_100px_100px_100px_50px] gap-x-3">
          <CommonLabel>Item Name</CommonLabel>
          <CommonLabel>QTY</CommonLabel>
          <CommonLabel>Price</CommonLabel>
          <CommonLabel>Total</CommonLabel>
        </div>
        <div
          v-for="(field, index) in fields"
          :key="field.key"
          class="grid grid-cols-[180px_100px_100px_100px_50px] gap-x-3 mt-3 items-center"
        >
          <CommonInput hide-message :name="`items[${index}].name`" />
          <CommonInput
            hide-message
            :name="`items[${index}].qty`"
            min="0"
            type="number"
          />
          <CommonInput
            hide-message
            :name="`items[${index}].price`"
            min="0"
            type="number"
          />
          <CommonInput
            hide-message
            disabled
            :name="`items[${index}].total`"
            :value="+field.value.qty * +field.value.price"
          />
          <i
            class="i-mdi-trash text-3xl text-gray-700"
            role="button"
            @click="remove(index)"
          ></i>
        </div>
      </div>
      <CommonButton
        class="bg-gray-300 dark:bg-gray-800 flex gap-2 justify-center items-center"
        type="button"
        @click="() => push({ name: '', qty: 0, price: 0, total: 0 })"
      >
        <i class="i-mdi-plus text-gray-700 dark:text-white"></i>
        <span class="text-gray-700 dark:text-white">Add New Item</span>
      </CommonButton>
    </div>
    <div class="flex justify-end gap-5 mb-5">
      <CommonButton
        class="bg-gray-800 px-6 text-white font-semibold"
        type="button"
        @click="emit('close')"
        >Cancel</CommonButton
      >
      <CommonButton class="bg-tropical-indigo px-6 text-white font-semibold">{{
        isEdit ? "Save Changes" : "Save Invoice"
      }}</CommonButton>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { useForm, useFieldArray } from "vee-validate";
import * as yup from "yup";
import { Invoice, useInvoice } from "~/composables/useInvoice";

interface Items {
  name: string;
  qty: number;
  price: number;
  total?: number;
}

interface FormInvoice {
  streetFrom: string;
  cityFrom: string;
  postCodeFrom: string;
  countryFrom: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
  items: Items[];
}

defineComponent({
  name: "FormInvoice",
});

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["close"]);
const { invoices, addInvoice, getInvoice, editInvoice } = useInvoice();

const { handleSubmit, setFieldValue } = useForm<FormInvoice>({
  validationSchema: yup.object({
    streetFrom: yup.string().required().label("Street"),
    cityFrom: yup.string().required().label("City"),
    postCodeFrom: yup.string().required().label("Post code"),
    countryFrom: yup.string().required().label("Country"),
    clientName: yup.string().required().label("Client's name"),
    clientEmail: yup.string().email().required().label("Client's email"),
    clientAddress: yup.string().required().label("Client's address"),
    clientCity: yup.string().required().label("Client's city"),
    clientPostCode: yup.string().required().label("Client's post code"),
    clientCountry: yup.string().required().label("Client's country"),
    invoiceDate: yup.string().required().label("Invoice date"),
    paymentTerms: yup.string().required().label("Paymet terms"),
    projectDescription: yup.string().required().label("Project Description"),
    items: yup.array().of(
      yup.object().shape({
        name: yup.string().required().label("Item name"),
        qty: yup.string().required().label("Quantity"),
        price: yup.string().required().label("Price"),
        total: yup.string(),
        // eslint-disable-next-line prettier/prettier
      }),
    ),
  }),
  initialValues: {
    items: [{ name: "", qty: 0, price: 0, total: 0 }],
  },
});

const { fields, push, remove } = useFieldArray<Items>("items");

const statusInvoice = ref<"draft" | "pending" | "paid">("draft");
const isEdit = computed(() => route.params.id !== undefined);

const onSubmit = handleSubmit(async (values) => {
  const params: Invoice = await {
    id: isEdit.value ? route.params.id : "RT0" + (+invoices.value.length + 1),
    bill: {
      to: {
        name: values.clientName,
        email: values.clientEmail,
        address: values.clientAddress,
        postCode: values.clientPostCode,
        country: values.clientCountry,
        city: values.clientCity,
      },
      from: {
        address: values.streetFrom,
        city: values.cityFrom,
        country: values.countryFrom,
        postCode: values.postCodeFrom,
      },
    },
    invoiceDate: new Date(values.invoiceDate),
    paymentTerms: values.paymentTerms,
    projectDescription: values.projectDescription,
    items: values.items,
    status: isEdit.value ? statusInvoice.value : "pending",
  };

  isEdit.value ? editInvoice(route.params.id, params) : addInvoice(params);
  emit("close");
  router.replace("/");
});

const populateForm = () => {
  const {
    bill: { from, to: client },
    paymentTerms,
    invoiceDate,
    items,
    projectDescription,
    status,
  } = getInvoice(route.params.id);

  setFieldValue("cityFrom", from.city);
  setFieldValue("streetFrom", from.address);
  setFieldValue("countryFrom", from.country);
  setFieldValue("postCodeFrom", from.postCode);

  setFieldValue("clientAddress", client.address);
  setFieldValue("clientCity", client.city);
  setFieldValue("clientEmail", client.email);
  setFieldValue("clientCountry", client.country);
  setFieldValue("clientPostCode", client.postCode);
  setFieldValue("clientName", client.name);

  setFieldValue("paymentTerms", paymentTerms);
  setFieldValue(
    "invoiceDate",
    new Date(invoiceDate).toISOString().split("T")[0],
  );
  setFieldValue("items", items);

  setFieldValue("projectDescription", projectDescription);
  statusInvoice.value = status!;
};

onMounted(() => {
  if (route.params.id) {
    populateForm();
  }
});
</script>
