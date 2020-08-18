import createToDo from './toDo';
import { renderToDos, renderProjectList, toDoHide } from './renderDOM';
import { createProject, deleteProject, projects } from './projects';

const heading = document.querySelector('#heading');
const toDoAddBtn = document.querySelector('.to-do-add-btn');
const toDoEditBtn = document.querySelector('.to-do-edit-btn');
const toDoForm = document.querySelector('.to-do-form');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const dueDate = document.querySelector('#due-date');
const priority = document.querySelector('#priority');

const addListeners = () => {
  const bar = document.querySelector('.bar');
  const navBtn = document.querySelector('.nav-button');
  const projectFormContainer = document.querySelector(
    '.project-form-container'
  );
  const projectForm = document.querySelector('.project-form');
  const addProjectTab = document.querySelector('.add-project-btn');
  const cancelBtn = document.querySelector('#project-cancel');
  const addProjectBtn = document.querySelector('#project-add');
  // controls nav button on click

  navBtn.addEventListener('click', function () {
    if (bar.style.display === 'block') {
      bar.style.display = 'none';
    } else {
      bar.style.display = 'block';
    }
  });

  // creates to-do when form is filled out and adds to correct project

  toDoAddBtn.addEventListener('click', function () {
    if (title.value && description.value && dueDate.value && priority.value) {
      createToDo(
        title.value,
        description.value,
        dueDate.value,
        priority.value,
        heading.textContent
      );
      toDoForm.reset();
      renderToDos(heading.textContent);
    } else {
      alert('Must fill out title, description, due date and priority to add.');
    }
  });

  // add project popup

  addProjectTab.addEventListener('click', function () {
    projectFormContainer.style.display = 'block';
  });
  cancelBtn.addEventListener('click', function () {
    projectFormContainer.style.display = 'none';
    projectForm.reset();
  });
  addProjectBtn.addEventListener('click', function () {
    const projectName = document.querySelector('#project-name');
    if (projectName.value) {
      projectFormContainer.style.display = 'none';
      createProject(projectName.value);
      renderProjectList();
      heading.textContent = projectName.value;
      renderToDos(projectName.value);
      bar.style.display = 'none';
      projectForm.reset();
      displayProjects();
      deleteProjectList();
    } else {
      alert('Must enter project name.');
    }
  });

  // displays projects on click
  const displayProjects = () => {
    const projectLists = document.querySelectorAll('.project');
    projectLists.forEach((project) =>
      project.addEventListener('click', function () {
        const thisProject = this.textContent;
        heading.textContent = thisProject;
        renderToDos(thisProject);
        bar.style.display = 'none';
      })
    );
    deleteProjectList();
  };

  // delete project

  const deleteProjectList = () => {
    const projectTrash = document.querySelectorAll('.trash-project-padding');
    projectTrash.forEach((el) => {
      el.addEventListener('click', function () {
        const deleteEl = this.id.substr(0, this.id.indexOf('-'));
        deleteProject(deleteEl);
        renderProjectList();
        displayProjects();
      });
    });
  };
  displayProjects();
  deleteProjectList();
};

//listeners for edit and delete to do buttons//

//helper object for edit and delete buttons
let returnToDo = {
  proj: undefined,
  toDoNum: undefined,
};

const manageBtns = () => {
  const toDoManageBtns = document.querySelectorAll('.list-to-do-btn');
  toDoManageBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('edit')) {
        //allows for updating specific todo
        selectCorrectToDo(btn.id);
        toDoEditBtn.style.display = 'inline-block';
        toDoAddBtn.style.display = 'none';
        let curToDo = projects[returnToDo.proj].toDoArr[returnToDo.toDoNum];
        //pulls data from todo into form elements
        title.value = curToDo.title;
        description.value = curToDo.description;
        dueDate.value = curToDo.dueDate;
        priority.value = curToDo.priority;
        toDoEditBtn.addEventListener('click', function handle() {
          //pushes form element info back into current todo
          curToDo.title = title.value;
          curToDo.description = description.value;
          curToDo.dueDate = dueDate.value;
          curToDo.priority = priority.value;
          toDoEditBtn.style.display = 'none';
          toDoAddBtn.style.display = 'inline-block';
          toDoForm.reset();
          curToDo = undefined;
          renderToDos(projects[returnToDo.proj].name);
          //removes event listener to prevent stacking multipe event
          toDoEditBtn.removeEventListener('click', handle);
        });
        //allows for deleting specific todo
      } else if (btn.classList.contains('delete')) {
        selectCorrectToDo(btn.id);
        //removes correct todo
        projects[returnToDo.proj].toDoArr.splice(returnToDo.toDoNum, 1);
        renderToDos(projects[returnToDo.proj].name);
      }
    });
  });

  const selectCorrectToDo = (inputToDo) => {
    let curProject;
    projects.forEach((el) => {
      if (el.name === heading.textContent) {
        curProject = el;
        //sets correct project in helper object
        returnToDo.proj = projects.indexOf(curProject);
      }
    });
    curProject.toDoArr.forEach((toDo) => {
      let updatedInput = inputToDo.split('-').shift();
      if (toDo.title === updatedInput) {
        // sets correct todo in helper object
        returnToDo.toDoNum = curProject.toDoArr.indexOf(toDo);
      }
    });
  };
};

const expandListener = () => {
  const toDoListItem = document.querySelectorAll('.list-item');
  toDoListItem.forEach((el) => {
    el.addEventListener('click', function () {
      const hideEl = document.querySelector(
        `#${el.textContent.toLowerCase().replace(/ /g, '-')}-hide`
      );

      if (hideEl.classList.contains('to-do-hide')) {
        hideEl.classList.remove('to-do-hide');
      } else {
        hideEl.classList.add('to-do-hide');
      }
    });
  });
};

export { addListeners, manageBtns, expandListener };
