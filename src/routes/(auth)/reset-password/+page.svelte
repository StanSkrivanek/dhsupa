<h1 class="auth-heading">
    <span class="auth-heading__title">Reset Password</span>
    <!-- <span class="auth-heading__subtitle">Create a new account</span> -->
</h1>

<form action="">
    <div class="field">
        <label for="newPassword" class="text-goldenFizz">New Password</label>
        <input type="password" name="newPassword" id="newPassword" required/>
    </div>
    <div class="field">
        <label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" required/>
    </div>
    <div class="field">
        <button
          type="submit"
          class="auth-btn "
          >Update my password!</button
        >
        <p class="mt-4 text-center text-sm text-white">
          <a href="/login" class="underline hover:no-underline ">Ready to login?</a>
        </p>
    </div>
</form>