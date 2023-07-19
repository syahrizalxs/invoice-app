interface BillInformation {
  name: String;
  email: String;
  address: String;
  city: String;
  postCode: String;
  country: String;
}

interface Bill {
  to: BillInformation;
  from: Omit<BillInformation, "city" | "postCode" | "country">;
}

interface Items {
  name: String;
  qty: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  bill: Bill;
  invoiceDate: Date;
  paymentDate: Date;
  projectDescription: String;
  items: Items[];
  status: "paid" | "pending" | "draft";
}

export interface Option {
  label: string;
  value?: string;
}

export const useInvoice = () => {
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

  const invoices = ref<Invoice[]>([
    {
      id: "RT3080",
      bill: {
        to: {
          name: "John Doe",
          email: "JohnDoe@anon.com",
          address: "Jl. Kuningan Barat",
          postCode: "13790",
          country: "Indonesia",
          city: "Jakarta",
        },
        from: {
          name: "Jane Doe",
          email: "janedoe@anon.com",
          address: "Jl. tendean",
        },
      },
      invoiceDate: new Date(),
      paymentDate: new Date(),
      projectDescription: "Project for E-Commerce Campaign",
      items: [
        {
          name: "Banner",
          qty: 1,
          price: 2000,
          total: 2000,
        },
      ],
      status: "draft",
    },
    {
      id: "RT3080",
      bill: {
        to: {
          name: "John Doe",
          email: "JohnDoe@anon.com",
          address: "Jl. Kuningan Barat",
          postCode: "13790",
          country: "Indonesia",
          city: "Jakarta",
        },
        from: {
          name: "Jane Doe",
          email: "janedoe@anon.com",
          address: "Jl. tendean",
        },
      },
      invoiceDate: new Date(),
      paymentDate: new Date(),
      projectDescription: "Project for E-Commerce Campaign",
      items: [
        {
          name: "Banner",
          qty: 1,
          price: 2000,
          total: 2000,
        },
      ],
      status: "paid",
    },
    {
      id: "RT3080",
      bill: {
        to: {
          name: "John Doe",
          email: "JohnDoe@anon.com",
          address: "Jl. Kuningan Barat",
          postCode: "13790",
          country: "Indonesia",
          city: "Jakarta",
        },
        from: {
          name: "Jane Doe",
          email: "janedoe@anon.com",
          address: "Jl. tendean",
        },
      },
      invoiceDate: new Date(),
      paymentDate: new Date(),
      projectDescription: "Project for E-Commerce Campaign",
      items: [
        {
          name: "Banner",
          qty: 1,
          price: 2000,
          total: 2000,
        },
      ],
      status: "pending",
    },
  ]);

  const addInvoice = (invoice: Invoice) => {
    const newInvoices = [...invoices.value, invoice];
    localStorage.setItem("invoices", JSON.stringify(newInvoices));
  };

  onMounted(() => {
    const storageInvoices: Invoice[] = JSON.parse(
      localStorage.getItem("invoices") || "{}"
    );

    if (Object.keys(storageInvoices).length !== 0) {
      invoices.value = storageInvoices;
    }
  });

  return {
    options,
    invoices,
    addInvoice,
  };
};

export default useInvoice;
