<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { twoDecimals, dollarsToCents } from '$lib/utils/moneyHelers';

  export let lineItem: LineItem;
  export let canDelete: boolean = false;

  let dispatch = createEventDispatcher();
  let unitPrice: string = twoDecimals(lineItem.amount / lineItem.quantity);
  let amount = twoDecimals(lineItem.amount);
  // chamge values on the fly reactivly
  $: {
    amount = twoDecimals(lineItem.quantity * Number(unitPrice));
    lineItem.amount = dollarsToCents(Number(amount));
  }
</script>

<!-- Structure -->
<div class="invoice-line-item border-b-2 border-fog py-2">
  <div>
    <input class="line-item" type="text" name="description" bind:value={lineItem.description} />
  </div>
  <div>
    <input
      class="line-item text-right"
      type="number"
      name="unitPrice"
      step="0.01"
      min="0"
      bind:value={unitPrice}
      on:blur={() => {
        unitPrice = twoDecimals(Number(unitPrice));
      }}
    />
  </div>
  <div>
    <input
      class="line-item text-right"
      type="number"
      name="quantity"
      min="0"
      bind:value={lineItem.quantity}
    />
  </div>
  <div>
    <input
      class="line-item text-right"
      type="number"
      name="amount"
      step="0.01"
      min="0"
      bind:value={amount}
      disabled
    />
  </div>
  <div>
    {#if canDelete}
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
</style>
