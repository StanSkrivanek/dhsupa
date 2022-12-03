<script lang="ts">
  import { onMount } from 'svelte';
  import { clients, loadClients } from '$lib/stores/ClientStore';
  import Search from '$lib/components/Search.svelte';
  import Button from '$lib/components/Button.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientRow from './ClientRow.svelte';
  import BlankState from '../invoices/BlankState.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
    import ClientForm from './ClientForm.svelte';
  
  let isClientFormShowing: boolean = false;

  const closePanel = () => {
    isClientFormShowing = false;
  };


  onMount(() => {
    loadClients();
    // console.log($clients);
  });
</script>

<svelte:head>
  <title>Client</title>
</svelte:head>

<div
  class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center lg:mb-16"
>
  {#if $clients.length > 0}
    <Search />
  {:else}
    <div />
  {/if}
  <div>
    <Button
      label="Add Client"
      onButtonClick={() => {
        isClientFormShowing = true;
      }}
    />
  </div>
</div>

<!-- clients -->

<div>
  {#if $clients === null}
    loading ...
  {:else if $clients.length <= 0}
    <!-- <div class="text-center text-gray-500">No clients yet</div> -->
    <BlankState />
  {:else}
    <!-- client header row -->
    <ClientRowHeader />
    <!-- client row -->
    {#each $clients as client}
      <div class="">
        <ClientRow {client} />
      </div>
    {/each}
  {/if}
</div>

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel}/>
  </SlidePanel>
{/if}

