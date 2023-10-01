import { ref, computed } from "vue";

export default function useValidateTask() {
  const title = ref({
    val: "",
    isValid: true,
  });

  const emoji = ref({
    val: "",
    isValid: true,
  });

  const detail = ref({
    val: "",
    isValid: true,
  });

  const date = ref({
    val: "",
    isValid: true,
  });

  const month = ref({
    val: "",
    isValid: true,
  });

  const status = ref({
    val: "",
    isValid: true,
  });

  const userType = ref({
    val: "",
    isValid: true,
  });

  const numOfUserId = ref({
    val: "",
    isValid: true,
  });

  const isForm = ref(true);

  const dateSet = computed(() => {
    const date = [];
    for (let i = 1; i < 32; i++) {
      date.push(i);
    }

    return date;
  });

  const monthSet = ref([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  // Validation
  function validationForm() {
    isForm.value = true;
    if (!title.value.val) {
      isForm.value = false;
      title.value.isValid = false;
    }
    if (!emoji.value.val) {
      isForm.value = false;
      emoji.value.isValid = false;
    }
    if (!detail.value.val) {
      isForm.value = false;
      detail.value.isValid = false;
    }
    if (!date.value.val) {
      isForm.value = false;
      date.value.isValid = false;
    }
    if (!month.value.val) {
      isForm.value = false;
      month.value.isValid = false;
    }
    if (!status.value.val) {
      isForm.value = false;
      status.value.isValid = false;
    }
  }

  function validationRemoveForm() {
    isForm.value = true;
    if (!title.value.val) {
      isForm.value = false;
      title.value.isValid = false;
    }
  }

  function validateAddTaskUserForm() {
    isForm.value = true;
    if (!userType.value.val) {
      userType.value.isValid = false;
      isForm.value = false;
    }
    if (!numOfUserId.value.val) {
      numOfUserId.value.isValid = false;
      isForm.value = false;
    }
  }

  // Handle error
  function clearInvalid(input) {
    input.isValid = true;
  }

  return {
    title,
    emoji,
    detail,
    date,
    month,
    status,
    isForm,
    dateSet,
    monthSet,
    userType,
    numOfUserId,
    validationForm,
    validationRemoveForm,
    validateAddTaskUserForm,
    clearInvalid,
  };
}
