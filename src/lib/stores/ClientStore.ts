import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = async () => {
  clients.set(data.clients);
  // clients.set([]) // test empty state;
};

export const addClient = (clientToAdd: Client) => {
  clients.update((prev: Client[]) => [...prev, {...clientToAdd, clientStatus: 'active'}]);
  return clientToAdd;
};

export const updateClient = (clientToUpdate: Client) => {
  clients.update((prev: Client[]) =>
    prev.map((cur: Client) => (cur.id === clientToUpdate.id ? clientToUpdate : cur))
  );
  return clientToUpdate;
};

// export const updateClient = (clientToUpdate: Client) => {
//   clients.update((prev: Client[]) => {
//     const index = prev.findIndex((client) => client.id === clientToUpdate.id);
//     prev[index] = clientToUpdate;
//     return prev;
//   });
// }
