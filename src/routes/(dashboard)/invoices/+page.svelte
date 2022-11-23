<script lang="ts">
  import { onMount } from 'svelte';
  import { invoices, loadInvoices } from '$stores/InvoiceStore';
  import Search from '$lib/components/Search.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { sumInvoices, centsToDollars } from '$lib/utils/moneyHelers';

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
  <Search />
  <div>
    <button
      class="relative translate-y-0 whitespace-nowrap rounded-md bg-lavenderIndigo px-5 py-2 font-sansSerif text-base font-black text-white shadow-colored transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-coloredHover lg:px-10 lg:py-3 lg:text-xl"
    >
      New Invoice</button
    >
  </div>
</div>

<!-- table of invoices -->
<div>
  <!-- header -->
  <div class="table-header invoice-table hidden text-daisyBush lg:grid lg:px-6">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID #</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div />
    <div />
  </div>

  <!-- list of invoices -->
  <div class="flex flex-col-reverse">
    {#each $invoices as invoice}
      <InvoiceRow invoice={invoice} />
    {/each}
  </div>
  <CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply font-sansSerif text-xl font-black leading-snug;
  }
</style>
