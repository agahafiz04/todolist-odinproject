import "../css/style.css";
import { project } from "./project";
import { task } from "./task";
import { domDisplay } from "./dom-display";
import { domManipulation } from "./dom-manipulation";

export let pubSubConnection = {
  currentSideId: "null",
  currentContent: "null",
  currentTaskId: "null",
  currentDisplay: "null",

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
    const deleteUndefined = process.filter(function (el) {
      return el !== undefined;
    });

    // Second loop
    const final = deleteUndefined.find(
      (task) => task.taskId === pubSubConnection.currentTaskId
    );

    return final;
  },

  getAllTask() {
    const taskArray = [];

    project.projectList.forEach((project) => {
      project.taskList.forEach((taskItem) => {
        taskArray.push(taskItem);
      });
    });

    return taskArray;
  },
};

Object.preventExtensions(pubSubConnection);
// const saveTheObject = JSON.stringify(project.projectList);
// console.log(saveTheObject);

// localStorage.setItem("item", saveTheObject);

// const getTheObject = localStorage.getItem("item")
// const getTheObjectParsed = JSON.parse(getTheObject)

// console.log(getTheObjectParsed)
