<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import LineItemRow from './LineItemRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import { centsToDollars, sumLineItems, twoDecimals } from '$lib/utils/moneyHelers';
  export let lineItems: LineItem[] | undefined = undefined;

  let subtotal: string = '0.00';
  let discount: number = 0;
  let discountedAmount: string = '0.00';
  let total: string = '0.00';
  let dispatch = createEventDispatcher();

  $: if (sumLineItems(lineItems) > 0) {
    subtotal = centsToDollars(sumLineItems(lineItems));
  }
  // update dsiount value based on perCent
  $: if (subtotal !== '0.00') {
    discountedAmount = centsToDollars(sumLineItems(lineItems) * (discount / 100));
  }
  $: total = twoDecimals(((parseInt(subtotal) - parseInt(discountedAmount)) * 100)/100);
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
    <LineItemRow {lineItem} on:removeLineItem canDelete={idx > 0} on:updateLineItem isRequired={idx === 0}/>
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
  <div class="py-4 text-right font-mono">${subtotal}</div>
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
    />
    <span class="text-mono absolute right-0 top-2">%</span>
  </div>
  <div class="py-4 text-right font-mono">${discountedAmount}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircledAmount label="Total:" amount={`$${total}`} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply text-sm font-bold text-daisyBush;
  }
</style>
