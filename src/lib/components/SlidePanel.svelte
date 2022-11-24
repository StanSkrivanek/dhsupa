<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from '$lib/components/Overlay.svelte';
  import ArrowBack from './Icon/ArrowBack.svelte';

  const dispatch = createEventDispatcher();
</script>

<!-- close modal on `escape` -->
<svelte:window on:keydown={(e)=>{
  if (e.key === 'Escape') {
    dispatch('closePanel');
  }
}} />
<Portal>
  <Overlay />
  <div
    class="fixed right-0 top-0 z-slidePanel h-screen w-3/4 bg-white py-20 px-32 shadow-slidePanel"
  >
    <button
      class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
      on:click={() => {
        dispatch('closePanel');
      }}
    >
      <ArrowBack /></button
    >
    <slot />
  </div>
</Portal>
