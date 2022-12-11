<script>

</script>

<h1 class="auth-heading">
    <span class="auth-heading__title">Sign up</span>
    <!-- <span class="auth-heading__subtitle">Create a new account</span> -->
</h1>

<form action="">
    <div class="field">
        <label for="fullname" class="text-goldenFizz">Full Name</label>
        <input type="text" name="fullname" id="fullname" required/>
    </div>
    <div class="field">
        <label for="email" class="text-goldenFizz">Email</label>
        <input type="email" name="email" id="email" required/>
    </div>
    <div class="field">
        <label for="password" class="text-goldenFizz">Password</label>
        <input type="password" name="password" id="password" class="auth-form__input" />
    </div>
    <div class="field">
        <label for="confirm-password" class="text-goldenFizz">Confirm Password</label>
        <input type="password" name="confirm-password" id="confirm-password" class="auth-form__input" />
    </div>
  <div class="field">
    <button
      type="submit"
      class="auth-btn "
      >Sign up</button
    >
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline ">Login if you have an account</a>
    </p>
  </div>
</form>