import FirebaseService from "../service/firebase";

const signUp = (signUpButton) => {
  signUpButton.addEventListener("click", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const errMessage = document.getElementById("err-message");

    if (!email) {
      errMessage.innerText = "Email is required"
    } else if (!password) {
      errMessage.innerText = "Password is required"
    } else {
      FirebaseService
        .signUp(lastName, firstName, phoneNumber, email, password)
        .then(r => {
          console.log("hehe");
        })
        .catch(err => errMessage.innerText = err.message)
    }
  });
}

export default {
  signUp
}