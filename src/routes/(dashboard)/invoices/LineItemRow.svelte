<script lang="ts">
  import Trash from '$lib/components/Icon/Trash.svelte';
</script>

<!-- Structure -->
<div class="invoice-line-item border-b-2 border-fog py-2">
  <div>
    <input class="line-item" type="text" name="description" />
  </div>
  <div>
    <input class="line-item text-right" type="number" name="unitPrice" step="0.01" min="0" />
  </div>
  <div>
    <input class="line-item text-center" type="number" name="quantity" min="0" />
  </div>
  <div>
    <input class="line-item text-right" type="number" name="amount" step="0.01" min="0" />
  </div>
  <div>
    <button class="center h-10 w-10 text-pastelPurple hover:text-lavenderIndigo" type="button">
      <Trash />
    </button>
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
</style>