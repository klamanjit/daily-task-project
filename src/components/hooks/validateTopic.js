import { ref } from "vue";

export default function useValidateTopic() {
  const emojis = ref(["✔️", "🤝", "📝", "🗓️", "🗂️", "📥", "🧠"]);

  const title = ref({
    val: "",
    isValid: true,
  });

  const emoji = ref({
    val: "",
    isValid: true,
  });

  const isForm = ref(true);

  function validationForm() {
    isForm.value = true;
    if (!title.value.val) {
      title.value.isValid = false;
      isForm.value = false;
    }

    if (!emoji.value.val) {
      emoji.value.isValid = false;
      isForm.value = false;
    }
  }

  function validationRemoveForm() {
    isForm.value = true;
    if (!title.value.val) {
      title.value.isValid = false;
      isForm.value = false;
    }
  }

  // handle error

  const error = ref(null);

  function clearInvalid(input) {
    input.isValid = true;
  }

  return {
    emojis,
    title,
    emoji,
    isForm,
    validationForm,
    validationRemoveForm,
    error,
    clearInvalid,
  };
}
