import { v4 as uuidv4 } from "uuid";
import { project } from "./project";

export const task = (function () {
  const createTodoTask = (
    title,
    description,
    dueDate,
    priority,
    projectName
  ) => {
    const taskId = uuidv4().slice(0, 8);
    let isComplete = false;

    return {
      title,
      description,
      dueDate,
      priority,
      taskId,
      isComplete,
      projectName,
    };
  };

  const updateTodoTask = (
    taskObj,
    title,
    description,
    dueDate,
    priority,
    projectName
  ) => {
    taskObj.title = title;
    taskObj.description = description;
    taskObj.dueDate = dueDate;
    taskObj.priority = priority;
    taskObj.projectName = projectName;
  };

  const deleteTask = (taskArray) => {
    taskArray.pop();
  };

  const taskOne = createTodoTask(
    "Buy",
    "Buy an egg",
    "11/19/23",
    "High",
    project.projectList[0].title
  );
  const taskTwo = createTodoTask(
    "Buy",
    "Buy an egg",
    "11/19/23",
    "High",
    project.projectList[0].title
  );
  project.projectList[0].taskList.push(taskOne, taskTwo);

  return { createTodoTask, updateTodoTask, deleteTask };
})();
