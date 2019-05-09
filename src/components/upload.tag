<upload class="upload grid-middle-center">
  <div class="col-5">
    <div class="text-center">
      <h1> before you sell it... </h1>
      <p class="text-grey text-125"> Let us ask you a few questions </p>
    </div>
    <div class="box emotion">
      <p>How do you feel right now?</p>
      <div class="grid-spaceBetween no-margin">
        <div class="grid-column-middle-spaceBetween no-margin col">
          <label class="grid-column-middle no-margin" for="heartbroken">
            <div>
              <img src="/assets/iconBlue.png" alt="">
            </div>
            <span class="text-center text-blue">Heartbroken</span>
          </label>
         <input id="heartbroken" value="heartbroken" type="radio" name="emotion">
        </div>
        <div class="grid-column-middle-spaceBetween no-margin col">
          <label class="grid-column-middle no-margin" for="shocked">
            <div>
              <img src="/assets/iconPurple.png" alt="">
            </div>
            <span class="text-center text-purple">Shocked</span>
          </label>
          <input id="shocked" value="shocked" type="radio" name="emotion">
        </div>
        <div class="grid-column-middle-spaceBetween no-margin col">
          <label class="grid-column-middle no-margin" for="angry">
            <img src="/assets/iconRed.png" alt="">
            <span class="text-center text-red">Angry</span>
          </label>
          <input id="angry" value="angry" type="radio" name="emotion">
        </div>
        <div class="grid-column-middle-spaceBetween no-margin col">
          <label class="grid-column-middle no-margin" for="onTheBound">
            <img src="/assets/iconOrange.png" alt="">
            <span class="text-center text-orange">On the Bound</span>
          </label>
          <input id="onTheBound" value="onTheBound" type="radio" name="emotion" checked>
        </div>
        <div class="grid-column-middle-spaceBetween no-margin col">
          <label class="grid-column-middle no-margin" for="betterThanEver">
            <img src="/assets/iconGreen.png" alt="">
            <span class="text-center text-green">Better Than Ever</span>
          </label>
          <input id="betterThanEver" value="betterThanEver" type="radio" name="emotion">
        </div>
      </div>
    
    
    </div>
    <div class="box upload-form">
      <div class="form-group required">
        <p>Title</p>
        <input type="text" name="title" id="title" placeholder="Say somehint i giving up on you">
        <p id="title-err" class="error-message"></p>
      </div>    
      <div class="form-group required">
        <p>Photo (max. 5)</p>
        <div class="file-select-list grid-middle-center">
          <div class="file-select col-4">
            <img class="preview" src="" />
            <input name="files[0]" type="file">
          </div>
          <div class="file-select col-4">
            <img class="preview" src="" />
            <input name="files[1]" type="file">
          </div>
          <div class="file-select col-4">
            <img class="preview" src="" />
            <input name="files[2]" type="file">
          </div>
        </div>
        <p id="files-err" class="error-message"></p>
      </div>
      <div class="form-group required">
        <p>Price (vnđ)</p>
        <input value=0 type="number" name="price" id="price" placeholder="Number only">
        <p id="price-err" class="error-message"></p>
      </div>
      <div class="form-group required">
        <p>Select category</p>
        <select name="category">
          <option selected></option>
          <option>Horn</option>
          <option>Horn</option>
          <option>Horn</option>
          <option>Horn</option>
        </select>
        <p id="category-err" class="error-message"></p>
      </div>
      <div class="form-group">
        <p>What are you selling?</p>
        <textarea type="text" name="description" id="description" placeholder="Write something nice here"></textarea>
        <p id="description-err" class="error-message"></p>
      </div>
      <div class="form-group">
        <p>Why do you sell it?</p>
        <textarea type="text" name="reason" id="reason" placeholder="Write something nice here"></textarea>
        <p id="reason-err" class="error-message"></p>
      </div>
    </div>

    <div class="text-center submit">
      <button id="submit-button" class="button">sell it</button>
    </div>
  </div>
</upload>