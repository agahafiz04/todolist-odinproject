import { domDisplay } from "./dom-display";
import { project } from "./project";

export const domManipulation = (function () {
  (function () {
    sideBarOnChangeEvent();
    toggleSideBarEvent();
    sideBarEvent();
    toggleModalEvent();
    modalEvent();
  })();

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

  function toggleSideBarEvent() {
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
    function removeAllSelected() {
      categoriesListOption.forEach((item) => {
        item.classList.remove("currently-selected");
      });
      projectListOption.forEach((item) => {
        item.classList.remove("currently-selected");
      });
    }

    // Task Categories
    const categoriesListOption = document.querySelectorAll(
      ".sidebar .task-list ul li"
    );

    categoriesListOption.forEach((categories) => {
      categories.addEventListener("click", () => {
        removeAllSelected();
        categories.classList.add("currently-selected");
        domDisplay.renderMainContent("task");
      });
    });

    // Project Categories
    const projectListOption = document.querySelectorAll(
      ".sidebar .project-list ul li"
    );

    projectListOption.forEach((project) => {
      project.addEventListener("click", () => {
        removeAllSelected();
        project.classList.add("currently-selected");
        domDisplay.renderMainContent("project");
      });
    });
  }

  function toggleModalEvent() {
    // Toggle Project Modal
    const addProjectButton = document.querySelector("button.add-project");

    addProjectButton.addEventListener("click", () => {
      domDisplay.renderModal().changeContentModal("project-modal-add");
    });

    const editProjectButton = document.querySelectorAll("button.edit-project");

    editProjectButton.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        console.log(project.projectList);
        domDisplay.renderModal().changeContentModal("project-modal-edit");
      });
    });

    // Toggle Task Modal
    const addTaskButton = document.querySelector("button.add-task");

    addTaskButton.addEventListener("click", () => {
      domDisplay.renderModal().changeContentModal("task-modal-add");
    });

    // Toggle Close Modal
    const overlayEl = document.querySelector(".overlay");
    const modalElAll = document.querySelectorAll(".modal");
    const allCancelButtonEl = document.querySelectorAll(".button.cancel-modal");

    allCancelButtonEl.forEach((cancelButton) => {
      cancelButton.addEventListener("click", () => {
        domDisplay.renderModal().closeModal();
      });
    });

    const invalidModalButton = document.querySelector(
      ".button.cancel-invalid-modal"
    );
    invalidModalButton.addEventListener("click", () => {
      domDisplay.renderModal().closeModal("invalid");
    });

    overlayEl.addEventListener("click", () => {
      if (overlayEl.classList.contains("invalid")) {
        domDisplay.renderModal().closeModal("invalid");
      } else {
        domDisplay.renderModal().closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      modalElAll.forEach((modal) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          if (overlayEl.classList.contains("invalid")) {
            domDisplay.renderModal().closeModal("invalid");
          } else {
            domDisplay.renderModal().closeModal();
          }
        }
      });
    });
  }

  function modalEvent() {
    const modalProject = document.querySelectorAll(
      ".modal.project .modal-main ul li"
    );

    const input = modalProject[0].children[1];
    const radioDiv = modalProject[1].children[1];

    const modalProjectAddButton = document.querySelector(
      ".modal.project .modal-main ul li .add-modal"
    );
    modalProjectAddButton.addEventListener("click", (event) => {
      let icon;

      radioDiv.childNodes.forEach((checkedRadioButton) => {
        if (checkedRadioButton.checked) {
          icon = checkedRadioButton.value;
          console.log(icon);
        }
      });

      if (input.value === "" || input.value.length > 15) {
        event.preventDefault();
        domDisplay.renderModal().changeContentModal("invalid-modal");
      } else {
        const projectCreated = project.createProject(
          `${input.value}`,
          `${icon}`
        );

        project.projectList.push(projectCreated);
        domDisplay.renderSidebarProject();
        domDisplay.renderModal().closeModal();
      }
    });
  }
})();
