import {
  renderDOM,
  renderToDos,
  renderProjectList,
  setDateHTML,
} from './renderDOM';
import createToDo from './toDo';
import { addListeners } from './eventListeners';
import { createProject, deleteProject, projects } from './projects';

createProject('To Do');
createProject('next to do');
createProject('then next');
createToDo(
  'Create First To Do',
  'Enter something',
  '2020-08-10',
  'very-important',
  'To Do'
);
renderProjectList();
renderToDos('To Do');
addListeners();
setDateHTML();
console.log(projects);
