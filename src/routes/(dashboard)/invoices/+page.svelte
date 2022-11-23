<script lang="ts">
  import { onMount } from 'svelte';
  import { invoices, loadInvoices } from '$stores/InvoiceStore';
  import Search from '$lib/components/Search.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { sumInvoices, centsToDollars } from '$lib/utils/moneyHelers';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });
</script>

<svelte:head>
  <title>Invoices</title>
</svelte:head>

<div
  class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  {#if $invoices.length > 0}
    <!-- content here -->
    <Search />
  {:else}
    <div />
    <!-- else content here -->
  {/if}
  <div>
    <button
      class="relative translate-y-0 whitespace-nowrap rounded-md bg-lavenderIndigo px-5 py-2 font-sansSerif text-base font-black text-white shadow-colored transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-coloredHover lg:px-10 lg:py-3 lg:text-xl"
    >
      Add Invoice</button
    >
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
    <div class="flex flex-col-reverse">
      <!-- header -->
      {#each $invoices as invoice}
        <InvoiceRow {invoice} />
      {/each}
    </div>
    <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
  {/if}
</div>
