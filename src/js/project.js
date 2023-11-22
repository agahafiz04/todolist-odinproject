export const project = (function () {
  const projectList = [];

  const createProject = (title, icon) => {
    const projectId = Date.now();

    return { title, icon, projectId };
  };

  const updateProject = (title, icon) => {
    taskObj.title = title;
    taskObj.icon = icon;
  };

  const deleteProject = () => {};

  const projectOne = createProject("Sunday Morning", "work");
  const projectTwo = createProject("All Righty", "workout");
  const projectThree = createProject("NiceBrow", "study");
  projectList.push(projectOne, projectTwo, projectThree);

  console.log(projectList);

  return { projectList, createProject, updateProject };
})();
