import { project } from "./project";
import { task } from "./task";

export const domDisplay = (function () {
  (function () {
    initialRenderContent();
    renderSidebarProject();
  })();

  function initialRenderContent() {
    const createDisplayTitle = document.createElement("h1");
    const createDisplayDescription = document.createElement("div");
    const emptyText = document.createElement("h3");

    createDisplayTitle.classList.add("display-title");
    createDisplayDescription.classList.add("display-description");

    createDisplayTitle.textContent = `What To Do Today?`;
    emptyText.textContent = `Please Select The Sidebar Menu On The Left`;

    const contentEl = document.querySelector(".main .content");
    contentEl.append(createDisplayTitle, createDisplayDescription);

    const addTaskButton = document.createElement("button");
    addTaskButton.className = "add-task hidden";
    addTaskButton.innerHTML = `<i class="fa-solid fa-circle-plus fa-bounce fa-xl"></i>Add New Task`;
    createDisplayDescription.append(addTaskButton);
    createDisplayDescription.append(emptyText);
  }

  function renderMainContent(content) {
    const currentDisplayTitle = document.querySelector(".display-title");
    const currentDisplayDescription = document.querySelector(
      ".display-description"
    );
    const currentlySelected = document.querySelector(".currently-selected");
    const addTaskButton = document.querySelector("button.add-task");

    switch (content) {
      case "task":
        const taskIconCurrentlySelected = currentlySelected.children[0];
        const taskParaCurrentlySelected = currentlySelected.children[1];

        currentDisplayTitle.innerHTML = `<i class="${taskIconCurrentlySelected.className}"></i>${taskParaCurrentlySelected.textContent}`;

        currentDisplayDescription.children[1].textContent = "This is Content";
        addTaskButton.classList.add("hidden");
        break;

      case "project":
        const projectCurrentlySelected = currentlySelected.children[0];
        const projectCurrentlySelectedIcon =
          projectCurrentlySelected.children[0];
        const projectCurrentlySelectedPara =
          projectCurrentlySelected.children[1];

        currentDisplayTitle.textContent = `${projectCurrentlySelectedPara.textContent}`;
        currentDisplayTitle.innerHTML = `<i class="${projectCurrentlySelectedIcon.className}"></i>${projectCurrentlySelectedPara.textContent}`;

        currentDisplayDescription.children[1].textContent =
          "Currently There Is No Task";
        addTaskButton.classList.remove("hidden");

      default:
        break;
    }
  }

  function renderSidebarProject() {
    const projectListEl = document.querySelector(".project-list ul");

    // Delete the list (Start Fresh)
    while (projectListEl.firstChild) {
      projectListEl.removeChild(projectListEl.firstChild);
    }

    project.projectList.forEach((project) => {
      let iconChanger;

      switch (project.icon) {
        case "work":
          iconChanger = `<i class="fa-solid fa-briefcase"></i>`;
          break;
        case "workout":
          iconChanger = `<i class="fa-solid fa-dumbbell"></i>`;
          break;
        case "pray":
          iconChanger = `<i class="fa-solid fa-hands-praying"></i>`;
          break;
        case "study":
          iconChanger = `<i class="fa-solid fa-book"></i>`;
          break;
        case "travel":
          iconChanger = `<i class="fa-solid fa-plane"></i>`;
          break;
        case "gaming":
          iconChanger = `<i class="fa-solid fa-gamepad"></i>`;
          break;
        default:
          break;
      }

      const createProjectListEl = document.createElement("li");
      const createEditButtonEl = document.createElement("button");
      const createDeleteButtonEl = document.createElement("button");
      const createDiv = document.createElement("div");

      createEditButtonEl.classList.add("edit-project");
      createDeleteButtonEl.classList.add("delete-project");

      createEditButtonEl.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      createDeleteButtonEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;

      createProjectListEl.innerHTML = `<div>${iconChanger} <p>${project.title}</p></div>`;
      createProjectListEl.append(createDiv);
      createDiv.append(createEditButtonEl, createDeleteButtonEl);
      projectListEl.append(createProjectListEl);
    });
  }

  function renderModal() {
    const overlayEl = document.querySelector(".overlay");

    // close modal
    function closeModal(test) {
      switch (test) {
        case undefined:
          overlayEl.classList.add("hidden");
          overlayEl.classList.remove("invalid");
          const modalEl = document.querySelectorAll(".modal");
          modalEl.forEach((modal) => {
            modal.classList.add("hidden");
          });
          break;

        case "invalid":
          const modalInvalidEl = document.querySelector(".modal.invalid");
          modalInvalidEl.classList.add("hidden");
          overlayEl.classList.remove("invalid");
          break;

        default:
          break;
      }
    }

    // open and change content modal
    function changeContentModal(modalType) {
      switch (modalType) {
        case "project-modal-add":
          projectModal("add");
          break;

        case "project-modal-edit":
          projectModal("edit");
          break;

        case "project-modal-delete":
          deleteModal("project");
          break;

        case "task-modal-add":
          taskModal("add");
          break;

        case "task-modal-edit":
          taskModal("edit");
          break;

        case "task-modal-detail":
          taskModal("detail");
          break;

        case "task-modal-delete":
          deleteModal("task");
          break;

        case "invalid-modal":
          invalidModal();
          break;

        default:
          break;
      }
    }

    function projectModal(display) {
      const modal = document.querySelector(".modal.project");
      modal.classList.remove("hidden");
      overlayEl.classList.remove("hidden");

      const h1 = document.querySelector(".project .modal-header h1");
      const projectModalButtonEl = document.querySelector(
        ".project .button:nth-child(2)"
      );

      switch (display) {
        case "add":
          h1.textContent = "New Project";
          projectModalButtonEl.textContent = "Add";
          projectModalButtonEl.className = "button add-modal";
          break;
        case "edit":
          h1.textContent = "Edit Project";
          projectModalButtonEl.textContent = "Edit";
          projectModalButtonEl.className = "button edit-modal";
          break;
        case "delete":
          break;
        default:
          break;
      }
    }

    function taskModal(display) {
      const modal = document.querySelector(".modal.task");
      modal.classList.remove("hidden");
      overlayEl.classList.remove("hidden");

      const h1 = document.querySelector(".task .modal-header h1");
      const taskModalButtonEl = document.querySelector(
        ".task .button:nth-child(2)"
      );

      switch (display) {
        case "add":
          h1.textContent = "New Task";
          taskModalButtonEl.textContent = "Add";
          taskModalButtonEl.className = "button add-modal";
          break;
        case "edit":
          h1.textContent = "Edit Task";
          taskModalButtonEl.textContent = "Edit";
          taskModalButtonEl.className = "button edit-modal";
          break;
        case "detail":
          break;
        case "delete":
          break;

        default:
          break;
      }
    }

    function deleteModal(type) {
      const modal = document.querySelector(".modal.prompt");
      modal.classList.remove("hidden");
      overlayEl.classList.remove("hidden");

      const text = document.querySelector(".modal.prompt .modal-main ul li h3");
      const button = document.querySelector(
        ".modal.prompt .modal-main ul li button.delete-modal"
      );

      switch (type) {
        case "project":
          button.className = "confirm-delete-project";
          text.textContent = "Are you sure you want to delete this project?";
          break;

        case "task":
          button.className = "confirm-delete-task";
          text.textContent = "Are you sure you want to delete this task?";
          break;

        default:
          break;
      }
    }

    function invalidModal() {
      const invalidModal = document.querySelector(".modal.invalid");
      const invalidModalText = invalidModal.querySelector("h3");

      console.log(invalidModalText);
      invalidModalText.textContent = "Please insert the form correctly";

      invalidModal.classList.remove("hidden");
      overlayEl.classList.remove("hidden");
      overlayEl.classList.add("invalid");
    }

    return { changeContentModal, closeModal };
  }

  return { renderSidebarProject, renderMainContent, renderModal };
})();
