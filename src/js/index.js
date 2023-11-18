import "../css/style.css";

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

const createTodoTask = (title, description, dueDate, priority, projectName) => {
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

const taskOne = createTodoTask("Buy", "Buy an egg", "11/19/23", "High", "Null");
console.log(taskOne);

const createProject = (title, icons) => {
  const projectId = Date.now();

  return { title, icons, projectId };
};

const projectOne = createProject("Sunday Morning", "BitsyIcon");
console.log(projectOne);
