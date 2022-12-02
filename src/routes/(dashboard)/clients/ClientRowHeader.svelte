<script lang="ts">
  export let className = '';
</script>

<div class={`table-header client-table hidden lg:grid lg:px-6 ${className}`}>
  <h3>Status</h3>
  <h3>Client</h3>
  <h3 class="text-right">Recieved</h3>
  <h3 class="text-right">Balance</h3>
  <div />
  <div />
</div>

<style lang="postcss">
  .table-header h3 {
    @apply font-sansSerif text-xl font-black leading-snug text-daisyBush;
  }
</style>
