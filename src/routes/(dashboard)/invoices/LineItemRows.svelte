<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LineItemRow from './LineItemRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import { centsToDollars, sumLineItems, twoDecimals } from '$lib/utils/moneyHelers';
  
  let dispatch = createEventDispatcher();
  export let lineItems: LineItem[] | undefined = undefined;
  export let discount: number = 0;

  let subtotal: number = 0;
  let discountedAmount: number = 0;
  let total: number = 0;

  // $: console.log('sub', subtotal, 'disc', discountedAmount, 'tot', total);

  // subtotal in cents
  $: if (sumLineItems(lineItems) > 0) {
    subtotal = sumLineItems(lineItems);
  }
  // update discount value based on perCent in cents
  $: if (subtotal >= 0) {
    discountedAmount = sumLineItems(lineItems) * (discount / 100);
  }
  // Number is returning correct price after discount in cents
  $: total = Number(subtotal) - Number(discountedAmount) || 0;
</script>

<!-- header -->
<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit Price</div>
  <div class="table-header text-right">Qyt</div>
  <div class="table-header text-right">Amount</div>
</div>
<!-- Lines -->
{#if lineItems}
  <!-- apply isRequired ONLY for first line (set on LineItemRow)-->
  {#each lineItems as lineItem, idx}
    <LineItemRow
      {lineItem}
      on:removeLineItem
      canDelete={idx > 0}
      on:updateLineItem
      isRequired={idx === 0}
    />
  {/each}
{/if}

<!-- sum -->
<div class="invoice-line-item">
  <div class="col-span-2">
    <Button
      label="add line"
      style="textOnly"
      onButtonClick={() => {
        dispatch('addLineItem');
      }}
      isAnimated={false}
    />
  </div>
  <div class="py-4 text-right font-bold text-monsoon ">Subtotal</div>
  <div class="py-4 text-right font-mono">${centsToDollars(subtotal)}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 py-4 text-right font-bold text-monsoon">Discount</div>
  <div class="relative">
    <input
      class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none"
      type="number"
      name="discount"
      min="0"
      max="100"
      bind:value={discount}
      on:change={() => {
        dispatch('updateDiscount', {discount});
      }}
    />
    <span class="text-mono absolute right-0 top-2">%</span>
  </div>
  <div class="py-4 text-right font-mono">${discountedAmount ? centsToDollars(discountedAmount): "0.00"}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircledAmount label="Total:" amount={`$${centsToDollars(total)}`} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply text-sm font-bold text-daisyBush;
  }
</style>
