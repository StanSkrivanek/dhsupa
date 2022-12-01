<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>404</title>
</svelte:head>

<div class="center h-screen w-screen bg-error_404   text-center bg-cover">
  <div>
    <h1 class=" text-[6rem] md:text-[12rem] font-black leading-none text-daisyBush">{$page.status}</h1>
    <h2 class=" text-[3.5rem] font-black leading-none text-daisyBush mb-2">Sorry</h2>
    <p class="  text-daisyBush text-2xl">{$page.error?.message}</p>
  </div>
</div>
