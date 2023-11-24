import { v4 as uuidv4 } from "uuid";

export const task = (function () {
  const createTodoTask = (title, description, dueDate, priority) => {
    const taskId = uuidv4().slice(0, 8);
    let isComplete = false;
    let projectName = null;

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
    "Null"
  );

  return { createTodoTask, updateTodoTask, deleteTask };
})();
