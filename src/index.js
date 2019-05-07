import './index.css';
import './mx.css';

import riot from 'riot';
import 'riot-hot-reload';
import "./app.tag";
import "./signUp.tag";

import controller from "./controller";
import route from "riot-route";

const root = document.getElementById("root");

// riot.mount("*");
route.base("#");
route("/", function() {
    console.log("Home page");
    root.innerHTML = "<app></app>";
    riot.mount("app", {});
  });
  
route("/signUp", () => {
    console.log("Tin the l` nao duoc!!!");
    root.innerHTML = "<signUp></signUp>";
    riot.mount("signUp", {});
  });
route.start(true);
  
  // route.start(true);