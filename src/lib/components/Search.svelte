<script lang="ts">
  import Magnifyglass from '$lib/components/Icon/Magnifyglass.svelte';
  // come stuff here
</script>

<div class="relative flex w-full items-baseline">
  <div class="mr-2 mt-auto text-pastelPurple">
    <Magnifyglass />
  </div>
  <input
    type="text"
    name="search"
    id=""
    placeholder="Search by keyword"
    class="w-72 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-xl text-black outline-none focus:border-solid focus:border-b-lavenderIndigo"
  />
  <button class="font-sansSerif text-xl font-black text-pastelPurple">Search</button>
</div>
