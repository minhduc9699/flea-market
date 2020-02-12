import "../components/signIn.tag";
import service from "../service/firebase";

const signIn = (riot, root) => () => {
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
}

export default signIn