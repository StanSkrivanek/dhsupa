<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { snackbar } from '$lib/stores/SnackbarStore';
  import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
  import { deleteInvoice } from '$lib/stores/InvoiceStore';
  import Modal from '$lib/components/Modal.svelte';
  import Button from '$lib/components/Button.svelte';
  export let invoice: Invoice;
  export let isModalShowing = false;

  let dispatch = createEventDispatcher();
</script>

<Modal isVisible={isModalShowing} on:close>
  <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
    <div class="text-center text-xl font-bold text-daisyBush">
      Are you sure you want to delete invoice to <span class="text-scarlet"
        >{invoice.client.name}</span
      >
      for
      <span class="text-scarlet"> ${centsToDollars(sumLineItems(invoice.lineItems))}</span>?
    </div>
    <div class="flex gap-4">
      <Button
        label="cancel"
        style="secondary"
        onButtonClick={() => {
          dispatch('close');
        }}
        isAnimated={false}
      />
      <Button
        label="delete"
        style="destructive"
        onButtonClick={() => {
          deleteInvoice(invoice);
          dispatch('close');
          snackbar.send({ message: 'Invoice was deleted', type: 'success' });
        }}
        isAnimated={false}
      />
    </div>
  </div>
</Modal>
