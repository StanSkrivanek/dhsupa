<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { loadSettings, settings } from '$lib/stores/SettingsStore';
  import { convertDate } from '$lib/utils/dateHelpers';
  import Button from '$lib/components/Button.svelte';
  import LineItemRows from '../LineItemRows.svelte';
  import SvelteMarkdown from 'svelte-markdown';

  export let data: { invoice: Invoice };
  // console.log("DATA",data);

  let invoice = data.invoice;
  let copyLinkLabel = 'Copy Link';

  const printInvoice = () => {
    window.print();
  };
  const copyLink = () => {
    navigator.clipboard.writeText($page.url.href);
    copyLinkLabel = 'Copied!';
    setTimeout(() => {
      copyLinkLabel = 'Copy Link';
    }, 1250);
  };
  const payInvoice = () => {
    //
  };
  const sendInvoice = () => {
    //
  };

  onMount(() => {
    loadSettings();
  });
</script>

<!-- Header -->
<div class="fixed z-0 mb-16 flex flex-col md:flex-row gap-y-4 w-full max-w-screen-lg justify-between px-4 lg:px-0 print:hidden">
  <h1 class="text-3xl font-bold text-daisyBush ">Invoice</h1>
  <div class="flex flex-wrap items-center sm:gap-4 gap-2 sm:flex-nowrap">
    <Button
      height="short"
      label="Print"
      style="outlined"
      isAnimated={false}
      onButtonClick={printInvoice}
    />
    <Button
      height="short"
      label={copyLinkLabel}
      isAnimated={false}
      onButtonClick={copyLink}
      className="sm:min-w-[168px] min-w-[100px] justify-center"
    />
    <Button height="short" label="Send Invoice" isAnimated={false} onButtonClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" isAnimated={false} onButtonClick={payInvoice} />
  </div>
</div>
<!-- Content -->
<div
  class="relative top-32 z-10 grid grid-cols-6 gap-x-4 gap-y-8 bg-white md:py-16 md:px-32 shadow-invoice p-4 print:shadow-none print:top-0 print:z-0 print:grid-cols-1 print:py-0 print:px-0 print:bg-transparent"
>
  <div class="col-span-6 sm:col-span-3 print:col-span-3">
    <img src="/images/logo.png" srcset="/images/logo@2x.png 2x, /images/logo.png 1x" alt="logo" />
  </div>
  <div class="sm:col-span-2 sm:col-start-5 col-span-6 pt-4 print:col-span-3">
    <div class="label">From</div>
    <p>
      {#if $settings}
        <span>{$settings.myName}</span><br />
        <span>{$settings.street}</span><br />
        <span>{$settings.city}</span><br />
        <span>{$settings.state}</span><br />
        <!-- <span>{$settings.Zip}</span><br /> -->
        <!-- <span>{$settings.Email}</span><br /> -->
      {:else}
        <div class="center min-h-[68px] rounded bg-gallery">
          <a class="text-stone-600 underline hover:no-underline " href="#"
            >Add your contact Information</a
          >
        </div>
      {/if}
    </p>
  </div>
  <div class="sm:col-span-3 col-span-6 print:col-span-3">
    <div class="label">Bill To</div>
    <p>
      <span>{invoice.client.name}</span><br />
      <span>{invoice.client.street}</span><br />
      <span>{invoice.client.city}, {invoice.client.state} {invoice.client.zip}</span><br />
      <span>{invoice.client.email}</span>
    </p>
  </div>
  <div class="sm:col-span-2 sm:col-start-5 col-span-6 print:col-span-3">
    <div class="label">Invoice ID</div>
    <p>
      Invoice #<span>{invoice.invoiceNumber}</span><br />
    </p>
  </div>
  <div class="col-span-3">
    <div class="label">Due Date</div>
    <p>
      <span>{convertDate(invoice.dueDate)}</span><br />
    </p>
  </div>
  <div class="col-span-3 sm:col-span-2 sm:col-start-5">
    <div class="label">Issue Date</div>
    <p>
      <span>{convertDate(invoice.issueDate)}</span><br />
    </p>
  </div>
  <div class="subject col-span-6">
    <div class="label">Subject</div>
    <p>
      <span>{invoice.subject}</span><br />
    </p>
  </div>

  <!-- Line Items -->
  <div class="col-span-6">
    <LineItemRows lineItems={invoice.lineItems} isEditable={false} discount={invoice.discount} />
  </div>

  {#if invoice.notes}
    <div class="col-span-6">
      <div class="label">Notes</div>
      <SvelteMarkdown source={invoice.notes} />
    </div>
  {/if}
  {#if invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms and conditions</div>
      <SvelteMarkdown source={invoice.terms} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
