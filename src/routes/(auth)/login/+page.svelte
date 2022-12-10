<script lang="ts">
  let email: string;
  let password: string;
</script>

<h1 class="mb-4 text-[2.5rem] font-black text-goldenFizz">Login</h1>
<form action="">
  <div class="field">
    <label for="email" class="text-goldenFizz ">Email Address</label>
    <input type="text" id="email" name="email" placeholder="Email" required bind:value={email} />
  </div>
  <div class="field">
    <div class="flex justify-between">
      <label for="password" class="text-goldenFizz ">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
        >Forgot password?</a
      >
    </div>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Your Password"
      required
      bind:value={password}
    />
  </div>
    <div class="field">
        <button type="submit" class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue text-daisyBush p-4 text-xl font-bold hover:shadow-lg transition-shadow duration-200">Login</button>
        <p class="mt-4 text-center text-sm text-white">
            <a href="/signup" class="underline hover:no-underline ">Don't have account yet?</a>
        </p>
    </div>
</form>
