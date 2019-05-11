<app class="app">
  
  <div class="hight-light grid-center no-margin">
    <div class="clock-box col-4">
      <img src="/assets/dongho1.jpg" alt="">
      <span> Never like it anyway </span>
    </div>  
    <div class="clock-box col-4">
      <img src="/assets/dongho2.jpg" alt="">
      <span> Never like it anyway </span>
    </div>
    <div class="clock-box col-4">
      <img src="/assets/dongho3.jpg" alt="">
      <span> Never like it anyway </span>
    </div>
  </div>

  <div class="grid no-margin">
    <div class="filter col-3">
      <p>Filter</p>
      <ul>
        <li each="{category in opts.categories}" class="{opts.currentCategory == category ? 'active' : '' }">
          <span></span>
          <a onclick="() => opts.filter(category)" href="#">{category}</a>
        </li>
        
      </ul>
      <ul>
        <li each="{emo in opts.emotions}" class="
        {opts.currentEmotion == emo ? 'active' : ''}">
          <span></span>
          <a href="#">{emo}</a>
        </li>
      </ul>
    </div>
    <div class="products col-9">
      <div class="products-title">
        <p><span></span>All Products({opts.total})</p>
      </div>
      <div class="grid">
        <div class="col-4 product-item" each="{product in opts.products}">
          <div class="product-image">
            <img class="product-emotion" src="/assets/heartbroken.png" alt="">
            <img src={product.imgUrls[0]} >
          </div>
          <h3 class="product-name">{product.title}</h3>
          <span class="product-price">{Number(product.price).toLocaleString('vi')}đ</span>
          <span class="product-owner">thuylinh138</span>
        </div>
      </div>
    </div>

    

  </div>
  <div class="product-paginate grid-right-middle no-margin">
    <button onclick="{() => opts.goToPage('previous')}" class="previous {opts.currentPage <= 1 ? 'disabled' : ''}">
      <img src="/assets/previous.png" alt="">
    </button>
    <span class="page-number">{opts.currentPage}/{opts.totalPage}</span>
    <button onclick="{() => opts.goToPage('next')}" class="next {opts.currentPage >= opts.totalPage ? 'disabled' : ''}">
      <img src="/assets/next.png" alt="">
    </button>

  </div>
  <script>
    // function goToPage(state) {
    //   let nextPage = Number(opts.currentPage) - 1;
    //   if(state === 'next') nextPage = Number(opts.currentPage) + 1;
    //   window.history.replaceState("", "", window.location.href.replace(`page=${opts.currentPage}`, `page=${nextPage}`));
    //   getProducts(nextPage || 1);
    // }

    // function filter(state) {
    //   const query = new URLSearchParams(window.location.search);
      
    //   if (opts[state]) {
    //     window.history.replaceState(
    //       "",
    //       "",
    //       window.location.href.replace(
    //         `${state}=${opts[state]}`,
    //         `${state}=${value}`));
    //   } else {
    //     window.history.replaceState(
    //       "",
    //       "",
    //       window.location.href.replace(
    //         `${state}=${opts[state]}`,
    //         `${state}=${value}`));
    //   }
    // }
    
  </script>
</app>