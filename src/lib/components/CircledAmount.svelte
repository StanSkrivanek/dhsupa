<script lang="ts">
  export let label: string;
  export let amount: string;
</script>

<div class="price-total center float-right min-h-24 min-w-64 bg-circle bg-no-repeat ">
  <div class="mr-4 font-sansSerif font-bold">{label}</div>
  <div class="font-mono text-xl font-bold mr-4">{amount}</div>
</div>
