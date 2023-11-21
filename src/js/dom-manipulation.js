import { domDisplay } from "./dom-display";
domDisplay;

export const domManipulation = (function () {
  function sideBarOnChangeEvent() {
    const sidebarButton = document.querySelector(".sidebar-button");
    sidebarButton.addEventListener("click", toggleNav);

    function toggleNav() {
      document.querySelector(".sidebar").classList.toggle("toggle-bar");
      document.querySelector(".content").classList.toggle("toggle-content");
    }

    const mediaQueryOne = window.matchMedia("(min-width: 1100px)");
    if (mediaQueryOne.matches) {
      document.querySelector(".sidebar").classList.add("toggle-bar");
      document.querySelector(".content").classList.add("toggle-content");
      document.querySelector(".sidebar-button").classList.add("selected");
      document.querySelector(".sidebar-button").style.display = "flex";
    }

    mediaQueryOne.onchange = (e) => {
      if (e.matches) {
        document.querySelector(".sidebar").classList.add("toggle-bar");
        document.querySelector(".content").classList.add("toggle-content");
        document.querySelector(".sidebar-button").classList.add("selected");
        document.querySelector(".sidebar-button").style.display = "none";
      } else {
        document.querySelector(".sidebar").classList.remove("toggle-bar");
        document.querySelector(".content").classList.remove("toggle-content");
        document.querySelector(".sidebar-button").classList.remove("selected");
        document.querySelector(".sidebar-button").style.display = "flex";
      }
    };

    const mediaQueryTwo = window.matchMedia("(max-width: 800px)");
    if (mediaQueryTwo.matches) {
      document.querySelector(".content").classList.add("fixed");
    }

    mediaQueryTwo.onchange = (e) => {
      if (e.matches) {
        document.querySelector(".content").classList.add("fixed");
      } else {
        document.querySelector(".content").classList.remove("fixed");
      }
    };
  }

  function sideBarButtonEvent() {
    const listButton = document.querySelector(".sidebar-button");
    listButton.addEventListener("click", () => {
      if (listButton.classList.contains("selected")) {
        listButton.classList.remove("selected");
      } else {
        listButton.classList.add("selected");
      }
    });
  }

  function sideBarEvent() {
    // Task Categories
    const listOption = document.querySelectorAll(".sidebar .task-list ul li");
    function removeAllSelected() {
      listOption.forEach((item) => {
        item.classList.remove("selected");
      });
    }

    listOption.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("yow");
        removeAllSelected();
        item.classList.add("selected");
        domDisplay.renderMainContent(item.dataset.categories);
      });
    });
  }

  function modalEvent() {
    // Open Modal Event
    const addProjectButton = document.querySelector(
      ".project-list .add-project"
    );

    addProjectButton.addEventListener("click", () => {
      domDisplay.renderModal().changeContentModal("project-modal-add");
    });

    // Close Modal Event
    const overlayEl = document.querySelector(".overlay");
    const modalElAll = document.querySelectorAll(".modal");
    const allCancelButtonEl = document.querySelectorAll(".button.cancel-modal");

    allCancelButtonEl.forEach((cancelButton) => {
      cancelButton.addEventListener("click", () => {
        domDisplay.renderModal().closeModal();
      });
    });

    overlayEl.addEventListener("click", () => {
      domDisplay.renderModal().closeModal();
    });

    document.addEventListener("keydown", function (e) {
      modalElAll.forEach((modal) => {
        console.log(modal);
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          domDisplay.renderModal().closeModal();
        }
      });
    });
  }

  sideBarOnChangeEvent();
  sideBarButtonEvent();
  sideBarEvent();
  modalEvent();
})();
