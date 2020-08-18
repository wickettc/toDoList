const projects = [];
const createProject = (newProject) => {
  projects.push({ name: newProject, toDoArr: [] });
};
const deleteProject = (removeProject) => {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === removeProject) {
      projects.splice(i, 1);
    }
  }
};

export { createProject, deleteProject, projects };
