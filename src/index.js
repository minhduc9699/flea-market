import './mx.css';
import './index.css';
import riot from 'riot';
import 'riot-hot-reload';
import mxModal from "./mx";
const { initModal } = mxModal;
import "./components/app.tag";
import "./components/signUp.tag";
import "./components/signIn.tag";
import "./components/footerComponent.tag";
import "./components/navbar.tag";
import "./components/upload.tag";
import "./components/detail.tag";
import "./components/pleaseSignIn.tag";

import controller from "./controller";
import route from "riot-route";
import service from './service/firebase';

import * as yup from 'yup';


const root = document.getElementById("root");

function setQueries(queries) {
  const url = window.location;
  const currentQueries = new URLSearchParams(url.search);

  for(let key in queries) {
    let value = queries[key];
    if(value === 1) currentQueries.delete(key)
    else if (value) currentQueries.set(key, value)
    else currentQueries.delete(key);
  }
  
  window.history.replaceState(
    "",
    "",
    `${url.origin}${url.pathname}?${currentQueries.toString()}`
  );
}

// riot.mount("*");
route.base("#");
riot.mount("*", {
  view: '',
  userDisplayName: ''
});
const navbar = riot.mount("navbar", {});

service.checkAuth().then(user => {
  if (user && user.displayName) {
    navbar[0].opts.userDisplayName = user.displayName;
    navbar[0].update();
  }
});

route("/detail/*", async (_id) => {
  navbar[0].opts.view = "homepage";
  navbar[0].update();

  root.innerHTML = "<detail></detail>";
  const app = riot.mount("detail", {});
  const that = app[0];
  that.opts.product = await service.getById(_id);
  that.update();
  document.querySelector(".get-contact").addEventListener("click", e => {
    e.target.innerText = that.opts.product.userRef ? that.opts.product.userRef.email : "contact not found";
    e.target.style.background =  "#FFFFFF";
    e.target.style.color = "#4F4F4F";
    
  })
});

route("/upload", async () => {
  navbar[0].opts.view = "sellit";
  navbar[0].update();

  const user = await service.checkAuth();
  
  
  if (!user) {
    root.innerHTML = "<pleaseSignIn></pleaseSignIn>";
    riot.mount("pleaseSignIn");
  } else {
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
        service.uploadFile(formData).then(r => {
          const modalElement = document.querySelector(".mx-modal");
          const modal = initModal(modalElement);
          modal.open();
          document.querySelector(".mx-modal .button").addEventListener("click", e => {
            modal.close();
            window.location.href = "/#";
          })
        });
        
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
  }
})
  
route("/signUp", () => {
  root.innerHTML = "<signUp></signUp>";
  riot.mount("signUp", {});
  document.getElementById("signUp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById('sign-in-err').innerHTML = '';

    const fullName = document.querySelector('[name="fullName"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value;

    if (password != confirmPassword) {
      document.getElementById("confirmPassword-err").innerText = "password miss match";
    } else {
      service.signUp(fullName, email, password)
      .then(r => window.location.href = "/")
      .catch(error => {
        if (error && error.message) {
          document.getElementById('sign-in-err').innerHTML = error.message;
        }
      });
    }
  })
  
});

route("/signIn", () => {
  root.innerHTML = "<signIn></signIn>";
  riot.mount("signIn", {});
  
  document.getElementById("signIn-form").addEventListener("submit", async e => {
    e.preventDefault();
    document.getElementById('sign-in-err').innerHTML = '';
    try {
      const email = document.querySelector('[name="email"]').value;
      const password = document.querySelector('[name = "password"]').value;
      await service.signIn(email, password);
      window.location.href = "/";
    } catch (error) {
      if (error && error.message) {
        document.getElementById('sign-in-err').innerHTML = error.message;
      }
    }
  })
});

route("/", () => {
  navbar[0].opts.view = "homepage";
  navbar[0].update();

  root.innerHTML = "<app></app>";
  const query = new URLSearchParams(window.location.search);
  
  const currentCategory = query.get("category") || 'All Products';
  const currentEmotion = query.get("emotion") || 'All Emotions';
  
  const app = riot.mount("app", {
    currentCategory: currentCategory,
    currentEmotion: currentEmotion,
    showAllProduct: service.paginate,
    perPage: query.get('perPage') || 9,
    categories : ["All Products", "Accessories", "Boys Stuff", "Bridal", "Girls Stuff", "Jewelry", "Weird Stuff", "Random Stuff"],
    emotions : ["All Emotions", "Heartbroken", "Shocked", "Angry", "On The Bound", "Better Than Ever"],
  });

  const that = app[0];

  const getProducts = async (page) => {
    const { currentCategory, currentEmotion } = that.opts;
    const queries = {
      category: currentCategory,
      emotion: currentEmotion
    };

    setQueries({
      page: page,
      ...queries
    });
    
    if (currentCategory === "All Products") {
      delete queries.category;
    }

    if (currentEmotion === "All Emotions") {
      delete queries.emotion;
    }

    const { data, total } = await that.opts.showAllProduct(
      queries,
      page,
      that.opts.perPage
    );

    that.opts.products = data;
    that.opts.total = total;
    that.opts.currentPage = page;
    that.opts.totalPage = Math.ceil(total / that.opts.perPage) > 0 ? Math.ceil(total / that.opts.perPage) : 1;
    that.update();
  }
  
  const page = query.get('page') > 0 ? Number(query.get('page')) : 1;
  getProducts(page);

  that.opts.goToPage = (newPage) => {
    that.opts.currentPage = newPage;
    getProducts(newPage);
  };

  that.opts.setFilter = (filter, value) => {
    that.opts[`current${filter}`] = value;
    getProducts(1);
  };
});

route.start(true);
  
  // route.start(true);