export const task = (function () {
  // const taskArray = [];

  const createTodoTask = (
    title,
    description,
    dueDate,
    priority,
    projectName
  ) => {
    const taskId = Date.now();
    let isComplete = false;

    return {
      title,
      description,
      dueDate,
      priority,
      projectName,
      taskId,
      isComplete,
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
})();
