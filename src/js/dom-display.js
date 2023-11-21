export const domDisplay = (function () {
  initialRenderContent();

  function initialRenderContent() {
    const createDisplayTitle = document.createElement("h1");
    const createDisplayDescription = document.createElement("h3");

    createDisplayTitle.classList.add("display-title");
    createDisplayDescription.classList.add("display-description");

    createDisplayDescription.textContent = `Please Select The Sidebar Menu On The Left`;
    createDisplayTitle.textContent = `What To Do Today ?`;

    const contentEl = document.querySelector(".main .content");
    contentEl.append(createDisplayTitle, createDisplayDescription);
  }

  function renderMainContent(content) {
    const currentDisplayTitle = document.querySelector(".display-title");
    const currentDisplayDescription = document.querySelector(
      ".display-description"
    );

    console.log(currentDisplayTitle, currentDisplayDescription);

    switch (content) {
      case "all":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-cubes-stacked"></i>All Tasks`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "today":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-calendar-day"></i>Today`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "week":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-calendar-week"></i>Next 7 Days`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "important":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-star"></i>Important`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "completed":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-square-check"></i>Completed`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      default:
        break;
    }

    console.log(content);
  }

  function renderSidebarProject() {}

  function renderModal() {
    const overlayEl = document.querySelector(".overlay");

    function closeModal() {
      console.log("hello");
      overlayEl.classList.add("hidden");
      const modalEl = document.querySelectorAll(".modal");
      modalEl.forEach((modal) => {
        modal.classList.add("hidden");
      });
    }

    function changeContentModal(modalType) {
      switch (modalType) {
        case "project-modal-add":
          projectModal("add");
          break;

        case "project-modal-edit":
          projectModal("edit");
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

        case "delete-modal-project":
          deletePromptModal("project");
          break;

        case "delete-modal-task":
          deletePromptModal("task");
          break;

        default:
          break;
      }

      function projectModal(display) {
        const modal = document.querySelector(".modal.project");
        modal.classList.remove("hidden");
        overlayEl.classList.remove("hidden");

        const h1 = document.querySelector(".project .modal-header h1");
        const projectModalButtonEl = document.querySelector(
          ".project .button:nth-child(2)"
        );

        if (display == "add") {
          h1.textContent = "New Project";
          projectModalButtonEl.textContent = "Add";
          projectModalButtonEl.className = "button add-modal";
        } else if (display == "edit") {
          h1.textContent = "Edit Project";
          projectModalButtonEl.textContent = "Edit";
          projectModalButtonEl.className = "button edit-modal";
        }
      }

      function taskModal(display) {
        // console.log(modal.childNodes[1].childNodes[1])
        // Continue Here

        const modal = document.querySelector(".modal.task");
        modal.classList.remove("hidden");
        overlayEl.classList.remove("hidden");

        const h1 = document.querySelector(".task .modal-header h1");
        const taskModalButtonEl = document.querySelector(
          ".task .button:nth-child(2)"
        );

        if (display == "add") {
          h1.textContent = "New Task";
          taskModalButtonEl.textContent = "Add";
          taskModalButtonEl.className = "button add-modal";
        } else if (display == "edit") {
          h1.textContent = "Edit Task";
          taskModalButtonEl.textContent = "Edit";
          taskModalButtonEl.className = "button edit-modal";
        } else if (display == "detail") {
        }
      }

      function deletePromptModal() {}
    }

    return { closeModal, changeContentModal };
  }

  return { renderSidebarProject, renderMainContent, renderModal };
})();
