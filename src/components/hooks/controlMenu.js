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
    isAddUser.value = false;
  }

  // Remove item
  const isRemoveItem = ref(false);

  function openRemoveItem(item) {
    isRemoveItem.value = true;
    isEditItem.value = false;
    isAddUser.value = false;
  }

  // Add topic user
  const isAddUser = ref(false);

  function openAddUser(item) {
    isAddUser.value = true;
    isEditItem.value = false;
    isRemoveItem.value = false;
  }

  // Close Menu
  function closeMenu(item) {
    isEditItem.value = false;
    isRemoveItem.value = false;
    item.editStatus = false;
  }

  // Popupmenu for sm responsive
  const isPopupMenu = ref(false);

  return {
    isAddItem,
    changeAddItemToTrue,
    changeAddItemToFalse,
    isEditItem,
    openEditItem,
    isRemoveItem,
    openRemoveItem,
    isAddUser,
    openAddUser,
    closeMenu,
    isPopupMenu,
  };
}
