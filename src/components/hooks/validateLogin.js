import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLogout } from "./fetchTopicData";

export default function useValidateLogin() {
  const router = useRouter();

  const email = ref({
    val: "",
    isValid: true,
  });

  const password = ref({
    val: "",
    isValid: true,
  });

  const username = ref({
    val: "",
    isValid: true,
  });

  const firstname = ref({
    val: "",
    isValid: true,
  });

  const lastname = ref({
    val: "",
    isValid: true,
  });

  const isLogin = ref(true);

  const isForm = ref(true);

  // Validation
  function validateForm() {
    isForm.value = true;

    if (!isLogin.value) {
      if (email.value.val === "" || !email.value.val.includes("@")) {
        email.value.isValid = false;
        isForm.value = false;
      }
      if (password.value.val === "" || password.value.val.length < 6) {
        password.value.isValid = false;
        isForm.value = false;
      }
      if (username.value.val === "") {
        username.value.isValid = false;
        isForm.value = false;
      }
      if (firstname.value.val === "") {
        firstname.value.isValid = false;
        isForm.value = false;
      }
      if (lastname.value.val === "") {
        lastname.value.isValid = false;
        isForm.value = false;
      }
    }
    if (isLogin.value) {
      if (email.value.val === "" || !email.value.val.includes("@")) {
        email.value.isValid = false;
        isForm.value = false;
      }
      if (password.value.val === "" || password.value.val.length < 6) {
        password.value.isValid = false;
        isForm.value = false;
      }
    }
  }

  // clear all error
  function clearErrWhenSwitch() {
    isLogin.value = !isLogin.value;
    isForm.value = true;

    email.value.isValid = true;
    email.value.val = "";
    password.value.isValid = true;
    password.value.val = "";
    username.value.isValid = true;
    username.value.val = "";
    firstname.value.isValid = true;
    firstname.value.val = "";
    lastname.value.isValid = true;
    lastname.value.val = "";
  }

  async function logout() {
    await useLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    router.replace("/login");
  }

  function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  return {
    email,
    password,
    username,
    firstname,
    lastname,
    isForm,
    isLogin,
    validateForm,
    clearErrWhenSwitch,
    logout,
    isAuthenticated,
  };
}
