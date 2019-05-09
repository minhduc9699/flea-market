import './mx.css';
import './index.css';
import riot from 'riot';
import 'riot-hot-reload';
import "./components/app.tag";
import "./components/signUp.tag";
import "./components/footerComponent.tag";
import "./components/navbar.tag";
import "./components/upload.tag";

import controller from "./controller";
import route from "riot-route";
import service from './service/firebase';

import * as yup from 'yup';


const root = document.getElementById("root");

// riot.mount("*");
route.base("#");
riot.mount("*");
route("/", () => {
  console.log("Home page");
  root.innerHTML = "<app></app>";
  riot.mount("app", {});
  });

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

  document.getElementById('submit-button').addEventListener('click',async () => {
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
      service.uploadFile(formData).then(r => console.log(r));
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