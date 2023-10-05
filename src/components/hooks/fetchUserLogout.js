import { useRouter } from "vue-router";
import { inject } from "vue";

export default function useUserLogout() {
  const urlMain = `https://emerging-hawk-entirely.ngrok-free.app`;
  const token = localStorage.getItem("token");
  const topics = inject("topics");
  const router = useRouter();
  async function logout() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", token);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };
      let url = `${urlMain}/logout`;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message || `fail to logout`);
      }

      if (responseData.success) {
        topics.value.length = 0;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        router.replace("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { logout };
}
