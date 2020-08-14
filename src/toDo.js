import { projects } from './projects';

const createToDo = (title, description, dueDate, priority, project) => {
        projects.forEach(el => {
                if (el.name === project) {
                        el.toDoArr.push({ title, description, dueDate, priority });
                }
        });
};

export default createToDo;
