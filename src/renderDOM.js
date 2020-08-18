import { projects } from './projects';
import { manageBtns, expandListener } from './eventListeners';

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

const toDoHide = (element) => {
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
};

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
        const newID = task.title.toLowerCase().replace(/ /g, '-');
        const date = new Date(task.dueDate);
        newListItem.innerHTML = `<li class="list-item">${
          task.title
        }</li><div id="${
          task.title
        }-edit" class="edit list-to-do-btn"><i class="fas fa-edit"></i></div><div id="${
          task.title
        }-delete" class="delete list-to-do-btn"><i class="fas fa-trash-alt"></i></div><div class="to-do-hide to-do-hide-style" id="${newID}-hide"><div class="to-do-style-content">${
          task.description
        }</div> <div class="to-do-style-date">${date.toLocaleDateString(
          'en-US'
        )}</div></div>`;
        //set priority to change color of todo text
        let { priority } = task;
        priority = priority.toLowerCase().replace(/ /g, '-');
        newListItem.className = `list-wrap ${priority}`;
        listUl.appendChild(newListItem);
      });
    }
  });
  manageBtns();
  expandListener();
};

export { renderToDos, renderProjectList, setDateHTML, toDoHide };
