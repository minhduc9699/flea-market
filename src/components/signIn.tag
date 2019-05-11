<signIn>
  <div class="grid-middle-center no-margin">
    <form id="signIn-form" class="col-5">
      <div class="text-center">
        <h1>Sign In</h1>
        <p class="text-grey text-125">The best place to Sell and Tell</p>
      </div>
      <div class="box signIn-info">
        <div class="form-group required">
          <p>Email Address</p>
          <input required type="email" name="email" id="email" placeholder="email xịn @gmail.com">
          <p id="email-err" class="error-message"></p>
        </div>
        <div class="form-group required">
          <p>Password</p>
          <input required type="password" name="password" id="password" placeholder="password xịn @gmail.com">
          <p id="password-err" class="error-message"></p>
        </div>
        <div class="signIn-option grid-spaceBetween no-margin">
          <div class="grid-middle no-margin">
            <input type="checkbox" id="" checked>
            <span class="remember">Remember me</span>
          </div>
          <span class="forgot">Forgot your password?</span>
        </div>
        <div class="text-center submit">
          <button id="submit-button" class="button">Sign In</button>
        </div>
      </div>
    </form>
  </div>
</signIn>