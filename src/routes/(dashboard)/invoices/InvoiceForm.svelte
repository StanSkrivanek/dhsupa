<script lang="ts">
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { slide } from 'svelte/transition';
  import LineItemRows from './LineItemRows.svelte';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { states } from '$lib/utils/states';
  import { clients, loadClients } from '$stores/ClientStore';
  import { today } from '$lib/utils/dateHelpers';

  const blankLineItem = {
    id: uuidv4(),
    description: '',
    unitPrice: 0,
    quantity: 0,
    amount: 0
  };

  let lineItems: LineItem[] = [{ ...blankLineItem }];
  let isNewClient = false;

  const addLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: uuidv4() }];
  };
  const deleteLineItem = (event: any) => {
    lineItems = lineItems.filter((item) => item.id !== event.detail);
  };
  const UpdateLineItem = () => {
    lineItems = lineItems;
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush ">Add an Invoice</h2>

<form action="" class="grid grid-cols-6 gap-x-5">
  <!-- client -->
  <div class=" field col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-4">
        <select name="client" id="client" required={!isNewClient}>
          <option>Select a client</option>
          {#each $clients as client}
            <!-- content here -->
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>

        <div class=" text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button
          label="add client"
          onButtonClick={() => {
            isNewClient = true;
          }}
          style="outlined"
          isAnimated={false}
        />
      </div>
    {:else}
      <!-- show other form fields-->
      <label for="newclient">New Client</label>
      <div class="flex items-end gap-x-4">
        <input type="text" name="newclient" id="newclient" placeholder="Client Name" required={isNewClient} />
        <div class=" text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button
          label="Existing Client"
          onButtonClick={() => {
            isNewClient = false;
          }}
          style="outlined"
          isAnimated={false}
        />
      </div>
    {/if}
  </div>

  <!-- invoice ID -->
  <div class="field col-span-2 ">
    <label for="invoiceNr">Invoice Nr</label>
    <input type="number" name="invoiceNr" id="" required />
  </div>

  <!-- new client details -->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-4" transition:slide>
      <div class=" field col-span-6">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required={isNewClient}/>
      </div>
      <div class="field col-span-6">
        <label for="street">Street</label>
        <input type="text" name="street" id="street" />
      </div>
      <div class="field col-span-2">
        <label for="city">City</label>
        <input type="text" name="city" id="city" />
      </div>
      <div class="field col-span-2">
        <label for="state">State</label>
        <select name="state" id="state">
          <option />
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>
      <div class="field col-span-2">
        <label for="postcode">Post Code</label>
        <input type="text" name="postcode" id="postcode" />
      </div>
    </div>
  {/if}
  <!-- dueDate -->
  <div class="field col-span-2 ">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" id="" min={today} required />
  </div>

  <!-- issue date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" id="" min={today} />
  </div>
  <!-- subject -->
  <div class="field col-span-6 ">
    <label for="subject">Subject</label>
    <input type="text" name="subject" id="" />
  </div>

  <!-- line Items -->
  <div class="field col-span-6 ">
    <!-- <label for="lineItems">Line Items</label> -->
    <LineItemRows
      {lineItems}
      on:addLineItem={addLineItem}
      on:removeLineItem={deleteLineItem}
      on:updateLineItem={UpdateLineItem}
    />
  </div>

  <!-- notes -->
  <div class="field col-span-6 ">
    <label for="notes"
      >Notes <span class="font-normal">(optional, displayed on invoice)</span></label
    >
    <textarea name="notes" id="notes" />
  </div>
  <!-- terms -->
  <div class="field col-span-6 ">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
    >
    <textarea name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italic_</em>, <code>`code`</code>,
      <del>~strikethrough~</del>
    </div>
  </div>
  <!-- buttons -->
  <!-- show delete btn only in EDIT mode -->
  <div class="field col-span-2">
    <Button
      style="textOnlyDestructive"
      label="Delete"
      onButtonClick={() => {}}
      isAnimated={false}
      iconLeft={Trash}
    />
  </div>
  <div class="field col-span-4 flex justify-end gap-x-4">
    <Button style="secondary" label="Cancel" onButtonClick={() => {}} isAnimated={false} />
    <!-- <Button label="Save" onButtonClick={() => {}} isAnimated={false} /> -->
    <button
      type="submit"
      class="button translate-y-0 bg-lavenderIndigo text-white shadow-colored transition-all duration-300 ease-in-out"
      >save</button
    >
  </div>
</form>
