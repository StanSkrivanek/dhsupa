import { writable } from 'svelte/store';
import data from '../seed.json';
``;

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
  invoices.set(data.invoices);
};

export const addInvoice = (invoiceToAdd: Invoice) => {
  invoices.update((prev: Invoice[]) => [...prev, invoiceToAdd]);
  return invoiceToAdd;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
  invoices.update((prev: Invoice[]) =>
    prev.map((cur: Invoice) => (cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
  );
  return invoiceToUpdate;
};
// export const updateInvoice = (invoiceToUpdate: Invoice) => {
//   invoices.update((prev: Invoice[]) => {
//     const index = prev.findIndex((invoice) => invoice.id === invoiceToUpdate.id);
//     prev[index] = invoiceToUpdate;
//     return prev;
//   });
//   return invoiceToUpdate;
// };

export const deleteInvoice = async (invoiceToDelete: Invoice) => {
  invoices.update((prev: Invoice[]) =>
    prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
  );
  return invoiceToDelete;
};
