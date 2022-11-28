<script lang="ts">
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { slide } from 'svelte/transition';
  import LineItemRows from './LineItemRows.svelte';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { states } from '$lib/utils/states';
  import { addClient, clients, loadClients } from '$stores/ClientStore';
  import { today } from '$lib/utils/dateHelpers';
  import { addInvoice, updateInvoice } from '$stores/InvoiceStore';
  import ConfirmDelete from './ConfirmDelete.svelte';

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    unitPrice: 0,
    quantity: 0,
    amount: 0
  };

  export let closePanel: () => void = () => {};
  export let invoice: Invoice = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem }] as LineItem[]
  } as Invoice;
  export let formState: 'create' | 'edit' = 'create';
  // let lineItems: LineItem[] = [{ ...blankLineItem }];

  let isModalShowing = false;
  let isNewClient = false;
  let newClient: Partial<Client> = {};

  const initDiscount = invoice.discount || 0;

  const addLineItem = () => {
    invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
  };

  const deleteLineItem = (event: CustomEvent) => {
    invoice.lineItems =
      invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
  };

  const UpdateLineItem = () => {
    invoice.lineItems = invoice.lineItems;
  };

  const handleSubmit = () => {
    // console.log({ invoice, newClient });
    if (isNewClient) {
      invoice.client = newClient as Client;
      addClient(newClient as Client);
      closePanel();
    }
    if (formState === 'create') {
      addInvoice(invoice);
      // closePanel();
    } else {
      // update invoice
      updateInvoice(invoice);
      closePanel();
    }
  };

  const UpdateDiscount = (event: CustomEvent) => {
    // console.log(event.detail.discount);
    invoice.discount = event.detail.discount;
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush ">
  {#if formState === 'create'} Add {:else} Edit {/if} an Invoice
</h2>

<form action="" class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <!-- client -->
  <div class=" field col-span-6 md:col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex flex-wrap items-center  gap-x-2 sm:flex-nowrap md:gap-x-4">
        <select
          class="mb-2 sm:mb-0"
          name="client"
          id="client"
          required={!isNewClient}
          bind:value={invoice.client.id}
          on:change={() => {
            const selectedClient = $clients.find((client) => client.id === invoice.client.id);
            invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
          }}
        >
          <option>Select a client</option>
          {#each $clients as client}
            <!-- content here -->
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>

        <div class="font-bold text-monsoon"><span>or</span></div>
        <Button
          label="add client"
          onButtonClick={() => {
            isNewClient = true;
            invoice.client.name = '';
            invoice.client.email = '';
          }}
          style="outlined"
          isAnimated={false}
        />
      </div>
    {:else}
      <!-- show other form fields-->
      <label for="newclient">New Client</label>
      <div class="flex flex-wrap items-center  gap-x-2 sm:flex-nowrap md:gap-x-4">
        <input
          class="mb-2 sm:mb-0"
          type="text"
          name="newclient"
          id="newclient"
          placeholder="Client Name"
          required={isNewClient}
          bind:value={newClient.name}
        />
        <div class=" font-bold text-monsoon"><span>or</span></div>
        <Button
          label="Existing Client"
          onButtonClick={() => {
            isNewClient = false;
            newClient = {};
          }}
          style="outlined"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- invoice Number -->
  <!-- TODO: set number to auto increase with each new invoice -->
  <div class="field col-span-6 md:col-span-2 row-start-1 md:row-start-auto">
    <label for="invoiceNr">Invoice Nr</label>
    <input type="number" name="invoiceNr" id="" required bind:value={invoice.invoiceNumber} />
  </div>

  <!-- new client details -->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-4" transition:slide>
      <div class=" field col-span-6">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={isNewClient}
          bind:value={newClient.email}
        />
      </div>
      <div class="field col-span-6">
        <label for="street">Street</label>
        <input type="text" name="street" id="street" bind:value={newClient.street} />
      </div>
      <div class="field col-span-2">
        <label for="city">City</label>
        <input type="text" name="city" id="city" bind:value={newClient.city} />
      </div>
      <div class="field col-span-2">
        <label for="state">State</label>
        <select name="state" id="state" bind:value={newClient.state}>
          <option />
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>
      <div class="field col-span-2">
        <label for="zip">Post Code</label>
        <input type="text" name="zip" id="zip" bind:value={newClient.zip} />
      </div>
    </div>
  {/if}
  <!-- dueDate -->
  <div class="field col-span-3 sm:col-span-2 ">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" id="" min={today} required bind:value={invoice.dueDate} />
  </div>

  <!-- issue date -->
  <div class="field col-span-3 md:col-span-2 md:col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" id="" min={today} bind:value={invoice.issueDate} />
  </div>
  <!-- subject -->
  <div class="field col-span-6 ">
    <label for="subject">Subject</label>
    <input type="text" name="subject" id="" bind:value={invoice.subject} />
  </div>

  <!-- line Items -->
  <div class="field col-span-6 ">
    <!-- <label for="lineItems">Line Items</label> -->
    <LineItemRows
      lineItems={invoice.lineItems}
      discount={invoice.discount || 0}
      on:addLineItem={addLineItem}
      on:removeLineItem={deleteLineItem}
      on:updateLineItem={UpdateLineItem}
      on:updateDiscount={UpdateDiscount}
    />
  </div>

  <!-- notes -->
  <div class="field col-span-6 ">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayed on invoice)</span></label
    >
    <textarea name="notes" id="notes" bind:value={invoice.notes} />
  </div>
  <!-- terms -->
  <div class="field col-span-6 ">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
    >
    <textarea name="terms" id="terms" bind:value={invoice.terms} />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italic_</em>, <code>`code`</code>,
      <del>~strikethrough~</del>
    </div>
  </div>
  <!-- buttons -->
  <!-- show delete btn only in EDIT mode -->
  {#if formState === 'edit'}
    <div class="field col-span-2">
      <Button
        style="textOnlyDestructive"
        label="Delete"
        onButtonClick={() => {
          isModalShowing = true;
        }}
        isAnimated={false}
        iconLeft={Trash}
      />
    </div>
  {/if}
  <div class="field col-span-4 flex justify-end gap-x-4">
    <Button
      style="secondary"
      label="Cancel"
      onButtonClick={() => {
        closePanel();
      }}
      isAnimated={false}
    />
    <!-- <Button label="Save" onButtonClick={() => {}} isAnimated={false} /> -->
    <button
      type="submit"
      class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all duration-300 ease-in-out"
      >save</button
    >
  </div>
</form>

<ConfirmDelete
  {invoice}
  {isModalShowing}
  on:close={() => {
    isModalShowing = false;
    closePanel();
  }}
/>
