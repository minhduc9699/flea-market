<app class="app">
  
  <div class="mx-menu-wrapper">
    <div class="grid-center no-margin hight-light">
      <div class="clock-box mx-menu-wrapper-item col-4 col_xs-11">
        <img src="/assets/dongho1.jpg" alt="">
        <span> Never like it anyway </span>
      </div>  
      <div class="clock-box mx-menu-wrapper-item col-4 col_xs-11">
        <img src="/assets/dongho2.jpg" alt="">
        <span> Never like it anyway </span>
      </div>
      <div class="clock-box mx-menu-wrapper-item col-4 col_xs-11">
        <img src="/assets/dongho3.jpg" alt="">
        <span> Never like it anyway </span>
      </div>
    </div>
  </div>

  <div class="grid no-margin">
    <div class="filter drop-down {opts.drowDownOpen ? 'open' : ''} col-3 col_xs-12">
      <p>
        Filter
        <a id="open-drop-down" class="drop-down-arrow-close" href="#">
          <object data="/assets/arrow-down.svg" type=""></object>
        </a>
        <a id="close-drop-down" class="drop-down-arrow-open" href="#">
          <object data="/assets/arrow-up.svg" type=""></object>
        </a>
      </p>
      <div class="drop-down-menu">
        <ul>
          <li each="{category in opts.categories}"
          class="{opts.currentCategory == category ? 'active' : '' }">
            <span></span>
            <a role="button" onclick="{() => opts.setFilter('Category', category)}">{category}</a>
          </li>
          
        </ul>
        <ul>
          <li each="{emo in opts.emotions}"
          class="{opts.currentEmotion == emo ? 'active' : ''}">
            <span></span>
            <a role="button" onclick="{() => opts.setFilter('Emotion', emo)}">{emo}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="products col-9 col_xs-12">
      <div class="products-title">
        <p><span></span>All Products({opts.total})</p>
      </div>
      <div class="grid">
        <a href="/#/detail/{product._id}" class="col-4 col_xs-6 product-item" each="{product in opts.products}">
          <div class="product-image">
            <img class="product-emotion" src="/assets/heartbroken.png" alt="">
            <img src={product.imgUrls[0]} >
          </div>
          <h3 class="product-name">{product.title}</h3>
          <span class="product-price">{Number(product.price).toLocaleString('vi')}đ</span>
          <span class="product-owner" if="{product.userRef}">{product.userRef.displayName}</span>
        </a>
      </div>
    </div>

    

  </div>
  <div class="product-paginate grid-right-middle no-margin">
    <button onclick="{() => opts.goToPage(opts.currentPage - 1)}" class="previous {opts.currentPage <= 1 ? 'disabled' : ''}">
      <img src="/assets/previous.png" alt="">
    </button>
    <span class="page-number">{opts.currentPage}/{opts.totalPage}</span>
    <button onclick="{() => opts.goToPage(opts.currentPage + 1)}" class="next {opts.currentPage >= opts.totalPage ? 'disabled' : ''}">
      <img src="/assets/next.png" alt="">
    </button>

  </div>
</app>