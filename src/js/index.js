import { add, sub } from "date-fns";
import "../css/style.css";
import { domDisplay } from "./dom-display";
import { domManipulation } from "./domManipulation";
import { project } from "./project";
import { task } from "./task";

project;
task;
domDisplay;
domManipulation;

export let pubSubConnection = {
  currentId: "null",
  currentContent: "null",

  filterObjectShuffle() {
    let filterObject = project.projectList.find(
      (item) => item.projectId === pubSubConnection.currentId
    );

    return filterObject;
  },
};

const currentDate = Date.now();
const maximumDate = add(currentDate, {
  years: 5,
});
const minimumDate = sub(currentDate, {
  years: 2,
});

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
