<script lang="ts">
  import { onMount } from 'svelte';
  import { states } from '$lib/utils/states';
  import { loadSettings, settings } from '$lib/stores/SettingsStore';
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Button from '$lib/components/Button.svelte';
  import Check from '$lib/components/Icon/Check.svelte';

  let mySettings: Settings = {} as Settings;

  onMount(() => {
    loadSettings();
    mySettings = { ...$settings };
  });
</script>

<div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16 ">
  <Snackbar />
  <Navbar />
  <main
    class="col-span-12 px-4 pt-4 md:col-span-8 md:col-start-4 md:pt-20 lg:col-span-6 lg:col-start-5"
  >
    <h2>Invoice Details</h2>
    <p class="mb-8">This information gets displayed on each invoice.</p>
    <form action="" class="grid grid-cols-6 gap-x-5">
      <div class="field col-span-6 lg:col-span-3">
        <label for="fName">First Name</label>
        <input type="text" id="fName" name="fName" bind:value={mySettings.myName}/>
      </div>
      <!-- <div class="field col-span-6 lg:col-span-3">
        <label for="lName">Last Name</label>
        <input type="text" id="lName" name="lName" bind:value={mySettings.myName}/>
      </div> -->
      <div class="field col-span-6">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" bind:value={mySettings.street} />
      </div>
      <div class="field col-span-6 lg:col-span-2">
        <label for="city">City</label>
        <input type="text" id="city" name="city"bind:value={mySettings.city} />
      </div>
      <div class="field col-span-6 lg:col-span-2">
        <label for="state">State</label>
        <select id="state" name="state" bind:value={mySettings.state}>
          <option />
          {#each states as state}
            <option value={state.value}>{state.name}</option>
          {/each}
        </select>
      </div>
      <div class="field col-span-6 lg:col-span-2">
        <label for="zip">Zip</label>
        <input type="text" id="zip" name="zip" placeholder="Zip" bind:value={mySettings.zip} />
      </div>
      <div class="field col-span-6 flex justify-end">
        <Button label="save" isAnimated={false} onButtonClick={() => {}} iconLeft={Check} />
      </div>
    </form>
    <div class="col-span-6">
      <h2>Update Account Information</h2>
      <p class="mb-8">This information is used to access your account.</p>
    </div>
    <form action="" class="grid grid-cols-6 gap-x-5">
      <div class="field col-span-6 lg:col-span-3">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" />
      </div>
      <div class="field col-span-6 lg:col-span-3">
        <label for="curPass">Current Password</label>
        <input type="password" id="curPass" name="curPass" />
      </div>
      <div class="field col-span-6 lg:col-span-3">
        <label for="newPass">New Password</label>
        <input type="password" id="newPass" name="newPass" />
      </div>
      <div class="field col-span-6 lg:col-span-3">
        <label for="confirmPass">Confirm Password</label>
        <input type="password" id="confirmPass" name="confirmPass" />
      </div>

      <div class="field col-span-6 flex justify-end">
        <Button label="save" isAnimated={false} onButtonClick={() => {}} iconLeft={Check} />
      </div>
    </form>
  </main>
</div>

<style lang="postcss">
  h2 {
    @apply mb-4 text-3xl font-black text-daisyBush;
  }
</style>
