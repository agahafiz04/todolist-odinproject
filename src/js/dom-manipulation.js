import { pubSubConnection } from ".";
import { domDisplay } from "./dom-display";
import { project } from "./project";

export const domManipulation = (function () {
  function reigniteSideProjectEvent() {
    sideListEvent().sideListProjectEvent();
    toggleModal().toggleProjectModal();
  }

  // Sidebar OnChange Event (opening and closing sidebar automatically )
  function sideBarOnChangeEvent() {
    // Toggle bar automatically
    const sidebarButton = document.querySelector(".sidebar-button");
    sidebarButton.addEventListener("click", toggleNav);

    function toggleNav() {
      document.querySelector(".sidebar").classList.toggle("toggle-bar");
      document.querySelector(".content").classList.toggle("toggle-content");
    }

    // Auto Opening and Closing
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

    // Get behind when width is to small
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

  // Sidebar Click Event (Button for Opening and closing sidebar manually)
  function toggleSideBar() {
    const listButton = document.querySelector(".sidebar-button");
    listButton.addEventListener("click", () => {
      if (listButton.classList.contains("selected")) {
        listButton.classList.remove("selected");
      } else {
        listButton.classList.add("selected");
      }
    });
  }

  // Sidebar list of task and project event
  function sideListEvent() {
    // Sidebar list of task event
    const sideListTaskEvent = function () {
      // Task Categories
      const categoriesListOption = document.querySelectorAll(
        ".sidebar .task-list ul li"
      );

      categoriesListOption.forEach((categories) => {
        categories.addEventListener("click", () => {
          pubSubConnection.currentId = categories.dataset.categories;
          sideListRemoveEvent();
          categories.classList.add("currently-selected");
          domDisplay.renderMainContent("task");
        });
      });
    };

    // Sidebar list of project event
    const sideListProjectEvent = function () {
      // Project Categories
      const projectList = document.querySelectorAll(
        ".sidebar .project-list ul li"
      );

      projectList.forEach((project) => {
        project.addEventListener("click", () => {
          pubSubConnection.currentId = project.id;
          sideListRemoveEvent();
          project.classList.add("currently-selected");
          domDisplay.renderMainContent("project");
        });
      });
    };

    // Sidebar remove event
    const sideListRemoveEvent = function () {
      const categoriesListOption = document.querySelectorAll(
        ".sidebar .task-list ul li"
      );
      categoriesListOption.forEach((item) => {
        item.classList.remove("currently-selected");
      });
      const projectList = document.querySelectorAll(
        ".sidebar .project-list ul li"
      );
      projectList.forEach((item) => {
        item.classList.remove("currently-selected");
      });
    };

    return { sideListTaskEvent, sideListProjectEvent };
  }

  // Toggle modal (Event for opening and closing the modal based on the button pressed)
  function toggleModal() {
    // Toggle Project Modal
    const toggleProjectModal = function () {
      // "Add" project modal
      const addProjectButton = document.querySelector(
        ".project-list button.add-project"
      );
      addProjectButton.addEventListener("click", () => {
        domDisplay.renderModal().openModal("project-modal-add");
      });

      // "Edit" project modal
      const editProjectButton = document.querySelectorAll(
        ".project-list button.edit-project"
      );
      editProjectButton.forEach((editButton) => {
        editButton.addEventListener("click", () => {
          pubSubConnection.currentId =
            editButton.parentElement.parentElement.id;
          domDisplay.renderModal().openModal("project-modal-edit");
        });
      });

      // "Delete" project modal
      const deleteProjectButton = document.querySelectorAll(
        ".project-list button.delete-project"
      );
      deleteProjectButton.forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
          pubSubConnection.currentId =
            deleteButton.parentElement.parentElement.id;
          domDisplay.renderModal().openModal("project-modal-delete");
        });
      });
    };

    // Toggle Task Modal
    const toggleTaskModal = function () {
      // "Add" task modal
      const addTaskButton = document.querySelector("button.add-task");

      addTaskButton.addEventListener("click", () => {
        domDisplay.renderModal().openModal("task-modal-add");
      });

      // "Edit" task modal
      // TBD
    };

    // Toggle Close Modal
    const toggleCloseModal = function () {
      const overlayEl = document.querySelector(".overlay");
      const modalElAll = document.querySelectorAll(".modal");
      const allCancelButtonEl = document.querySelectorAll(
        ".button.cancel-modal"
      );

      // General cancel button for closing modal
      allCancelButtonEl.forEach((cancelButton) => {
        cancelButton.addEventListener("click", () => {
          domDisplay.renderModal().closeModal();
        });
      });

      // Invalid cancel button for closing modal (Specifically made for invalid form)
      const invalidModalButton = document.querySelector(
        ".button.cancel-invalid-modal"
      );
      invalidModalButton.addEventListener("click", () => {
        domDisplay.renderModal().closeModal("invalid");
      });

      // Overlay (the blue behind the modal) click for closing the modal
      overlayEl.addEventListener("click", () => {
        if (overlayEl.classList.contains("invalid")) {
          domDisplay.renderModal().closeModal("invalid");
        } else {
          domDisplay.renderModal().closeModal();
        }
      });

      // Close modal with "ESC" button from keyboard
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
    };

    // return
    return { toggleProjectModal, toggleTaskModal, toggleCloseModal };
  }

  // Modal event manipulation to control the behavior of input, button, and value when dealing with modal
  function modalEvent() {
    // Project modal event
    const projectModalEvent = function () {
      const modal = document.querySelector(".modal.project");
      const modalMain = modal.children[1].children[0];
      const input = modalMain.children[0].children[1];
      const radioDiv = modalMain.children[1].children[1];

      // Add button event for "Project Modal Add"
      const addButton = modalMain.children[2].querySelector(".add-modal");
      addButton.addEventListener("click", (event) => {
        let icon = null;

        radioDiv.childNodes.forEach((radioButton) => {
          if (radioButton.checked) {
            icon = radioButton.value;
          }
        });

        if (input.value === "" || input.value.length > 15 || icon === null) {
          event.preventDefault();
          domDisplay.renderModal().openModal("invalid-modal");
        } else {
          const projectCreated = project.createProject(
            `${input.value}`,
            `${icon}`
          );
          project.projectList.push(projectCreated);

          renderAllContent();
          domDisplay.renderMainContent("default");
        }
      });

      // Edit button event for "Project Modal Edit"
      const editButton = modalMain.children[2].querySelector(".edit-modal");
      console.log(editButton);
      editButton.addEventListener("click", (event) => {
        const currentObj = pubSubConnection.filterObjectShuffle();

        let icon;
        radioDiv.childNodes.forEach((radioButton) => {
          if (radioButton.checked) {
            icon = radioButton.value;
          }
        });

        if (input.value === "" || input.value.length > 15) {
          event.preventDefault();
          domDisplay.renderModal().openModal("invalid-modal");
        } else {
          project.updateProject(currentObj, `${input.value}`, `${icon}`);

          renderAllContent();
          domDisplay.renderMainContent("project");
        }
      });

      // Delete button event
      const modalPrompt = document.querySelector(".modal.prompt");
      const deleteButton = modalPrompt.querySelector("button.delete-modal");

      deleteButton.addEventListener("click", () => {
        const currentObj = pubSubConnection.filterObjectShuffle();
        project.deleteProject(currentObj);

        renderAllContent();
        domDisplay.renderMainContent("default");
      });
    };

    function renderAllContent() {
      domDisplay.renderSidebarProject();
      domDisplay.renderModal().closeModal();
      reigniteSideProjectEvent();
    }

    // Return
    return { projectModalEvent };
  }

  return {
    sideBarOnChangeEvent,
    toggleSideBar,
    sideListEvent,
    toggleModal,
    modalEvent,
  };

  // Specific event for categories list (Bugged hard to fix)}
})();
