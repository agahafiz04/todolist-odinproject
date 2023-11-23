import "../css/style.css";
import { domDisplay } from "./dom-display";
import { domManipulation } from "./dom-manipulation";
import { project } from "./project";
import { task } from "./task";

task;
project;
domManipulation;
domDisplay;

export let pubSubConnection = {
  currentId: "null",

  filterObjectShuffle() {
    let filterObject = project.projectList.find(
      (item) => item.projectId === pubSubConnection.currentId
    );

    return filterObject;
  },
};

// Initial rendering display
(function () {
  domDisplay.initialRenderContent();
  domDisplay.renderSidebarProject();
})();

// Initial all dom event manipulation function
(function () {
  domManipulation.sideBarOnChangeEvent();
  domManipulation.toggleSideBar();
  domManipulation.sideListEvent().sideListTaskEvent();
  domManipulation.sideListEvent().sideListProjectEvent();
  domManipulation.toggleModal().toggleTaskModal();
  domManipulation.toggleModal().toggleProjectModal();
  domManipulation.toggleModal().toggleCloseModal();
  // domManipulation.toggleModal().toggleDeleteModal();
  domManipulation.modalEvent().projectModalEvent();
  // domManipulation.modalEvent().taskModalEvent();
})();

// let filterObject = project.projectList.find(
//   (item) => item.projectId === pubSubConnection.currentId
// );

// project;
// task;
// domDisplay;
// domManipulation;

// function formatDate(date, format) {
//   const map = {
//     mm: date.getMonth() + 1,
//     dd: date.getDate(),
//     yy: date.getFullYear().toString().slice(-2),
//     yyyy: date.getFullYear(),
//   };

//   return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
// }

// const today = new Date();
// console.log(formatDate(today, "mm/dd/yy"));
