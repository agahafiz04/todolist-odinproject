import { v4 as uuidv4 } from "uuid";
import { project } from "./project";
import { pubSubConnection } from ".";

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

  const moveTodoTask = (currentTask, newProject) => {
    let theProject = null;

    project.projectList.forEach((project) => {
      if (project.title === newProject) {
        theProject = project;
      }
    });

    theProject.taskList.push(currentTask);
  };

  const deleteTask = (currentTask, currentProject) => {
    currentProject.taskList.forEach((obj, index) => {
      if (currentTask.taskId === obj.taskId) {
        currentProject.taskList.splice(index, 1);
      }
    });
  };

  const taskOne = createTodoTask(
    "Buy",
    "Buy an egg",
    "2023-12-09",
    "High",
    project.projectList[1].title
  );
  const taskTwo = createTodoTask(
    "Sell",
    "Sell a fish in the pasar and give it to the old lady that give a man the stick to punch somone out of the dc universe to blame marvel for everything they did to the human race as fast as possible",
    "2023-11-30",
    "Medium",
    project.projectList[1].title
  );

  const taskThree = createTodoTask(
    "Ronaldo",
    "See Ronaldo",
    "2023-11-27",
    "High",
    project.projectList[2].title
  );

  const taskFour = createTodoTask(
    "Messi",
    "See Messi",
    "2023-12-01",
    "Low",
    project.projectList[0].title
  );

  project.projectList[1].taskList.push(taskOne);
  project.projectList[1].taskList.push(taskTwo);
  project.projectList[2].taskList.push(taskThree);
  project.projectList[0].taskList.push(taskFour);

  return { createTodoTask, updateTodoTask, deleteTask, moveTodoTask };
})();
