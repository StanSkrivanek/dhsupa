<script lang="ts">
  import Eye from '$lib/components/Icon/Eye.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { sumLineItems,centsToDolars } from '$lib/utils/moneyHelers';
  export let invoice: Invoice;
</script>

<div
  class="invoice-table invoice-row mb-3 grid grid-cols-invoiceTableMobile items-center gap-x-4 rounded-lg bg-white px-4 py-3 shadow-tableRow lg:grid-cols-invoiceTable lg:py-6"
>
  <div class="status"><Tag className="ml-auto lg:ml-0" label={invoice.invoiceStatus} /></div>
  <div class="dueDate text-sm lg:text-lg">{invoice.dueDate}</div>
  <div class="invoiceNr text-sm lg:text-lg">{invoice.invoiceNumber}</div>
  <div class="clientName text-base font-bold lg:text-lg whitespace-nowrap truncate">{invoice.client.name}</div>
  <div class="amount text-right font-mono text-sm lg:text-lg">
    ${centsToDolars(sumLineItems(invoice.lineItems))}
  </div>
  <div class=" viewBtn hidden text-sm lg:block ">
    <a href="/" class=" text-pastelPurple hover:text-daisyBush"><Eye /></a>
  </div>
  <div class="moreBtn hidden text-sm lg:block">
    <button class="center text-pastelPurple hover:text-daisyBush"><ThreeDots /></button>
  </div>
</div>

<style lang="postcss">
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
</style>
