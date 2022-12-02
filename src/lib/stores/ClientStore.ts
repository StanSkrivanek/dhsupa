import { writable } from "svelte/store";
import data from '../../seed.json';
export const clients = writable<Client[]>([]);

export const loadClients = async () => {
  clients.set(data.clients);
  // clients.set([]) // test empty state;
}
export const addClient = (clientToAdd: Client) => {
  clients.update((prev: Client[]) => [...prev, clientToAdd]);
  return clientToAdd;
}