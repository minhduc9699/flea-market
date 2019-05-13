<navbar>
  <nav class="navbar grid fullwidth">
    <a href="/#" class="nav-brand grid-middle-left col-4">
      <img src="/assets/logo.png" />
    </a>
    <ul class="nav-menu middle-menu grid-middle-center col-4">
      <li class="nav-item {opts.view == 'homepage' ? 'active' : ''}">
        <a href="/#">
          Buy it
        </a>
      </li>
      <li class="nav-item {opts.view == 'sellit' ? 'active' : ''}">
        <a href="/#upload">
          Sell it
        </a>
      </li>
      <li class="nav-item {opts.view == 'tellit' ? 'active' : ''}">
        <a href="/#upload">
          Tell it
        </a>
      </li>
    </ul>
    <ul class="nav-menu right-menu grid-middle-right col-4">
      <li if="{!opts.userDisplayName}" class="nav-item">
        <a href="/#signUp" id="sign-up">
          Sign up
        </a>
      </li>
      <li if="{!opts.userDisplayName}" class="nav-item">
        <a href="/#signIn" id="sign-in">
          Sign in
        </a>
      </li>
      <li if="{opts.userDisplayName}" class="nav-item">
        <span class="user-display-name">Hi, {opts.userDisplayName}</span>
      </li>
    </ul>
  </nav>
</navbar>