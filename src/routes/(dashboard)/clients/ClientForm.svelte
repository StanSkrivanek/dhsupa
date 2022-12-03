<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Check from '$lib/components/Icon/Check.svelte';
  import { states } from '$lib/utils/states';
  import { addClient, updateClient } from '$lib/stores/ClientStore';
  import { snackbar } from '$lib/stores/SnackbarStore';

  export let closePanel: () => void = () => {};
  export let formState: 'create' | 'edit' = 'create';
  export let client: Client = {} as Client;

  const handleSubmit = () => {
    // console.log({ client });
    if (formState === 'create') {
      addClient(client);
      snackbar.send({ message: 'Client was created', type: 'success' });
      //   closePanel();
    } else {
      updateClient(client);
      snackbar.send({ message: 'Client was updated', type: 'success' });
    }

    closePanel();
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush ">
  {#if formState === 'create'} Add {:else} Edit {/if} a Client
</h2>

<form action="" class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name"> Client Name</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Client Name"
      required
      bind:value={client.name}
    />
  </div>
  <div class="field col-span-6">
    <label for="email">Email Address</label>
    <input
      type="text"
      id="email"
      name="email"
      placeholder="Email"
      required
      bind:value={client.email}
    />
  </div>
  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" id="street" name="street" placeholder="Street" bind:value={client.street} />
  </div>
  <div class="field col-span-2">
    <label for="city">City</label>
    <input type="text" id="city" name="city" placeholder="city" bind:value={client.city} />
  </div>
  <div class=" field col-span-2">
    <label for="state">State</label>
    <select id="state" name="state" bind:value={client.state}>
      <!-- <option value="no-state">Select State</option> -->
      <option />
      {#each states as state}
        <option value={state.value}>{state.name}</option>
      {/each}
    </select>
  </div>
  <div class=" field col-span-2">
    <label for="zip">zip</label>
    <input
      type="text"
      id="zip"
      name="zip"
      placeholder="zip"
      minlength="5"
      bind:value={client.zip}
    />
  </div>
  <div class="col-span-6 flex">
    <Button
      label="delete"
      onButtonClick={() => {}}
      isAnimated={false}
      style="textOnlyDestructive"
      iconLeft={Trash}
    />
    <div class="field flex flex-grow justify-end gap-x-4 ">
      <div class="col-span-3 flex gap-x-4">
        <Button
          style="secondary"
          label="Cancel"
          onButtonClick={() => {
            closePanel();
          }}
          isAnimated={false}
        />
        <button
          type="submit"
          class="button flex translate-y-0 items-center justify-center gap-x-2 bg-lavenderIndigo text-white shadow-colored transition-all duration-300 ease-in-out hover:shadow-coloredHover"
          ><Check /> save</button
        >
      </div>
    </div>
  </div>
</form>
