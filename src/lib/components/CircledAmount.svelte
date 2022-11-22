<script lang="ts">
	export let label: string;
	export let amount: string;
</script>

<div class="min-h-24 min-w-64 center float-right bg-circle bg-no-repeat">
	<div class="mr-4 font-sansSerif font-bold" >{label}</div>
	<div class="font-mono font-bold text-xl ">{amount}</div>
</div>
