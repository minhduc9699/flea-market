import './mx.css';
import './index.css';
import riot from 'riot';
import 'riot-hot-reload';
import route from "riot-route";
import service from './service/firebase';
import controller from './controller';

import './components/loading.tag';
import './components/navbar.tag';
import './components/footerComponent.tag';
import { unzipSync } from 'zlib';

const root = document.getElementById("root");

route.base("/");
riot.mount("*", {});
const navbar = riot.mount("navbar", {
  view: '',
  navDrowDownOpen: false,
  userDisplayName: ''
});

navbar[0].opts.toggleDrowDown = () => {
  navbar[0].opts.navDrowDownOpen = !navbar[0].opts.navDrowDownOpen;
  navbar[0].update();
};

service.checkAuth().then(user => {
  if (user && user.displayName) {
    navbar[0].opts.userDisplayName = user.displayName;
    navbar[0].update();
  }
});

route.parser(function (path) {
  var raw = path.slice(2).split('?'),
    uri = raw[0].split('/'),
    qs = raw[1],
    params = {}

  if (qs) {
    qs.split('&').forEach(function (v) {
      var c = v.split('=')
      params[c[0]] = c[1]
    })
  }
  uri.push(params);
  return uri;
});

route("/detail/*", controller.detailController(riot, root, navbar));
route("/upload", controller.uploadController(riot, root, navbar));
route("/signUp", controller.signUp(riot, root));
route("/signIn", controller.signIn(riot, root));
route("/..", controller.appController(riot, root, navbar));

route.start(true);
