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
  root.innerHTML = "<upload></upload>"
  riot.mount("upload");
})
  
route("/signUp", () => {
  console.log("Tin the l` nao duoc!!!");
  root.innerHTML = "<signUp></signUp>";
  riot.mount("signUp", {});
  controller.signUp(document.getElementById("sign-up"));
  });
route.start(true);
  
  // route.start(true);