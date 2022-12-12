<script lang="ts">
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import Eye from '$lib/components/Icon/Eye.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import { convertDate, isLate } from '$lib/utils/dateHelpers';
  import { centsToDollars, invoiceTotal } from '$lib/utils/moneyHelpers';
  import { clickOutside } from '$lib/actions/ClickOutside';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Send from '$lib/components/Icon/Send.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import ConfirmDelete from './ConfirmDelete.svelte';
  export let invoice: Invoice;

  let isAdditionalMenuShowing = false;
  let isOptionsDisabled = false;
  let isModalShowing = false;
  let isInvoiceFormShowing = false;

  const toggleAdditionalMenu = () => {
    isAdditionalMenuShowing = !isAdditionalMenuShowing;
  };
  const handleEdit = () => {
    isInvoiceFormShowing = true;
    isAdditionalMenuShowing = false;
  };
  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalMenuShowing = false;
  };
  const handleSend = () => {
    console.log('send');
  };
  const getInvoiceLabel = () => {
    if (invoice.invoiceStatus === 'draft') {
      return 'draft';
    } else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'sent';
    } else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
      isOptionsDisabled = true;
      return 'late';
    } else if (invoice.invoiceStatus === 'paid') {
      isOptionsDisabled = true;
      return 'paid';
    }
  };
</script>

<div
  class="invoice-table invoice-row mb-3 grid grid-cols-invoiceTableMobile items-center gap-x-4 rounded-lg bg-white px-4 py-3 shadow-tableRow lg:grid-cols-invoiceTable lg:py-6"
>
  <div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
  <div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
  <div class="invoiceNr text-sm lg:text-lg">{invoice.invoiceNumber}</div>
  <div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-lg">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm lg:text-lg">
    ${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
  </div>
  <div class="viewBtn hidden text-sm lg:block ">
    <a href={`/invoices/${invoice.id}`} class="center text-pastelPurple hover:text-daisyBush"
      ><Eye /></a
    >
  </div>
  <div class="moreBtn relative hidden text-sm lg:block" use:clickOutside={() => (isAdditionalMenuShowing = false)}>
    <button class="center text-pastelPurple hover:text-daisyBush" on:click={toggleAdditionalMenu}
      ><ThreeDots /></button
    >
    {#if isAdditionalMenuShowing}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
          { label: 'Send', icon: Send, onClick: handleSend, disabled: isOptionsDisabled },
          { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false }
        ]}
      />
    {/if}
  </div>
</div>

<!-- Modal -->
<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

<!-- slide Panel -->
{#if isInvoiceFormShowing}
  <!-- content here -->
  <SlidePanel
    on:closePanel={() => {
      isInvoiceFormShowing = false;
    }}
  >
    <InvoiceForm {invoice} formState="edit" closePanel={() => (isInvoiceFormShowing = false)} />
  </SlidePanel>
{/if}

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
