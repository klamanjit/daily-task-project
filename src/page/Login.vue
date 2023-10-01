<script setup>
import {
  UserCircleIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  IdentificationIcon,
} from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import useValidateLogin from "../components/hooks/validateLogin.js";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  email,
  password,
  username,
  firstname,
  lastname,
  isForm,
  isLogin,
  validateForm,
  clearErrWhenSwitch,
} = useValidateLogin();

const labelMode = computed(() => {
  if (isLogin.value === true) {
    return `LOGIN`;
  } else {
    return `SIGNUP`;
  }
});

const label = computed(() => {
  if (isLogin.value === true) {
    return `Singup`;
  } else {
    return `Login`;
  }
});

// fetch login || signup
async function authorization() {
  try {
    validateForm();
    if (!isForm.value) {
      console.log("not valid");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencodedForSignup = new URLSearchParams();
    urlencodedForSignup.append("email", email.value.val);
    urlencodedForSignup.append("password", password.value.val);
    urlencodedForSignup.append("username", username.value.val);
    urlencodedForSignup.append("first_name", firstname.value.val);
    urlencodedForSignup.append("last_name", lastname.value.val);
    // urlencodedForSignup.append("include", "true");

    const urlencodedForLogin = new URLSearchParams();
    urlencodedForLogin.append("email", email.value.val);
    urlencodedForLogin.append("password", password.value.val);
    // urlencodedForLogin.append("include", "true");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: isLogin.value ? urlencodedForLogin : urlencodedForSignup,
      redirect: "follow",
    };

    const urlMain = `https://emerging-hawk-entirely.ngrok-free.app
`;

    let url = "";
    if (isLogin.value) {
      url = `${urlMain}/login`;
    } else {
      url = `${urlMain}/register`;
    }

    const response = await fetch(url, requestOptions);

    const responseData = await response.json();

    localStorage.setItem("token", (responseData || "").token);
    localStorage.setItem("username", (responseData.user || "").username);
    localStorage.setItem("refreshToken", responseData.refreshToken);
    localStorage.setItem("userId", responseData.user.id);
    router.replace("/");

    if (!response.ok) {
      throw new Error(responseData.error.message || "fail to fetch");
    }

    console.log(responseData);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <section
    class="bg-slate-700 min-w-screen min-h-screen overflow-hidden relative h-screen"
    v-if="true"
  >
    <base-card
      class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 min-h-fit phone:w-1/2 sm:w-1/2 lg:w-1/3 2xl:w-1/4"
    >
      <!-- 1st colunm -->
      <form
        @submit.prevent="authorization"
        class="phone:flex phone:flex-col sm:grid sm:grid-cols-myLoginTemplate p-2 gap-4 h-full w-full"
      >
        <div
          class="flex flex-col gap-2 items-center justify-center text-slate-900"
        >
          <div class="my-form-login">
            <EnvelopeIcon class="h-9 w-7"></EnvelopeIcon>
            <input
              class="my-input-login"
              type="email"
              placeholder="Email"
              v-model="email.val"
              @blur="email.isValid = true"
            />
          </div>
          <p v-if="!email.isValid" class="invalid-p">*Invalid email</p>

          <div class="my-form-login" v-if="!isLogin">
            <UserCircleIcon class="h-9 w-7"></UserCircleIcon>
            <input
              type="text"
              class="my-input-login"
              placeholder="Username"
              v-model="username.val"
              @blur="username.isValid = true"
            />
          </div>
          <p v-if="!username.isValid && !isLogin" class="invalid-p">
            *Invalid username
          </p>

          <div class="my-form-login">
            <KeyIcon class="h-9 w-7"></KeyIcon>
            <input
              class="my-input-login"
              type="password"
              placeholder="********"
              v-model="password.val"
              @blur="password.isValid = true"
            />
          </div>
          <p v-if="!password.isValid" class="invalid-p">
            *Invalid password, must > 6 charaters
          </p>

          <div class="my-form-login" v-if="!isLogin">
            <IdentificationIcon class="h-9 w-7"></IdentificationIcon>
            <input
              type="text"
              class="my-input-login"
              placeholder="First name"
              v-model="firstname.val"
              @blur="firstname.isValid = true"
            />
          </div>
          <p v-if="!firstname.isValid && !isLogin" class="invalid-p">
            *Invalid first name
          </p>

          <div class="my-form-login" v-if="!isLogin">
            <IdentificationIcon class="h-9 w-7"></IdentificationIcon>
            <input
              type="text"
              class="my-input-login"
              placeholder="Last name"
              v-model="lastname.val"
              @blur="lastname.isValid = true"
            />
          </div>
          <p v-if="!lastname.isValid && !isLogin" class="invalid-p">
            *Invalid first name
          </p>

          <div class="w-full flex items-center justify-between text-sm">
            <base-button type="button" class="italic text-slate-400"
              >Forgot password?</base-button
            >
            <base-button
              type="button"
              class="text-slate-400"
              @click="clearErrWhenSwitch"
              >{{ label }} instead</base-button
            >
          </div>
        </div>

        <!-- 2nd column -->
        <button
          class="phone:flex phone:p-2 sm:p-0 sm:flex-col gap-2 font-bold items-center justify-center bg-gradient-to-br from-slate-800 to-gray-800 rounded-md"
        >
          <ArrowRightOnRectangleIcon
            class="h-6 w-6"
            v-if="isLogin"
          ></ArrowRightOnRectangleIcon>

          <PencilSquareIcon class="h-6 w-6" v-if="!isLogin"></PencilSquareIcon>

          <h2>{{ labelMode }}</h2>
        </button>
      </form>
    </base-card>
  </section>
</template>

<style scoped>
.my-form-login {
  @apply flex w-full p-3 rounded-md items-center bg-slate-300;
}

.my-input-login {
  @apply w-full border-none  bg-slate-300  p-2 rounded-sm focus:outline-none focus:bg-slate-300 text-sm placeholder:text-slate-900 placeholder:font-semibold;
}

.invalid-p {
  @apply text-red-700 self-start;
}
</style>
