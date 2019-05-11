import './mx.css';
import './index.css';
import riot from 'riot';
import 'riot-hot-reload';
import "./components/app.tag";
import "./components/signUp.tag";
import "./components/footerComponent.tag";
import "./components/navbar.tag";
import "./components/upload.tag";
import "./components/detail.tag";


import controller from "./controller";
import route from "riot-route";
import service from './service/firebase';

import * as yup from 'yup';


const root = document.getElementById("root");

// riot.mount("*");
route.base("#");
riot.mount("*", {});
route("/", () => {
  root.innerHTML = "<app></app>";
  const query = new URLSearchParams(window.location.search);
  query.set("category", 'All Products');
  query.set("emotion", 'All Emotions');
  const currentCategory = query.get("category");
  const currentEmotion = query.get("emotion");
  // window.location.search = `?${query.toString()}`;
  const app = riot.mount("app", {
    currentCategory: currentCategory,
    currentEmotion: currentEmotion,
    showAllProduct: service.paginate,
    categories : ["All Products", "Accessories", "Boys Stuff", "Bridal", "Girls Stuff", "Jewelry", "Weird Stuff", "Random Stuff"],
    emotions : ["All Emotions", "Heartbroken", "Shocked", "Angry", "On The Rebound", "Better Than Ever"],
  });
  const that = app[0];

  const getProducts = async (page) => {
    const { data, total } = await that.opts.showAllProduct({}, page, that.opts.perPage);
    that.opts.products = data;
    that.opts.total = total;
    that.opts.currentPage = page > 0 ? page : 1;
    that.opts.totalPage = Math.ceil(total / that.opts.perPage);
    that.update();
  }

  const page = query.get('page') || 1;
  that.opts.perPage = query.get('perPage') || 9;
  getProducts(page)

});

route("/detail/*", async (_id) => {
  root.innerHTML = "<detail></detail>";
  const app = riot.mount("detail", {});
  const that = app[0];
  that.opts.product = await service.getById(_id);
  
})

route("/upload", () => {
  root.innerHTML = "<upload></upload>";
  riot.mount("upload");
  const schema = yup.object().shape({
    title: yup.string().required("title is required").max(100),
    category: yup.string().required("category is required"),
    emotion: yup.string().required(),
    files: yup.array().required("there must be at least one image"),
    price: yup.number().required().min(0).typeError("price must be a number"),
    description: yup.string(),
    reason: yup.string()
  });

  document.getElementById('product-form').addEventListener('submit',async (e) => {
    e.preventDefault();
    const files = [];
    document.querySelectorAll('[name*="files"]').forEach((elem) => {
      if (elem.files[0]) {
        files.push(elem.files[0]);
      }
    });
    
    const formData = {
      category: document.querySelector('[name="category"]').value,
      emotion: document.querySelector('input[name=emotion]:checked').value,
      title: document.querySelector('[name="title"]').value,
      files,
      price: document.querySelector('[name="price"]').value,
      description: document.querySelector('[name="description"]').value,
      reason: document.querySelector('[name="reason"]').value
    };

    let errorMessages = [];
    try {
     const res =  await schema.validate(formData, { abortEarly: false });
    } catch (error) {
      error.inner.map(err => {
        errorMessages.push({
          path: err.path,
          message: err.message
        });
      });
    }

    if(errorMessages.length > 0) {
      const errorPaths = errorMessages.map(error => error.path);
      document.querySelectorAll('[id*=-err]').forEach(elem => {
        const elemPath = elem.id.replace('-err', '');
        const pathIndex = errorPaths.indexOf(elemPath);
        if (pathIndex > -1) {
          elem.innerText = errorMessages[pathIndex].message;
        } else elem.innerText = '';
      });
    } else {
      service.uploadFile(formData).then(r => window.location.reload());
    }

  });

  document.querySelectorAll('[name*="files"]').forEach((elem, index) => {
    elem.addEventListener('change', event => {
      const file = event.target.files[0];
      const preview = document.querySelector(`.file-select:nth-child(${index + 1}) .preview`);
      
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          preview.src = reader.result;
          preview.style.display = 'block';
        }

        reader.readAsDataURL(file);
      } else {
        preview.src = "";
        preview.style.display = 'none';
      }
    });
  });
})
  
route("/signUp", () => {
  console.log("Tin the l` nao duoc!!!");
  root.innerHTML = "<signUp></signUp>";
  riot.mount("signUp", {});
  controller.signUp(document.getElementById("sign-up"));
});

route.start(true);
  
  // route.start(true);