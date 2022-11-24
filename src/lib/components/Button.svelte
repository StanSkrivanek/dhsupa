<script lang="ts">
  import type { SvelteComponent } from 'svelte'; // for adding icons to button
  export let label: string;
  export let isAnimated = true;
  export let style: 'primary' | 'secondary' | 'destructive' | 'outlined' | 'textOnly' = 'primary';
  export let onButtonClick: () => void;
  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
  // export let className: string;
  // export let type: string = 'button';
  // export let disabled: boolean = false;
</script>

<button
  class=" flex items-center relative whitespace-nowrap rounded-md px-5 py-2 font-sansSerif text-base font-black  lg:px-10 lg:py-3 lg:text-xl"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
  class:outlined={style === 'outlined'}
  class:textOnly={style === 'textOnly'}
  class:isAnimated
  on:click|preventDefault={() => onButtonClick()}
>
  {#if iconLeft}
    <svelte:component this={iconLeft} class="ml-2" />
  {/if}
  {label}
  {#if iconRight}
    <svelte:component this={iconRight} class="ml-2" />
  {/if}
</button>

<style lang="postcss">
  .isAnimated {
    @apply translate-y-0 shadow-colored transition-all duration-300 ease-in-out;
  }
  .isAnimated:hover {
    @apply -translate-y-0.5 shadow-coloredHover;
  }

  .primary {
    @apply bg-lavenderIndigo text-white;
  }

  .secondary {
    @apply bg-gallery text-daisyBush;
  }

  .destructive {
    @apply bg-scarlet text-goldenFizz;
  }
  .outlined {
    @apply border-2 border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
  }
  .textOnly {
    @apply bg-transparent px-0 text-scarlet underline hover:no-underline;
  }
</style>
