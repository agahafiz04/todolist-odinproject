import { pubSubConnection } from ".";
import { project } from "./project";

export const domDisplay = (function () {
  // Initial rendering content (Not used in any other function, only for initialization)
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

  // Render the main content based on the call of dom-manipulation
  function renderMainContent(content) {
    const currentDisplayTitle = document.querySelector(".display-title");
    const currentDisplayDescription = document.querySelector(
      ".display-description"
    );
    const currentlySelected = document.querySelector(".currently-selected");
    const addTaskButton = document.querySelector("button.add-task");
    // Main content will change based on the content that were called
    switch (content) {
      case "task":
        const taskIconCurrentlySelected = currentlySelected.children[0];
        const taskParaCurrentlySelected = currentlySelected.children[1];
        currentDisplayTitle.innerHTML = `<i class="${taskIconCurrentlySelected.className}"></i>${taskParaCurrentlySelected.textContent}`;
        currentDisplayDescription.children[1].textContent = "This is Content";
        addTaskButton.classList.add("hidden");
        break;

      case "project":
        let filterObject = pubSubConnection.filterObjectShuffle();
        let iconChanger = null;

        if (filterObject) {
          switch (filterObject.icon) {
            case "work":
              iconChanger = `fa-solid fa-briefcase`;
              break;
            case "workout":
              iconChanger = `fa-solid fa-dumbbell`;
              break;
            case "pray":
              iconChanger = `fa-solid fa-hands-praying`;
              break;
            case "study":
              iconChanger = `fa-solid fa-book`;
              break;
            case "travel":
              iconChanger = `fa-solid fa-plane`;
              break;
            case "gaming":
              iconChanger = `fa-solid fa-gamepad`;
              break;
            default:
              break;
          }
        }

        currentDisplayTitle.innerHTML = `<i class="${iconChanger}"></i>${filterObject.title}`;
        currentDisplayDescription.children[1].textContent =
          "Currently There Is No Task";
        addTaskButton.classList.remove("hidden");

        console.log();

        break;

      case "default":
        currentDisplayTitle.textContent = "What To Do Today?";
        currentDisplayDescription.children[1].textContent =
          "Please Select The Sidebar Menu On The Left";
        addTaskButton.classList.add("hidden");

      default:
        break;
    }
  }
  // Render the sidebar project list
  function renderSidebarProject() {
    const projectListUl = document.querySelector(".project-list ul");
    // Delete the list (Start Fresh)
    while (projectListUl.firstChild) {
      projectListUl.removeChild(projectListUl.firstChild);
    }
    // Render the project list based on the icon and object array for the project categories list HTML
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
      const createLi = document.createElement("li");
      const createEditButton = document.createElement("button");
      const createDeleteButton = document.createElement("button");
      const createDiv = document.createElement("div");
      createEditButton.classList.add("edit-project");
      createDeleteButton.classList.add("delete-project");
      createEditButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      createDeleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      createLi.innerHTML = `<div>${iconChanger} <p>${project.title}</p></div>`;
      createLi.append(createDiv);
      createDiv.append(createEditButton, createDeleteButton);
      projectListUl.append(createLi);
      createLi.id = `${project.projectId}`;
    });
  }
  // Render the modal based on the calling context from dom-manipulation
  function renderModal() {
    const overlayEl = document.querySelector(".overlay");
    // open and change content modal
    function openModal(openModal) {
      switch (openModal) {
        case "project-modal-add":
          changeContentModal().projectModal("add");
          console.log("1");
          break;
        case "project-modal-edit":
          changeContentModal().projectModal("edit");
          console.log("2");
          break;
        case "project-modal-delete":
          changeContentModal().deleteModal("project");
          console.log("3");
          break;
        case "task-modal-add":
          changeContentModal().taskModal("add");
          console.log("4");
          break;
        case "task-modal-edit":
          changeContentModal().taskModal("edit");
          console.log("5");
          break;
        case "task-modal-detail":
          changeContentModal().taskModal("detail");
          console.log("6");
          break;
        case "task-modal-delete":
          changeContentModal().deleteModal("task");
          console.log("7");
          break;
        case "invalid-modal":
          changeContentModal().invalidModal();
          console.log("8");
          break;
        default:
          break;
      }
    }
    // close modal
    function closeModal(closingModal) {
      switch (closingModal) {
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

    // return
    return { openModal, closeModal };
  }
  // Change the rendering modal based on the call of renderModal()
  const changeContentModal = function () {
    const overlayEl = document.querySelector(".overlay");
    overlayEl.classList.remove("hidden");

    let filterObject = pubSubConnection.filterObjectShuffle();

    // Rendering change and display of "Project Modal"
    function projectModal(display) {
      const modal = document.querySelector(".modal.project");
      const modalHeader = modal.children[0];
      const modalMain = modal.children[1].children[0];
      modal.classList.remove("hidden");
      const h1 = modalHeader.children[0];
      const input = modalMain.children[0].children[1];
      const radioDiv = modalMain.children[1].children[1];
      const addButton = modalMain.children[2].children[1];
      const editButton = modalMain.children[2].children[2];

      switch (display) {
        case "add":
          input.value = "";
          radioDiv.childNodes.forEach((radioButton) => {
            radioButton.checked = false;
          });
          h1.textContent = "New Project";
          editButton.classList.add("hidden");
          addButton.classList.remove("hidden");
          break;
        case "edit":
          input.value = `${filterObject.title}`;
          radioDiv.childNodes.forEach((radioButton) => {
            if (filterObject.icon === radioButton.id) {
              radioButton.checked = true;
            }
          });
          h1.textContent = "Edit Project";
          addButton.classList.add("hidden");
          editButton.classList.remove("hidden");
          break;
        case "delete":
          break;
        default:
          break;
      }
    }
    // Rendering change and display of "Task Modal"
    function taskModal(display) {
      const modal = document.querySelector(".modal.task");
      modal.classList.remove("hidden");
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
    // Rendering change and display of "Delete Modal"
    function deleteModal(display) {
      const modal = document.querySelector(".modal.prompt");
      modal.classList.remove("hidden");
      const text = document.querySelector(".modal.prompt .modal-main ul li h3");
      const button = document.querySelector(
        ".modal.prompt button.delete-modal"
      );

      console.log(button);

      switch (display) {
        case "project":
          const currentObj = pubSubConnection.filterObjectShuffle();
          text.textContent = `Delete "${currentObj.title}" project?`;
          break;
        case "task":
          text.textContent = "Are you sure you want to delete this task?";
          break;
        default:
          break;
      }
    }
    // Rendering change and display of "Invalid Modal"
    function invalidModal() {
      const invalidModal = document.querySelector(".modal.invalid");
      const invalidModalText = invalidModal.querySelector("h3");
      invalidModalText.textContent = "Please insert the form correctly";
      invalidModal.classList.remove("hidden");
      overlayEl.classList.remove("hidden");
      overlayEl.classList.add("invalid");
    }
    return { projectModal, taskModal, deleteModal, invalidModal };
  };

  return {
    initialRenderContent,
    renderSidebarProject,
    renderMainContent,
    renderSidebarProject,
    renderModal,
  };
})();
