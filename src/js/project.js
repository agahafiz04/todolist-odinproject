import { v4 as uuidv4 } from "uuid";

export const project = (function () {
  const projectList = [];

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

  const projectOne = createProject("Sunday Morning", "work");
  const projectTwo = createProject("All Righty", "workout");
  const projectThree = createProject("NiceBrow", "study");
  projectList.push(projectOne, projectTwo, projectThree);

  return { projectList, createProject, updateProject, deleteProject };
})();
