const formatDate = (date: string): string => {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
};

export { formatDate, formatCurrency };
