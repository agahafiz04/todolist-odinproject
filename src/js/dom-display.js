import { isThisWeek, isToday, parseISO } from "date-fns";
import { pubSubConnection } from ".";
import { project } from "./project";
import { task } from "./task";

export const domDisplay = (function () {
  (function init() {
    initialRenderContent();
    renderSidebarProject();
  })();

  // function now() {
  //   const currentObj = project.projectList[1].taskList;
  //   const taskListContainer = document.querySelector(".task-container");

  //   while (taskListContainer.firstChild) {
  //     taskListContainer.removeChild(taskListContainer.firstChild);
  //   }

  //   currentObj.forEach((allTask) => {
  //     //
  //     const createLi = document.createElement("li");
  //     createLi.id = `${allTask.taskId}`;
  //     taskListContainer.append(createLi);
  //     //
  //     const createDivOne = document.createElement("div");
  //     const createDivTwo = document.createElement("div");
  //     createLi.append(createDivOne, createDivTwo);
  //     //
  //     const createPara = document.createElement("p");
  //     createPara.textContent = `${allTask.title}`;
  //     // createPara.setAttribute("for", "complete");
  //     //
  //     const createInputRadio = document.createElement("input");
  //     createInputRadio.setAttribute("type", "checkbox");
  //     createInputRadio.setAttribute("class", "complete");
  //     createInputRadio.setAttribute("name", "complete");
  //     //
  //     const createEditButton = document.createElement("button");
  //     createEditButton.classList.add("edit-task");
  //     createEditButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  //     //
  //     const createDeleteButton = document.createElement("button");
  //     createDeleteButton.classList.add("delete-task");
  //     createDeleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  //     //
  //     const createDetailButton = document.createElement("button");
  //     createDetailButton.classList.add("detail-task");
  //     createDetailButton.innerHTML = `<i class="fa-solid fa-circle-info"></i>`;
  //     //
  //     createDivOne.append(createInputRadio, createPara);
  //     createDivTwo.append(
  //       createDetailButton,
  //       createEditButton,
  //       createDeleteButton
  //     );
  //   });
  // }
  //}

  // Initial rendering content (Not used in any other function, only for initialization)
  function initialRenderContent() {
    const createDisplayTitle = document.createElement("h1");
    createDisplayTitle.classList.add("display-title");
    createDisplayTitle.textContent = `What To Do Today?`;

    const createTaskListContainer = document.createElement("ul");
    createTaskListContainer.classList.add("task-container");

    const addTaskButton = document.createElement("button");
    addTaskButton.className = "add-task hidden";
    addTaskButton.innerHTML = `<i class="fa-solid fa-circle-plus fa-bounce fa-xl"></i>Add New Task`;

    const contentEl = document.querySelector(".main .content");
    contentEl.append(
      createDisplayTitle,
      addTaskButton,
      createTaskListContainer
    );
  }

  // Render the sidebar project list
  function renderSidebarProject() {
    console.log(project.projectList);

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

      //
      const createLi = document.createElement("li");
      createLi.innerHTML = `<div>${iconChanger} <p>${project.title}</p></div>`;
      //
      const createEditButton = document.createElement("button");
      createEditButton.classList.add("edit-project");
      createEditButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      //
      const createDeleteButton = document.createElement("button");
      createDeleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      createDeleteButton.classList.add("delete-project");
      //
      const createDiv = document.createElement("div");
      //
      createLi.append(createDiv);
      createDiv.append(createEditButton, createDeleteButton);
      projectListUl.append(createLi);
      //
      createLi.id = `${project.projectId}`;
    });
  }

  // Render the main content based on the call of dom-manipulation
  function renderMainContent(content) {
    const currentDisplayTitle = document.querySelector(".display-title");
    const addTaskButton = document.querySelector("button.add-task");
    let filterCategories = pubSubConnection.currentContent;

    switch (content) {
      case "categories":
        currentDisplayTitle.innerHTML = `<i class="${filterCategories[0]}"></i>${filterCategories[1]}`;
        addTaskButton.classList.add("hidden");
        renderSideMain(true);
        break;

      case "project":
        currentDisplayTitle.innerHTML = `<i class="${filterCategories[0]}"></i>${filterCategories[1]}`;
        addTaskButton.classList.remove("hidden");
        renderSideMain();
        break;

      case "default":
        currentDisplayTitle.textContent = "What To Do Today?";
        addTaskButton.classList.add("hidden");
        renderSideMain();

      default:
        break;
    }
  }

  // render main content
  function renderSideMain(categories) {
    const taskListContainer = document.querySelector(".task-container");
    while (taskListContainer.firstChild) {
      taskListContainer.removeChild(taskListContainer.firstChild);
    }

    if (categories === true) {
      const currentCategories = document.querySelector(".currently-selected");
      const currentDisplay = currentCategories.dataset.categories;
      const allTask = pubSubConnection.getAllTask();
      let categoriesObj = null;

      switch (currentDisplay) {
        case "all":
          categoriesObj = allTask;
          break;
        case "today":
          categoriesObj = [];
          allTask.filter((task) => {
            const convertDate = parseISO(task.dueDate);
            const today = isToday(convertDate);

            if (today) {
              categoriesObj.push(task);
            }
          });
          break;
        case "week":
          categoriesObj = [];
          allTask.filter((task) => {
            const convertDate = parseISO(task.dueDate);
            const week = isThisWeek(convertDate);

            if (week) {
              categoriesObj.push(task);
            }
          });
          break;
        case "important":
          categoriesObj = [];
          allTask.forEach((task) => {
            if (task.priority == "High") {
              categoriesObj.push(task);
            }
          });
          break;
        case "completed":
          categoriesObj = [];
          allTask.forEach((task) => {
            if (task.isComplete == true) {
              categoriesObj.push(task);
            }
          });

          break;
        default:
          break;
      }

      categoriesObj.forEach((allTask) => {
        render(allTask);
      });
    } else {
      let currentObj = pubSubConnection.filterObjectShuffle();

      if (!currentObj) {
        return;
      }

      currentObj.taskList.forEach((allTask) => {
        render(allTask);
      });
    }

    function render(allTask) {
      //
      const createLi = document.createElement("li");
      createLi.id = `${allTask.taskId}`;
      taskListContainer.append(createLi);
      //
      const createDivOne = document.createElement("div");
      const createDivTwo = document.createElement("div");
      createLi.append(createDivOne, createDivTwo);
      //
      const createLabel = document.createElement("p");
      createLabel.textContent = `${allTask.title}`;
      createLabel.setAttribute("for", "complete");
      //
      const createInputRadio = document.createElement("input");
      createInputRadio.setAttribute("type", "checkbox");
      createInputRadio.setAttribute("class", "complete");
      createInputRadio.setAttribute("name", "complete");
      //
      const createEditButton = document.createElement("button");
      createEditButton.classList.add("edit-task");
      createEditButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      //
      const createDeleteButton = document.createElement("button");
      createDeleteButton.classList.add("delete-task");
      createDeleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      //
      const createDetailButton = document.createElement("button");
      createDetailButton.classList.add("detail-task");
      createDetailButton.innerHTML = `<i class="fa-solid fa-circle-info"></i>`;
      //
      const createPriorityDisplay = document.createElement("button");
      createPriorityDisplay.classList.add("priority-task");
      const createIcon = document.createElement("i");
      createIcon.className = "fa-solid fa-flag";
      createPriorityDisplay.append(createIcon);

      switch (allTask.priority) {
        case "High":
          createIcon.style.color = "red";
          break;

        case "Medium":
          createIcon.style.color = "yellow";
          break;

        case "Low":
          createIcon.style.color = "green";
          break;

        default:
          break;
      }

      if (allTask.isComplete === true) {
        createInputRadio.setAttribute("checked", "");
        createLi.classList.add("task-completed");
      }
      //
      createDivOne.append(createInputRadio, createLabel);
      createDivTwo.append(
        createPriorityDisplay,
        createDetailButton,
        createEditButton,
        createDeleteButton
      );

      return;
    }
  }

  function openModal(openModal) {
    switch (openModal) {
      case "project-modal-add":
        changeContentModal();
        projectModal("add");
        break;
      case "project-modal-edit":
        changeContentModal();
        projectModal("edit");
        break;
      case "project-modal-delete":
        changeContentModal();
        deleteModal("project");
        break;
      case "task-modal-add":
        changeContentModal();
        taskModal("add");
        break;
      case "task-modal-edit":
        changeContentModal();
        taskModal("edit");
        break;
      case "task-modal-detail":
        changeContentModal();
        taskModal("detail");
        break;
      case "task-modal-delete":
        changeContentModal();
        deleteModal("task");
        break;
      default:
        break;
    }
  }

  function changeContentModal() {
    const overlayEl = document.querySelector(".overlay");
    overlayEl.classList.remove("hidden");
  }

  function projectModal(display) {
    const filterCategories = pubSubConnection.filterObjectShuffle();

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
        input.value = `${filterCategories.title}`;
        radioDiv.childNodes.forEach((radioButton) => {
          if (filterCategories.icon === radioButton.id) {
            radioButton.checked = true;
          }
        });
        h1.textContent = "Edit Project";
        addButton.classList.add("hidden");
        editButton.classList.remove("hidden");
        break;
      default:
        break;
    }
  }

  function taskModal(display) {
    // Rendering change and display of "Task Modal"
    const modal = document.querySelector(".modal.task");
    const input = modal.querySelector("input");
    const textArea = modal.querySelector("textarea");
    const dueDate = modal.querySelector("#due-date");
    const select = modal.querySelector("select");

    const h1 = document.querySelector(".task .modal-header h1");
    const addButton = document.querySelector(".task button.add-modal");
    const editButton = document.querySelector(".task button.edit-modal");
    const projectSelector = document.querySelector(".task #project-choose");

    const currentTask = pubSubConnection.filterTaskShuffle();

    switch (display) {
      case "add":
        modal.classList.remove("hidden");

        input.value = "";
        textArea.value = "";
        dueDate.value = "";
        select.selectedIndex = 0;

        h1.textContent = "New Task";
        addButton.classList.remove("hidden");
        editButton.classList.add("hidden");
        projectSelector.previousElementSibling.classList.add("hidden");
        projectSelector.classList.add("hidden");
        break;

      case "edit":
        modal.classList.remove("hidden");

        input.value = currentTask.title;
        textArea.value = currentTask.description;
        dueDate.value = currentTask.dueDate;
        select.value = currentTask.priority;

        projectSelector.previousElementSibling.classList.remove("hidden");
        projectSelector.classList.remove("hidden");

        while (projectSelector.firstChild) {
          projectSelector.removeChild(projectSelector.firstChild);
        }

        project.projectList.forEach((project, index) => {
          const newElement = document.createElement("option");
          newElement.text = project.title;
          projectSelector.add(newElement);

          if (currentTask.projectName === project.title) {
            projectSelector.selectedIndex = index;
          }
        });

        h1.textContent = "Edit Task";
        addButton.classList.add("hidden");
        editButton.classList.remove("hidden");
        break;

      case "detail":
        const modalDetail = document.querySelector(".modal.detail");
        modalDetail.classList.remove("hidden");

        const detailList = modalDetail.querySelector("ul");

        const detailOne = detailList.children[0].children[1];
        const detailTwo = detailList.children[1].children[1];
        const detailThree = detailList.children[2].children[1];
        const detailFour = detailList.children[3].children[1];
        const detailFive = detailList.children[4].children[1];

        detailOne.textContent = `${currentTask.title}`;
        detailTwo.textContent = `${currentTask.description}`;
        detailThree.textContent = `${currentTask.dueDate}`;
        detailFour.textContent = `${currentTask.priority}`;
        detailFive.textContent = `${currentTask.projectName}`;
        break;

      default:
        break;
    }
  }

  function deleteModal(display) {
    // Rendering change and display of "Delete Modal"
    const modal = document.querySelector(".modal.prompt");
    modal.classList.remove("hidden");
    const text = document.querySelector(".modal.prompt .modal-main ul li h3");
    const buttonTask = document.querySelector(
      ".modal.prompt button.delete-task-modal"
    );

    const buttonProject = document.querySelector(
      " .modal.prompt button.delete-project-modal"
    );

    switch (display) {
      case "project":
        buttonTask.classList.add("hidden");
        buttonProject.classList.remove("hidden");
        const currentObj = pubSubConnection.filterObjectShuffle();
        text.textContent = `Delete "${currentObj.title}" project?`;
        break;
      case "task":
        buttonTask.classList.remove("hidden");
        buttonProject.classList.add("hidden");
        text.textContent = "Are you sure you want to delete this task?";
        break;
      default:
        break;
    }
  }

  function closeModal() {
    const overlayEl = document.querySelector(".overlay");
    overlayEl.classList.add("hidden");
    overlayEl.classList.remove("invalid");

    const modalEl = document.querySelectorAll(".modal");
    modalEl.forEach((modal) => {
      modal.classList.add("hidden");
    });
  }

  function invalidModal(text) {
    changeContentModal();

    const overlayEl = document.querySelector(".overlay");
    // Rendering change and display of "Invalid Modal"
    const invalidModal = document.querySelector(".modal.invalid");
    const invalidModalText = invalidModal.querySelector("h3");
    invalidModalText.textContent = `${text}`;
    invalidModal.classList.remove("hidden");
    overlayEl.classList.remove("hidden");
    overlayEl.classList.add("invalid");
  }

  function closeModalInvalid() {
    const overlayEl = document.querySelector(".overlay");

    const modalInvalidEl = document.querySelector(".modal.invalid");
    modalInvalidEl.classList.add("hidden");
    overlayEl.classList.remove("invalid");
  }

  return {
    renderMainContent,
    renderSidebarProject,
    openModal,
    closeModal,
    closeModalInvalid,
    invalidModal,
  };
})();
