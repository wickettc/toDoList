import { projects } from './projects';
import { manageBtns } from './eventListeners';

//sets date so duedate can never be earlier than today
const setDateHTML = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const todayString = `${today
    .getFullYear()
    .toString()}-${month
    .toString()
    .padStart(2, '0')}-${today.getDate().toString()}`;
  document.querySelector('#due-date').setAttribute('value', todayString);
  document.querySelector('#due-date').setAttribute('min', todayString);
};

const renderDOM = () => {};

const renderProjectList = () => {
  const projectUl = document.querySelector('.project-list');
  projectUl.innerHTML = '';
  projects.forEach((el) => {
    const newProject = document.createElement('li');
    newProject.innerHTML = `<li class="project">${el.name}</li><div id="${el.name}-delete" class="trash-project-padding"><i class="fas fa-trash-alt"></i></div>`;
    projectUl.appendChild(newProject);
  });
};

const renderToDos = (projectName) => {
  const listUl = document.querySelector('.display-list');
  // search through project names and find match
  projects.forEach((el) => {
    if (el.name === projectName) {
      listUl.innerHTML = '';
      // filter through each task and display the title
      el.toDoArr.forEach((task) => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `<li class="list-item">${task.title}</li><div id="${task.title}-edit" class="edit list-to-do-btn"><i class="fas fa-edit"></i></div><div id="${task.title}-delete" class="delete list-to-do-btn"><i class="fas fa-trash-alt"></i></div>`;
        //set priority to change color of todo text
        let { priority } = task;
        priority = priority.toLowerCase().replace(/ /g, '-');
        newListItem.className = `list-wrap ${priority}`;
        listUl.appendChild(newListItem);
      });
    }
  });
  manageBtns();
};

export { renderDOM, renderToDos, renderProjectList, setDateHTML };
