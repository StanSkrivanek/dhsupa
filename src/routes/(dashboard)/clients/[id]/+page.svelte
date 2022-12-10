<script lang="ts">
  //   import { onMount } from 'svelte';
  //   import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import type { PageData } from './$types';
  import { sumInvoices, centsToDollars } from '$lib/utils/moneyHelpers';
  import Search from '$lib/components/Search.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from '../../invoices/InvoiceRow.svelte';
  import BlankState from '../../invoices/BlankState.svelte';
  import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import ClientForm from '../ClientForm.svelte';
    import { isLate } from '$lib/utils/dateHelpers';

  // export let data: PageData;
  export let data: { client: Client };
  $: ({ client } = data);

  console.log('data', data, client);
  //   onMount(() => {
  //     loadInvoices();
  //     // console.log($invoices);
  //   });
  let isClientFormShowing: boolean = false;
  let isEditingCurrentClient: boolean = false;
  function editClient() {
    isClientFormShowing = true;
    isEditingCurrentClient = true;
  }
  function closePanel() {
    isClientFormShowing = false;
  }
  function getDraft(){
    if (!client.invoices || client.invoices.length < 1) return '0.00';
    const draftInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'draft');
    return centsToDollars(sumInvoices(draftInvoices));
  }
  function getPaid(){
    if (!client.invoices || client.invoices.length < 1) return '0.00';
    const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
    return centsToDollars(sumInvoices(paidInvoices));
  }

  function getTotalOverdue():string{
  if (!client.invoices || client.invoices.length < 1) return '0.00';
    const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate));
    return centsToDollars(sumInvoices(paidInvoices));
  }
  function getTotalOutstanding():string{
  if (!client.invoices || client.invoices.length < 1) return '0.00';
    const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate));
    return centsToDollars(sumInvoices(paidInvoices));
  }


</script>

<svelte:head>
  <title>Client Invoices</title>
</svelte:head>

<div
  class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  {#if client?.invoices && client.invoices.length > 0}
    <Search />
  {:else}
    <div />
  {/if}
  <div>
    <Button
      label="Add Client"
      onButtonClick={() => {
        isClientFormShowing = true;
      }}
    />
  </div>
</div>

<div class="mb-7 flex w-full items-center justify-between">
  <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{client?.name}</h1>
  <Button
    label="edit"
    style="textOnly"
    isAnimated={false}
    onButtonClick={editClient}
    iconLeft={Edit}
  />
</div>

<div class="mb-10 grid grid-cols-1 gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
  <div class="summary-block">
    <div class="label">Total Overdue</div>
    <div class="number"><sup>$</sup>{getTotalOverdue()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Outstanding</div>
    <div class="number"><sup>$</sup>{getTotalOutstanding()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Draft</div>
    <div class="number"><sup>$</sup>{getDraft()}</div>
  </div>
  <div class="summary-block">
    <div class="label">Total Paid</div>
    <div class="number"><sup>$</sup>{getPaid()}</div>
  </div>
</div>

<!-- table of invoices -->
<div>
  {#if client && client.invoices === null}
    <!-- content here -->
    Lodaing...
  {:else if client.invoices && client.invoices.length <= 0}
    <BlankState />
  {:else}
    <!-- list of invoices -->
    <InvoiceRowHeader className="text-daisyBush" />
    {#if client.invoices}
      <div class="">
        <!-- content here -->
        {#each client.invoices as invoice}
          <InvoiceRow {invoice} />
        {/each}
      </div>
      <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices(client.invoices))}`} />
    {/if}
  {/if}
</div>

<!-- slide Panel -->
{#if isClientFormShowing}
  <!-- content here -->
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm
    {closePanel}
    formStatus={isEditingCurrentClient ? 'edit' : 'create'}
    client={isEditingCurrentClient ? data.client : undefined}
    />
  </SlidePanel>
{/if}

<style lang="postcss">
  .summary-block {
    @apply text-center;
  }
  .label {
    @apply text-sm font-black text-[#a397ad];
  }
  sup {
    @apply relative -top-2;
  }
  .number {
    @apply text-[2.5rem] font-black text-purple;
  }
</style>
