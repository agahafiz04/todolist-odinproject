import { v4 as uuidv4 } from "uuid";

// const saveTheObject = JSON.stringify(project.projectList);
// console.log(saveTheObject);

// localStorage.setItem("item", saveTheObject);

// const getTheObject = localStorage.getItem("item")
// const getTheObjectParsed = JSON.parse(getTheObject)

// console.log(getTheObjectParsed)
// const projectOne = createProject("Sunday Morning", "work");
// const projectTwo = createProject("All Righty", "workout");
// const projectThree = createProject("NiceBrow", "study");
// projectList.push(projectOne, projectTwo, projectThree);

export const project = (function () {
  const item = localStorage.getItem("item");
  const projectList = JSON.parse(item);

  const createProject = (title, icon) => {
    const projectId = uuidv4().slice(0, 8);
    const taskList = [];

    return { title, icon, projectId, taskList };
  };

  const updateProject = (obj, changeTitle, changeIcon) => {
    obj.title = changeTitle;
    obj.icon = changeIcon;
  };

  const deleteProject = (currentObj) => {
    projectList.forEach((obj, index) => {
      if (currentObj.projectId === obj.projectId) {
        project.projectList.splice(index, 1);
      }
    });
  };

  return { projectList, createProject, updateProject, deleteProject };
})();
