import './mx.css';
import './index.css';
import riot from 'riot';
import 'riot-hot-reload';
import route from "riot-route";
import service from './service/firebase';
import controller from './controller';

import './components/navbar.tag';
import './components/footerComponent.tag';



const root = document.getElementById("root");


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
route("/", controller.appController(riot, root, navbar));
route("/detail/*", controller.detailController(riot, root, navbar));
route("/upload", controller.uploadController(riot, root, navbar));
route("/signUp", controller.signUp(riot, root));
route("/signIn", controller.signIn(riot, root));
route.start(true);
