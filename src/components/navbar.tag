<navbar>
  <nav class="navbar grid-middle fullwidth">
    <a href="/#" class="nav-brand grid-middle-left col-4 col_xs-6">
      <img src="/assets/logo.png" />
    </a>
    <div onclick="{opts.toggleDrowDown}" class="xs-show lg-hidden col_xs-6 grid text-right">
      <img class="drop-down-arrow-close {opts.navDrowDownOpen ? 'hidden' : ''}" src="/assets/menu-close.svg" type="">
      <img class="drop-down-arrow-open {opts.navDrowDownOpen ? '' : 'hidden'}" src="/assets/menu-open.svg" type="">
    </div>
    <ul class="nav-menu middle-menu grid-middle-center col-4 col_xs-12">
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
    <ul class="nav-menu drop-down {opts.navDrowDownOpen ? 'open' : ''} right-menu grid-middle-right col-4 col_xs-12">
      <div class="drop-down-menu">
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
      </div>
    </ul>
  </nav>
</navbar>