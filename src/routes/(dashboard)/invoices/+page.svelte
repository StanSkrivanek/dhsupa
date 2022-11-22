<script lang="ts">
  import Search from '$lib/components/Search.svelte';
  import Eye from '$lib/components/Icon/Eye.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  // come stuff here
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

<!-- list of invoices -->
<div>
  <!-- header -->
  <div class="table-header invoice-table hidden text-daisyBush lg:grid lg:px-6">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID #</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </div>

  <!-- list of invioces -->
  <div
    class="invoice-table invoice-row mb-3 grid grid-cols-invoiceTableMobile items-center gap-x-4 rounded-lg bg-white px-4 py-3 shadow-tableRow lg:grid-cols-invoiceTable lg:py-6"
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label="draft" /></div>
    <div class="dueDate text-sm lg:text-lg">12/12/20225</div>
    <div class="invoiceNr text-sm lg:text-lg">55555</div>
    <div class="clientName text-base font-bold lg:text-lg">fds</div>
    <div class="amount text-right font-mono text-sm lg:text-lg">$100.00</div>
    <div class=" viewBtn hidden text-sm lg:block ">
      <a href="/" class=" text-pastelPurple hover:text-daisyBush"><Eye /></a>
    </div>
    <div class="moreBtn hidden text-sm lg:block">
      <button class="center text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
  <CircledAmount label="Total" amount="$1,990.00" />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply font-sansSerif text-xl font-black leading-snug;
  }

  .invoice-row {
    grid-template-areas:
      'invoiceNr invoiceNr'
      'clientName amount'
      'dueDate status';
  }
  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status dueDate invoiceNr clientName amount viewBtn moreBtn';
    }
  }
  .invoice-row .status {
    grid-area: status;
  }
  .invoice-row .dueDate {
    grid-area: dueDate;
  }
  .invoice-row .invoiceNr {
    grid-area: invoiceNr;
  }
  .invoice-row .clientName {
    grid-area: clientName;
  }
  .invoice-row .amount {
    grid-area: amount;
  }
  .invoice-row .viewBtn {
    grid-area: viewBtn;
  }
  .invoice-row .moreBtn {
    grid-area: moreBtn;
  }
  /* .invoice-row .viewBtn, .invoice-row .moreBtn{
		@apply text-center;
	} */
</style>
