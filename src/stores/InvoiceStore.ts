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

export const deleteInvoice = async (invoiceToDelete: Invoice) => {
  invoices.update((prev: Invoice[]) =>
    prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
  );
  return invoiceToDelete;
};
