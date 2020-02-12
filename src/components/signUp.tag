<signUp>
  <div class="grid-middle-center no-margin">
    <form id="signUp-form" class="col-5">
      <div class="text-center">
        <h1>Sign Up</h1>
        <p class="text-grey text-125">and let’s get over it together</p>
      </div>
      <div class="box signUp-info">
        <div class="form-group">
          <p>Full Name</p>
          <input type="text" name="fullName" id="fullName" placeholder="tên xịn">
        </div>
        <div class="form-group required">
          <p>Email Address</p>
          <input required type="email" name="email" id="email" placeholder="email xịn @gmail.com">
        </div>
        <div class="form-group required">
          <p>Password</p>
          <input required type="password" name="password" id="password" placeholder="password xịn @gmail.com">
        </div>
        <div class="form-group required">
          <p>Confirm Password</p>
          <input required type="password" name="confirmPassword" id="confirmPassword" placeholder="password xịn @gmail.com">
        </div>
        <p id="sign-up-err" class="error-message"></p>
        <div class="text-center submit">
          <button id="submit-button" class="button">sign Up</button>
        </div>
      </div>
    </form>
  </div>
</signUp>