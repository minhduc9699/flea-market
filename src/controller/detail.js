import service from "../service/firebase";
import "../components/detail.tag";
import "../components/pleaseSignIn.tag";

const detailController = (riot, root, navbar) => async (_id) => {
  navbar[0].opts.view = "homepage";
  navbar[0].update();
  root.innerHTML = "<detail></detail>";
  const app = riot.mount("detail", {});
  const that = app[0];
  that.opts.product = await service.getById(_id);
  that.update();
  document.querySelector(".get-contact").addEventListener("click", e => {
    e.target.innerText = that.opts.product.userRef ? that.opts.product.userRef.email : "contact not found";
    e.target.style.background = "#FFFFFF";
    e.target.style.color = "#4F4F4F";
  })
}


export default detailController