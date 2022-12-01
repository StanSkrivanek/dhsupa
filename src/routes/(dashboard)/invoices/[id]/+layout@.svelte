<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import ArrowBack from '$lib/components/Icon/ArrowBack.svelte';
  let previousPage: string | undefined = undefined;

  afterNavigate((navigation) => {
    previousPage = navigation?.from?.url?.pathname;
  });
</script>

<svelte:window
  on:keydown={(evt) => {
    if (evt.key === 'Escape') {
      goto(previousPage || '/invoices');
    }
  }}
/>

<div class="h-full min-h-screen w-screen bg-whisper pt-16 lg:pt-12 pb-32">
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <a href={previousPage ? previousPage : '/invoices'} class="fixed left-7 top-7 text-pastelPurple"
      ><ArrowBack /></a
    >
    <slot><!-- optional fallback --></slot>
  </main>
</div>
