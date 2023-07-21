interface BillInformation {
  name: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  country: string;
}

interface Bill {
  to: BillInformation;
  from: Omit<BillInformation, "name" | "email">;
}

export interface Items {
  name: string;
  qty: number;
  price: number;
}

export interface Invoice {
  id: string;
  bill: Bill;
  invoiceDate: Date;
  paymentTerms: string;
  projectDescription: string;
  items: Items[];
  status: "paid" | "pending" | "draft";
}

export interface Option {
  label: string;
  value?: string;
}

const invoices = ref<Invoice[]>([]);

export const useInvoice = () => {
  // const storageInvoices = useStorage<Invoice[]>("invoices", [], localStorage, {
  //   mergeDefaults: true,
  // });

  const options: Option[] = [
    {
      label: "Draft",
      value: "draft",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "paid",
      label: "Paid",
    },
  ];

  const addInvoice = (invoice: Invoice) => {
    invoices.value.push(invoice);
    localStorage.removeItem("invoces");
    localStorage.setItem("invoices", JSON.stringify(invoices.value));
  };

  const editInvoice = (id: string, invoice: Invoice) => {
    const result = invoices.value.findIndex((item) => item.id === id);
    invoices.value.splice(result, 1);

    invoices.value = [...invoices.value, invoice];
    localStorage.removeItem("invoices");
    localStorage.setItem("invoices", JSON.stringify(invoices.value));
  };

  const deleteInvoice = (id: string) => {
    const result = invoices.value.findIndex((item) => item.id === id);
    invoices.value.splice(result, 1);

    localStorage.removeItem("invoices");
    localStorage.setItem("invoices", JSON.stringify(invoices.value));
  };

  const getInvoice = (id: string): Invoice => {
    if (!invoices.value) return {} as Invoice;
    return invoices?.value?.filter((item) => item.id === id)[0];
  };

  const changeStatusInvoice = (
    id: string,
    status: "draft" | "paid" | "pending",
  ) => {
    const result = invoices.value.find((item) => item.id === id)!;
    const filteredInvoice = invoices.value.filter((item) => item.id !== id);
    invoices.value = [...filteredInvoice, { ...result, status }];

    localStorage.removeItem("invoices");

    localStorage.setItem("invoices", JSON.stringify(invoices.value));
  };

  onMounted(() => {
    if (process.client) {
      const storage = JSON.parse(localStorage.getItem("invoices")!) || [];
      invoices.value = storage;
    }
  });

  return {
    options,
    invoices,
    addInvoice,
    getInvoice,
    editInvoice,
    deleteInvoice,
    changeStatusInvoice,
  };
};

export default useInvoice;
