<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { twoDecimals, dollarsToCents, centsToDollars } from '$lib/utils/moneyHelpers';

  export let lineItem: LineItem;
  export let canDelete: boolean = false;
  export let isRequired: boolean = false;
  export let isEditable: boolean = true;
  let dispatch = createEventDispatcher();
  let unitPrice: string = centsToDollars(lineItem.amount / lineItem.quantity);
  let amount = centsToDollars(lineItem.amount);

  $: {
    amount = twoDecimals(lineItem.quantity * Number(unitPrice));
    lineItem.amount = dollarsToCents(Number(amount));
  }
</script>

<!-- Structure -->
<div class="invoice-line-item border-b-2 border-fog py-4 sm:py-2">
  <div class="description">
    <label for="description" class="line-item-label">Description</label>
    <input
      class="line-item"
      type="text"
      name="description"
      bind:value={lineItem.description}
      required={isRequired}
      disabled={!isEditable}
    />
  </div>
  <div class="unitPrice">
    <label for="unitPrice" class="line-item-label">Unit Price</label>
    <input
      class="line-item sm:text-right"
      type="number"
      name="unitPrice"
      step="0.01"
      min="0"
      bind:value={unitPrice}
      on:blur={() => {
        unitPrice = twoDecimals(Number(unitPrice));
        dispatch('updateLineItem', lineItem);
      }}
      required={isRequired}
        disabled={!isEditable}
    />
  </div>
  <div class="quantity">
    <!-- TODO: quantity 0 is considered as init value and required is fulfilled on form load. Form can be submitted with Qty 0 FIX: make quantity to be empty on form load-->
    <label for="quantity" class="line-item-label">Qty</label>
    <input
      class="line-item sm:text-right"
      type="number"
      name="quantity"
      min="0"
      bind:value={lineItem.quantity}
      on:blur={() => {
        dispatch('updateLineItem', lineItem);
      }}
      required={isRequired}
        disabled={!isEditable}
    />
  </div>
  <div class="amount">
    <label for="amount" class="line-item-label">Amount</label>
    <input
      class="line-item sm:text-right"
      type="number"
      name="amount"
      step="0.01"
      min="0"
      bind:value={amount}
      disabled
    />
  </div>
  <div class="trash">
    {#if canDelete && isEditable}
      <button
        class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo"
        type="button"
        on:click|preventDefault={() => dispatch('removeLineItem', lineItem.id)}
      >
        <Trash />
      </button>
    {/if}
  </div>
</div>

<style lang="postcss">
  input[type='text'],
  input[type='number'] {
    @apply h-10 w-full border-b-2 border-dotted border-stone-300;
  }
  input[type='text'] {
    @apply font-sansSerif text-xl font-bold;
  }
  input[type='number'] {
    @apply font-mono text-base;
  }
  input[type='number']:focus,
  input[type='text']:focus {
    @apply border-solid border-lavenderIndigo outline-none;
  }
  input[type='text']:disabled,
  input[type='number']:disabled {
    @apply border-b-0 bg-transparent px-0;
  }
  .line-item-label {
    @apply block sm:hidden text-stone-500 font-sansSerif text-sm font-bold;
  }
</style>
