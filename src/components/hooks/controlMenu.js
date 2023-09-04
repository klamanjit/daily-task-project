// import { ref, computed, inject } from "vue";

// export default function useControlMenu() {
//   // Add Item
//   const isAddItem = ref(false);

//   function changeAddItemToTrue() {
//     isAddItem.value = true;
//   }

//   function changeAddItemToFalse() {
//     isAddItem.value = false;
//   }

//   // Edit Item
//   const isEditItem = ref(false);

//   function openEditItem(item) {
//     isEditItem.value = true;
//     item.editStatus = false;
//   }

//   function closeEditItem(item) {
//     isEditItem.value = false;
//     item.editStatus = false;
//   }
//   // Remove item
//   const isRemoveItem = ref(false);

//   function openRemoveItem(item) {
//     isRemoveItem.value = true;
//     item.editStatus = false;
//   }

//   function closeRemoveItem(item) {
//     isRemoveItem.value = false;
//     item.editStatus = false;
//   }

//   return {
//     isAddItem,
//     changeAddItemToTrue,
//     changeAddItemToFalse,
//     isEditItem,
//     openEditItem,
//     closeEditItem,
//     isRemoveItem,
//     openRemoveItem,
//     closeRemoveItem,
//   };
// }

import { ref, computed, inject } from "vue";

export default function useControlMenu() {
  // Add Item
  const isAddItem = ref(false);

  function changeAddItemToTrue() {
    isAddItem.value = true;
  }

  function changeAddItemToFalse() {
    isAddItem.value = false;
  }

  // Edit Item
  const isEditItem = ref(false);

  function openEditItem(item) {
    isEditItem.value = true;
    isRemoveItem.value = false;
    // item.editStatus = false;
  }

  // function closeEditItem(item) {
  //   isEditItem.value = false;
  //   item.editStatus = false;
  // }
  // Remove item
  const isRemoveItem = ref(false);

  function openRemoveItem(item) {
    isRemoveItem.value = true;
    isEditItem.value = false;
    // item.editStatus = false;
  }

  // function closeRemoveItem(item) {
  //   isRemoveItem.value = false;
  //   item.editStatus = false;
  // }

  // Close Menu
  function closeMenu(item) {
    isEditItem.value = false;
    isRemoveItem.value = false;
    item.editStatus = false;
  }

  return {
    isAddItem,
    changeAddItemToTrue,
    changeAddItemToFalse,
    isEditItem,
    openEditItem,
    isRemoveItem,
    openRemoveItem,
    closeMenu,
  };
}
