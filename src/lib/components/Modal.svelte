<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '$lib/actions/ClickOutside';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from './Overlay.svelte';
  import Close from './Icon/Close.svelte';

  export let isVisible = false;
  const dispatch = createEventDispatcher();
</script>

<!-- close modal on `escape` -->
<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

{#if isVisible}
  <Portal>
    <Overlay className="!z-modalOverlay" />
    <div class="center fixed inset-0 z-modal">
      <div
        class="relative min-h-[230px] w-full max-w-[450px] rounded bg-white px-10 py-7 "
        use:clickOutside={() => dispatch('close')}
      >
        <button
          class="absolute right-4 top-4 text-pastelPurple hover:text-daisyBush"
          on:click={() => dispatch('close')}
        >
          <Close /></button
        >
        <slot><!-- optional fallback --></slot>
      </div>
    </div>
  </Portal>
{/if}
