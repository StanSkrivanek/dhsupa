<script lang="ts">
  export let label: string;
  export let isAnimated = true;
  export let style: 'primary' | 'secondary' | 'destructive' = 'primary';
  export let onButtonClick: () => void;
  // export let className: string;
  // export let type: string = 'button';
  // export let disabled: boolean = false;
</script>

<button
  class="relative whitespace-nowrap rounded-md px-5 py-2 font-sansSerif text-base font-black  lg:px-10 lg:py-3 lg:text-xl"
  class:primary={style === 'primary'}
  class:secondary={style === 'secondary'}
  class:destructive={style === 'destructive'}
  class:isAnimated
  on:click|preventDefault={() => onButtonClick()}
>
  {label}</button
>

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
</style>
