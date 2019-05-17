import "../components/upload.tag";
import service from "../service/firebase";
import initModal from "../mx";

const uploadController = (riot, root, navbar) => async () => {
  navbar[0].opts.view = "sellit";
  navbar[0].update();

  const user = await service.checkAuth();
  if (!user) {
    root.innerHTML = "<pleaseSignIn></pleaseSignIn>";
    riot.mount("pleaseSignIn");
  } else {
    root.innerHTML = "<upload></upload>";
    riot.mount("upload");
    document.getElementById('product-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const files = [];
      document.querySelectorAll('[name*="files"]').forEach((elem) => {
        if (elem.files[0]) {
          files.push(elem.files[0]);
        }
      });
      const data = {
        category: document.querySelector('[name="category"]').value,
        emotion: document.querySelector('input[name=emotion]:checked').value,
        title: document.querySelector('[name="title"]').value,
        files,
        price: document.querySelector('[name="price"]').value,
        description: document.querySelector('[name="description"]').value,
        reason: document.querySelector('[name="reason"]').value
      };
      service.uploadFile(data).then(r => {
        const modalElement = document.querySelector(".mx-modal");
        const modal = initModal(modalElement);
        modal.open();
        document.querySelector(".mx-modal .button").addEventListener("click", e => {
          modal.close();
          window.location.href = "/";
        })
      });
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
}


export default uploadController