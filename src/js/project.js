const createProject = (title, icon) => {
  const projectId = Date.now();

  return { title, icon, projectId };
};

const updateProject = (title, icon) => {
  taskObj.title = title;
  taskObj.icon = icon;
};

const deleteProject = () => {};

const projectOne = createProject("Sunday Morning", "BitsyIcon");
console.log(projectOne);
