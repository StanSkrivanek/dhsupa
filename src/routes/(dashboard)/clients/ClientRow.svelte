<script lang="ts">
  import Eye from '$lib/components/Icon/Eye.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
  import Activate from '$lib/components/Icon/Activate.svelte';
  import Archive from '$lib/components/Icon/Archive.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';
  import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
  import { clickOutside } from '$lib/actions/ClickOutside';

  export let client: Client;
  // console.log({ client });
  let isAdditionalMenuShowing = false;
  let isClientFormShowing = false;
  //   let isOptionsDisabled = false;
  //   let isModalShowing = false;

  const receivedInvoices = () => {
    if (client?.invoices) {
      // get invoices that have been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
      //   get the sum of all paid invoices
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };
  const balanceInvoices = () => {
    if (client?.invoices) {
      // get invoices that have NOT been paid
      const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');
      //   get the sum of all unpaid invoices
      return sumInvoices(paidInvoices);
    } else {
      return 0;
    }
  };

  const toggleAdditionalMenu = () => {
    isAdditionalMenuShowing = !isAdditionalMenuShowing;
  };
  const handleEdit = () => {
    isClientFormShowing = true;
    isAdditionalMenuShowing = false;
  };
  const handleActivate = () => {
    client.clientStatus = 'active';
    isAdditionalMenuShowing = false;
  };
  const handleArchive = () => {
    client.clientStatus = 'archive';
    isAdditionalMenuShowing = false;
  };
  const handleDelete = () => {
    // isModalShowing = true;
    isAdditionalMenuShowing = false;
  };

  const closePanel = () => {
    isClientFormShowing = false;
  };
</script>

<div class="client-row client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div class="status"><Tag className="ml-auto" label={client.clientStatus} /></div>
  <div class="client-name truncate whitespace-nowrap text-base lg:text-xl">{client.name}</div>
  <div class="received text-right font-mono text-sm font-bold lg:text-lg">
    ${centsToDollars(receivedInvoices())}
  </div>
  <div class="balance text-right font-mono text-sm font-bold text-scarlet lg:text-lg">
    ${centsToDollars(balanceInvoices())}
  </div>
  <div class=" viewBtn hidden text-sm lg:block ">
    <a href={`/clients/${client.id}`} class="center text-pastelPurple hover:text-daisyBush"
      ><Eye /></a
    >
  </div>
  <div
    class=" moreBtn relative hidden text-sm lg:block"
    use:clickOutside={() => (isAdditionalMenuShowing = false)}
  >
    <button class="center text-pastelPurple hover:text-daisyBush" on:click={toggleAdditionalMenu}
      ><ThreeDots /></button
    >
    {#if isAdditionalMenuShowing}
      <AdditionalOptions
        options={[
          { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: false },
          {
            label: 'Activate',
            icon: Activate,
            onClick: handleActivate,
            disabled: client.clientStatus === 'active'
          },
          {
            label: 'Archive',
            icon: Archive,
            onClick: handleArchive,
            disabled: client.clientStatus === 'archive'
          },
          { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false }
        ]}
      />
    {/if}
  </div>
</div>

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm {closePanel} formState="edit" {client} />
  </SlidePanel>
{/if}

<style lang="postcss">
  .client-row {
    grid-template-areas:
      'clientName status'
      'received balance';
    row-gap: 0.5rem;
  }
  @media (min-width: 1024px) {
    .client-row {
      grid-template-areas: 'status clientName received balance view more';
    }
  }
  .client-name {
    grid-area: clientName;
  }
  .status {
    grid-area: status;
  }
  .received {
    grid-area: received;
    @apply text-left lg:text-right;
  }
  .received:before {
    @apply block text-xs lg:hidden;
    content: 'Received: ';
  }
  .balance {
    grid-area: balance;
  }
  .balance:before {
    @apply block text-xs lg:hidden;
    content: 'Balance';
  }
  .viewBtn {
    grid-area: view;
  }
  .moreBtn {
    grid-area: more;
  }
</style>
