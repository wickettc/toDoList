import {
  renderDOM,
  renderToDos,
  renderProjectList,
  setDateHTML,
} from './renderDOM';
import createToDo from './toDo';
import { addListeners } from './eventListeners';
import { createProject, projects } from './projects';

createProject('To Do');
createToDo(
  'Create First To Do',
  'Either create and new project or add a To-Do!',
  '2020-08-10',
  'very-important',
  'To Do'
);
renderProjectList();
renderToDos('To Do');
addListeners();
setDateHTML();
console.log(projects);
