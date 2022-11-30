<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDate } from '$lib/utils/dateHelpers';
  export let data: { invoice: Invoice };
  // console.log("DATA",data);

  let invoice = data.invoice;
  const printInvoice = () => {
    // window.print();
  };
  const copyLink = () => {
    // window.print();
  };
  const payInvoice = () => {
    // window.print();
  };
  const sendInvoice = () => {
    // window.print();
  };
</script>

<!-- Header -->
<div class=" fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
  <h1 class="text-3xl font-bold text-daisyBush ">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button
      height="short"
      label="Print"
      style="outlined"
      isAnimated={false}
      onButtonClick={printInvoice}
    />
    <Button height="short" label="Copy Link" isAnimated={false} onButtonClick={copyLink} />
    <Button height="short" label="Send Invoice" isAnimated={false} onButtonClick={sendInvoice} />
    <Button height="short" label="Pay Invoice" isAnimated={false} onButtonClick={payInvoice} />
  </div>
</div>
<!-- Content -->
<div
  class="relative top-32 z-10 grid grid-cols-6 gap-x-4 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
  <div class="col-span-3">
    <img src="/images/logo.png" srcset="/images/logo@2x.png 2x, /images/logo.png 1x" alt="logo" />
  </div>
  <div class="col-span-2 col-start-5 pt-4">
    <div class="label">From</div>
    <p>
      <span>FineDiv Studio</span><br />
      <span>Address</span><br />
      <span>City, State, Zip</span><br />
      <span>Phone</span><br />
      <span>finedivstudio@gmail.com</span><br />
    </p>
  </div>
  <div class="col-span-3">
    <div class="label">Bill To</div>
    <p>
      <span>{invoice.client.name}</span><br />
      <span>{invoice.client.street}</span><br />
      <span>{invoice.client.city}, {invoice.client.state} {invoice.client.zip}</span><br />
      <span>{invoice.client.email}</span>
    </p>
  </div>
  <div class="col-span-2 col-start-5 ">
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
  <div class="col-span-2 col-start-5">
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
  <div class="col-span-6">LINE ITEMS</div>

  {#if invoice.notes}
    <div class="col-span-6">
      <div class="label">Notes</div>
      <p>
        {invoice.notes}
      </p>
    </div>
  {/if}
  {#if invoice.terms}
    <div class="col-span-6">
      <div class="label">Terms and conditions</div>
      <p>
        {invoice.terms}
      </p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply font-black text-monsoon;
  }
</style>
