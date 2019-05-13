<detail class="product-detail">
  <div if="{opts.product}" class="grid-center no-margin">
    <div class="detail-images col-6">
      <div
        if="{opts.product.imgUrls[0]}"
        class="big-img grid-middle-center no-margin">
        <img src="{opts.product.imgUrls[0]}" alt="">
      </div>
      <div
        if="{opts.product.imgUrls.length > 1}"
        class="small-img grid no-margin"
      >
        <div class="col-6" each="{productImage in opts.product.imgUrls.slice(1)}">
          <img src="{productImage}" alt="">
        </div>
      </div>
    </div>
    <div class="detail-info col-6">
      <span class="detail-category">{opts.product.category}</span>
      <h1>{opts.product.title}</h1>
      <p class="no-margin">
        <span class="detail-author">By {opts.product.userRef.displayName} </span>
        <span class="detail-date">on {new Date(opts.product.createdAt).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </p>
      <span class="detail-price">{Number(opts.product.price).toLocaleString('vi')}đ</span>
      <div class="no-margin grid-middle">
        <button class="button get-contact">Reveal contact info</button>
        <img class="product-emotion" src="/assets/heartbroken.png" alt="">
      </div>
      <div class="detail-description">
        <h3 class="title">I'm Selling...</h3>
        <p>{opts.product.description}</p>
      </div>
      <div class="detail-reason">
        <h3 class="title">Because...</h3>
        <p>{opts.product.reason}</p>
      </div>
    </div>
  </div>
</detail>