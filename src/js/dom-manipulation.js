import { isPast, parseISO } from "date-fns";
import { pubSubConnection } from ".";
import { project } from "./project";
import { task } from "./task";
import { domDisplay } from "./dom-display";

export const domManipulation = (function () {
  (function init() {
    // Initial default
    sideBarOnChangeEvent();

    // Side button pressed
    sideListTaskEvent();
    sideListProjectEvent();

    // Toggle Modal Project
    toggleProjectAddModal();
    toggleProjectEditModal();
    toggleProjectDeleteModal();

    // Toggle Modal Task
    toggleTaskAddModal();
    toggleTaskDetailModal();
    toggleTaskEditModal();
    toggleTaskDeleteModal();
    mainListTaskEvent();

    // Toggle Close Modal
    toggleCloseModal();

    // Event Modal Project
    projectModalEventAdd();
    projectModalEventEdit();
    projectModalEventDelete();

    // Event Modal Task
    taskModalEventAdd();
    taskModalEventEdit();
    taskModalEventDelete();
  })();

  // Sidebar OnChange Event (opening and closing sidebar automatically and manually)
  function sideBarOnChangeEvent() {
    // Toggle bar automatically
    const sidebarButton = document.querySelector(".sidebar-button");
    sidebarButton.addEventListener("click", toggleNav);

    function toggleNav() {
      if (sidebarButton.classList.contains("selected")) {
        sidebarButton.classList.remove("selected");
      } else {
        sidebarButton.classList.add("selected");
      }

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

  // Sidebar list of task and project event
  function sideListTaskEvent() {
    // Task Categories
    const categoriesListOption = document.querySelectorAll(
      ".sidebar .task-list ul li"
    );

    categoriesListOption.forEach((categories) => {
      categories.addEventListener("click", () => {
        pubSubConnection.currentContent = [
          categories.children[0].className,
          categories.children[1].textContent,
        ];
        pubSubConnection.currentSideId = categories.dataset.categories;
        pubSubConnection.currentDisplay = "Categories";
        sideListRemoveEvent();

        categories.classList.add("currently-selected");
        resetCategoriesEvent();
      });
    });
  }

  function sideListProjectEvent() {
    // Project Categories
    const projectList = document.querySelectorAll(
      ".sidebar .project-list ul li"
    );

    projectList.forEach((project) => {
      project.addEventListener("click", () => {
        pubSubConnection.currentSideId = project.id;
        pubSubConnection.currentContent = [
          project.children[0].children[0].className,
          project.children[0].children[1].textContent,
        ];
        pubSubConnection.currentDisplay = "Project";
        sideListRemoveEvent();

        project.classList.add("currently-selected");
        resetMainEvent();
      });
    });
  }

  function sideListRemoveEvent() {
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
  }

  // Toggle modal (Event for opening and closing the modal based on the button pressed)

  // Project
  function toggleProjectAddModal() {
    // "Add" project modal
    const addProjectButton = document.querySelector(
      ".project-list button.add-project"
    );
    addProjectButton.addEventListener("click", () => {
      domDisplay.openModal("project-modal-add");
    });
  }

  function toggleProjectEditModal() {
    const editProjectButton = document.querySelectorAll(
      ".project-list button.edit-project"
    );
    editProjectButton.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        pubSubConnection.currentSideId =
          editButton.parentElement.parentElement.id;
        domDisplay.openModal("project-modal-edit");
      });
    });
  }

  function toggleProjectDeleteModal() {
    // "Delete" project modal
    const deleteProjectButton = document.querySelectorAll(
      ".project-list button.delete-project"
    );
    deleteProjectButton.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        pubSubConnection.currentSideId =
          deleteButton.parentElement.parentElement.id;
        domDisplay.openModal("project-modal-delete");
      });
    });
  }

  // Task
  function toggleTaskAddModal() {
    // "Add" task modal
    const addTaskButton = document.querySelector("button.add-task");

    addTaskButton.addEventListener("click", () => {
      domDisplay.openModal("task-modal-add");
    });
  }

  function toggleTaskEditModal() {
    // "Add" task modal
    const editButton = document.querySelectorAll(
      ".task-container button.edit-task"
    );

    editButton.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        pubSubConnection.currentTaskId =
          editButton.parentElement.parentElement.id;
        domDisplay.openModal("task-modal-edit");
      });
    });
  }

  function toggleTaskDeleteModal() {
    // "Delete" project modal
    const deleteTaskButton = document.querySelectorAll(
      ".task-container button.delete-task"
    );

    deleteTaskButton.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        pubSubConnection.currentTaskId =
          deleteButton.parentElement.parentElement.id;
        domDisplay.openModal("task-modal-delete");
      });
    });
  }

  function toggleTaskDetailModal() {
    const detailEl = document.querySelectorAll(
      ".task-container button.detail-task"
    );

    detailEl.forEach((detailButton) => {
      detailButton.addEventListener("click", () => {
        pubSubConnection.currentTaskId =
          detailButton.parentElement.parentElement.id;
        domDisplay.openModal("task-modal-detail");
      });
    });
  }

  function mainListTaskEvent() {
    const taskListItem = document.querySelectorAll(".task-container li");

    taskListItem.forEach((list) => {
      list.addEventListener("click", (e) => {
        let node = e.target.nodeName;
        pubSubConnection.currentTaskId = list.id;

        if (node == "LI" || node == "DIV" || node == "P") {
          toggleCompleteTask(list);
        }

        const currentTask = pubSubConnection.filterTaskShuffle();
        project.projectList.forEach((project) => {
          if (currentTask.projectName === project.title) {
            pubSubConnection.currentSideId = project.projectId;
          }
        });
      });
    });

    function toggleCompleteTask(list) {
      const currentTask = pubSubConnection.filterTaskShuffle();

      if (currentTask.isComplete === false) {
        currentTask.isComplete = true;
        list.classList.add("task-completed");
        list.children[0].children[0].setAttribute("checked", "");
      } else if (currentTask.isComplete === true) {
        currentTask.isComplete = false;
        list.classList.remove("task-completed");
        list.children[0].children[0].removeAttribute("checked", "");
      }
    }
  }

  // Closing modal
  function toggleCloseModal() {
    const overlayEl = document.querySelector(".overlay");
    const modalElAll = document.querySelectorAll(".modal");
    const allCancelButtonEl = document.querySelectorAll(".button.cancel-modal");

    // General cancel button for closing modal
    allCancelButtonEl.forEach((cancelButton) => {
      cancelButton.addEventListener("click", () => {
        domDisplay.closeModal();
      });
    });

    // Invalid cancel button for closing modal (Specifically made for invalid form)
    const invalidModalButton = document.querySelector(
      ".button.cancel-invalid-modal"
    );
    invalidModalButton.addEventListener("click", () => {
      domDisplay.closeModalInvalid();
    });

    // Overlay (the blue behind the modal) click for closing the modal
    overlayEl.addEventListener("click", () => {
      if (overlayEl.classList.contains("invalid")) {
        domDisplay.closeModalInvalid();
      } else {
        domDisplay.closeModal();
      }
    });

    // Close modal with "ESC" button from keyboard
    document.addEventListener("keydown", function (e) {
      modalElAll.forEach((modal) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          if (overlayEl.classList.contains("invalid")) {
            domDisplay.closeModalInvalid();
          } else {
            domDisplay.closeModal();
          }
        }
      });
    });
  }

  // Modal event project
  function modalQuery() {
    const modal = document.querySelector(".modal.project");
    const modalMain = modal.children[1].children[0];
    const input = modalMain.children[0].children[1];
    const radioDiv = modalMain.children[1].children[1];

    return { modalMain, input, radioDiv };
  }

  function projectModalEventAdd() {
    const modalMain = modalQuery().modalMain;
    const input = modalQuery().input;
    const radioDiv = modalQuery().radioDiv;
    const addButton = modalMain.children[2].querySelector(".add-modal");

    // Add button event for "Project Modal Add"
    addButton.addEventListener("click", () => {
      checkInput();
    });

    const checkIfProjectNameExist = function () {
      const isAvail = project.projectList.find(
        (project) => project.title === input.value
      );

      if (isAvail === undefined || isAvail === null) {
        return true;
      } else {
        return false;
      }
    };

    const checkInput = function () {
      let iconCheck = null;

      radioDiv.childNodes.forEach((radioButton) => {
        if (radioButton.checked) {
          iconCheck = radioButton.value;
        }
      });

      if (checkIfProjectNameExist() === false) {
        domDisplay.invalidModal("Project name already exist");
        return;
      }

      if (input.value === "") {
        domDisplay.invalidModal("Project name cant be empty!");
        return;
      }

      if (input.value.length > 20) {
        domDisplay.invalidModal("Max length of project name is 20");
        return;
      }

      if (iconCheck === null) {
        domDisplay.invalidModal("Please choose one icon");
        return;
      }

      create(input.value, iconCheck);
    };

    const create = function (value, icon) {
      const projectCreated = project.createProject(`${value}`, `${icon}`);

      project.projectList.push(projectCreated);
      resetSideEvent();
      domDisplay.renderMainContent("default");
    };
  }

  function projectModalEventEdit() {
    const modalMain = modalQuery().modalMain;
    const input = modalQuery().input;
    const editButton = modalMain.children[2].querySelector(".edit-modal");
    const radioDiv = modalQuery().radioDiv;

    // Edit button event for "Project Modal Edit"
    editButton.addEventListener("click", () => {
      checkInput();
    });

    const checkInput = function () {
      const currentObj = pubSubConnection.filterObjectShuffle();

      const checkIfProjectNameExist = function () {
        const isAvail = project.projectList.find(
          (project) => project.title === input.value
        );

        if (currentObj.title === input.value) {
          return true;
        }

        if (isAvail === undefined || isAvail === null) {
          return true;
        } else {
          return false;
        }
      };

      let iconCheck = null;
      radioDiv.childNodes.forEach((radioButton) => {
        if (radioButton.checked) {
          iconCheck = radioButton.value;
        }
      });

      if (checkIfProjectNameExist() === false) {
        domDisplay.invalidModal("Project name cant be the same");
        return;
      }

      if (input.value === "") {
        domDisplay.invalidModal("Project name cant be empty");
        return;
      }

      if (input.value.length > 20) {
        domDisplay.invalidModal("Max length of project name is 20");
        return;
      }

      update(currentObj, input.value, iconCheck);
    };

    const update = function (obj, value, icon) {
      project.updateProject(obj, value, icon);
      resetSideEvent();
      domDisplay.renderMainContent("default");
    };
  }

  function projectModalEventDelete() {
    // Delete button event
    const modalPrompt = document.querySelector(".modal.prompt");
    const deleteButton = modalPrompt.querySelector(
      "button.delete-project-modal"
    );

    deleteButton.addEventListener("click", () => {
      deleted();
    });

    const deleted = function () {
      const currentObj = pubSubConnection.filterObjectShuffle();
      project.deleteProject(currentObj);

      resetSideEvent();
      domDisplay.renderMainContent("default");
    };
  }

  // Modal event task
  function taskQuery() {
    const modal = document.querySelector(".modal.task");
    const modalMain = modal.children[1].children[0].children[0];
    const modalMainTwo = modal.children[1].children[1];
    const inputTitle = modalMain.children[0].children[1];
    const inputDescription = modalMain.children[1].children[1];
    const inputDate = modalMain.children[2].children[1];
    const inputPriority = modalMain.children[3].children[1];

    return {
      modalMain,
      inputTitle,
      inputDescription,
      inputDate,
      inputPriority,
      modalMainTwo,
    };
  }

  function taskModalEventAdd() {
    const modalMain = taskQuery().modalMainTwo;
    const inputTitle = taskQuery().inputTitle;
    const inputDescription = taskQuery().inputDescription;
    const inputDate = taskQuery().inputDate;
    const inputPriority = taskQuery().inputPriority;
    const addButton = modalMain.querySelector(".add-modal");

    addButton.addEventListener("click", () => {
      check();
    });

    const check = function () {
      const parseDate = parseISO(inputDate.value);

      if (inputTitle.value === "") {
        domDisplay.invalidModal("Task name cant be empty!");
        return;
      }

      if (inputDescription.value === "") {
        domDisplay.invalidModal("Description cant be empty");
        return;
      }

      if (inputDate.value === "") {
        domDisplay.invalidModal("Due date cant be empty");
        return;
      }

      if (isPast(parseDate)) {
        domDisplay.invalidModal("Are you trying to go back in time?");
        return;
      }

      create(
        inputTitle.value,
        inputDescription.value,
        inputDate.value,
        inputPriority.value
      );
    };

    const create = function (title, description, dueDate, priority) {
      const currentObj = pubSubConnection.filterObjectShuffle();

      const taskCreated = task.createTodoTask(
        title,
        description,
        dueDate,
        priority,
        currentObj.title
      );
      currentObj.taskList.push(taskCreated);

      resetMainEvent();
      domDisplay.closeModal();
    };
  }

  function taskModalEventEdit() {
    const modalMain = taskQuery().modalMainTwo;

    const inputTitle = taskQuery().inputTitle;
    const inputDescription = taskQuery().inputDescription;
    const inputDate = taskQuery().inputDate;
    const inputPriority = taskQuery().inputPriority;
    const inputProjectName = document.querySelector(".task #project-choose");
    const editButton = modalMain.querySelector(".edit-modal");

    editButton.addEventListener("click", () => {
      check();
    });

    const check = function () {
      const parseDate = parseISO(inputDate.value);

      if (inputTitle.value === "") {
        domDisplay.invalidModal("Task name cant be empty!");
        return;
      }

      if (inputDescription.value === "") {
        domDisplay.invalidModal("Description cant be empty");
        return;
      }

      if (inputDate.value === "") {
        domDisplay.invalidModal("Due date cant be empty");
        return;
      }

      if (isPast(parseDate)) {
        domDisplay.invalidModal("Are you trying to go back in time?");
        return;
      }

      edit(
        inputTitle.value,
        inputDescription.value,
        inputDate.value,
        inputPriority.value,
        inputProjectName.value
      );
    };

    const edit = function (title, description, dueDate, priority, projectName) {
      const currentTask = pubSubConnection.filterTaskShuffle();
      const currentProject = pubSubConnection.filterObjectShuffle();

      if (inputProjectName.value !== currentProject.title) {
        task.updateTodoTask(
          currentTask,
          title,
          description,
          dueDate,
          priority,
          projectName
        );

        task.moveTodoTask(currentTask, projectName);
        task.deleteTask(currentTask, currentProject);
      } else {
        task.updateTodoTask(
          currentTask,
          title,
          description,
          dueDate,
          priority,
          projectName
        );
      }

      if (pubSubConnection.currentDisplay === "Categories") {
        resetCategoriesEvent();
        domDisplay.closeModal();
        return;
      }

      if (pubSubConnection.currentDisplay === "Project") {
        resetMainEvent();
        domDisplay.closeModal();
        return;
      }
    };
  }

  function taskModalEventDelete() {
    // Delete button event
    const modalPrompt = document.querySelector(".modal.prompt");
    const deleteButton = modalPrompt.querySelector("button.delete-task-modal");

    deleteButton.addEventListener("click", () => {
      deleted();
    });

    const deleted = function () {
      const currentTask = pubSubConnection.filterTaskShuffle();
      const currentProject = pubSubConnection.filterObjectShuffle();

      task.deleteTask(currentTask, currentProject);

      if (pubSubConnection.currentDisplay === "Categories") {
        resetCategoriesEvent();
        domDisplay.closeModal();
        return;
      }

      if (pubSubConnection.currentDisplay === "Project") {
        resetMainEvent();
        domDisplay.closeModal();
        return;
      }
    };
  }

  // Reset
  function resetSideEvent() {
    domDisplay.renderSidebarProject();
    domDisplay.closeModal();
    sideListProjectEvent();
    toggleProjectEditModal();
    toggleProjectDeleteModal();
  }

  function resetMainEvent() {
    domDisplay.renderMainContent("project");
    mainListTaskEvent();
    toggleTaskDetailModal();
    toggleTaskEditModal();
    toggleTaskDeleteModal();
  }

  function resetCategoriesEvent() {
    domDisplay.renderMainContent("categories");
    mainListTaskEvent();
    toggleTaskDetailModal();
    toggleTaskEditModal();
    toggleTaskDeleteModal();
  }

  // Specific event for categories list (Bugged hard to fix)}
})();
