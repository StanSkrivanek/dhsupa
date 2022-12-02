<script lang="ts">
  import { onMount } from 'svelte';
  import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
  import { sumInvoices, centsToDollars } from '$lib/utils/moneyHelpers';
  import Search from '$lib/components/Search.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';

  onMount(() => {
    loadInvoices();
    // console.log($invoices);
  });
  let isInvoiceFormShowing: boolean = false;
</script>

<svelte:head>
  <title>Invoices</title>
</svelte:head>

<div
  class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  {#if $invoices.length > 0}
    <Search />
  {:else}
    <div />
  {/if}
  <div>
    <Button
      label="Add Invoice"
      onButtonClick={() => {
        isInvoiceFormShowing = true;
      }}
    />
  </div>
</div>

<!-- table of invoices -->
<div>
  {#if $invoices === null}
    <!-- content here -->
    Lodaing...
  {:else if $invoices.length <= 0}
    <BlankState />
  {:else}
    <!-- list of invoices -->
    <InvoiceRowHeader className="text-daisyBush" />
    <div class="">
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
  {/if}
</div>

<!-- slide Panel -->
{#if isInvoiceFormShowing}
  <!-- content here -->
  <SlidePanel
    on:closePanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}
