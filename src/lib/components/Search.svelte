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
    class=" search w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base lg:text-xl text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] lg:w-72"
  />
  <button class="font-sansSerif text-base lg:text-xl font-black text-pastelPurple">Search</button>
</div>
