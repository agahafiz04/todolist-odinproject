import "../css/style.css";
import { project } from "./project";
import { task } from "./task";
import { domDisplay } from "./dom-display";
import { domManipulation } from "./dom-manipulation";

console.log("index");

export let pubSubConnection = {
  currentSideId: "null",
  currentContent: "null",
  currentTaskId: "null",

  filterObjectShuffle() {
    let filterObject = project.projectList.find(
      (project) => project.projectId === pubSubConnection.currentSideId
    );

    return filterObject;
  },

  filterTaskShuffle() {
    const process = [];

    // First loop
    project.projectList.forEach((project) => {
      const taskArray = project.taskList.find(
        (item) => item.taskId === pubSubConnection.currentTaskId
      );
      process.push(taskArray);
    });

    // Second loop
    const final = process.find(
      (task) => task.taskId === pubSubConnection.currentTaskId
    );

    return final;
  },

  checkProjectAvailable() {
    if (project.projectList.length === 0) {
      console.log("There is no project");
      return;
    }
    console.log("There is a project");
  },

  checkTaskAvailable() {
    project.projectList.forEach((project) => {
      if (project.taskList.length === 0) {
        console.log(`there is no task in project ${project.title}`);
        return;
      }

      console.log(`there is a task in project ${project.title}`);
    });
  },
};

Object.preventExtensions(pubSubConnection);

// project.projectList.forEach((project) => {
//   let filterTask = project.taskList.find((taskItem) => taskItem.taskId);

//   console.log(filterTask);
// });

// project.projectList.forEach((project) => {
//   let filterTask = project.taskList.find((item) => item.title === "Buy");
//   console.log(filterTask);
// });

// project.projectList.forEach((project) => {
//   let filterTask = project.taskList.forEach((item) => {
//     console.log(item.taskId);
//   });

//   // console.log(filterTask);
// });
