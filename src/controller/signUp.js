import "../components/signUp.tag";
import service from "../service/firebase";

const signUp = (riot, root) => () => {
  root.innerHTML = "<signUp></signUp>";
  riot.mount("signUp", {});
  document.getElementById("signUp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById('sign-up-err').innerHTML = '';

    const fullName = document.querySelector('[name="fullName"]').value;
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value;

    if (password != confirmPassword) {
      document.getElementById("sign-up-err").innerText = "password miss match";
    } else {
      service.signUp(fullName, email, password)
        .then(r => window.location.href = "/")
        .catch(error => {
          if (error && error.message) {
            document.getElementById('sign-up-err').innerHTML = error.message;
          }
        });
    }
  })
}

export default signUp