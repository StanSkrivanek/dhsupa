<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import LineItemRows from './LineItemRows.svelte';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  const blankLineItem = {
    id: uuidv4(),
    description: '',
    unitPrice: 0,
    quantity: 0,
    amount: 0
  };

  let lineItems: LineItem[] = [{ ...blankLineItem }];

  const addLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: uuidv4() }];
  };
  const deleteLineItem = (event: any) => {
    lineItems = lineItems.filter((item) => item.id !== event.detail);
  };
  const UpdateLineItem = () => {
    lineItems = lineItems;
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush ">Add an Invoice</h2>

<form action="" class="grid grid-cols-6 gap-x-5">
  <!-- client -->
  <div class=" field col-span-2">
    <label for="client">Client</label>
    <select name="client" id="client">
      <option value="cname">Client Name</option>
    </select>
  </div>
  <div class="field col-span-2 flex items-end gap-x-5">
    <div class=" text-base font-bold leading-[3.5rem] text-monsoon">or</div>
    <Button label="add client" onButtonClick={() => {}} style="outlined" isAnimated={false} />
  </div>
  <!-- invoice ID -->
  <div class="field col-span-2 ">
    <label for="id">InvoiceId</label>
    <input type="number" name="id" id="" />
  </div>
  <!-- dueDate -->
  <div class="field col-span-2 ">
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" id="" />
  </div>

  <!-- issue date -->
  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue Date</label>
    <input type="date" name="issueDate" id="" />
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
    <Button label="Save" onButtonClick={() => {}} isAnimated={false} />
  </div>
</form>
