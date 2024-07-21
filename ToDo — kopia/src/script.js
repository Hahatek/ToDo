import * as bootstrap from 'bootstrap';

const LS_KEY = 'OPSS2_todos';

const Task = (name, status='pending') => {
    return {
        id: crypto.randomUUID(),
        name: name,
        status: status
    }
};

const readFromLocalStorage = (key) => {
    const lsData = localStorage.getItem(key);
    return lsData ? JSON.parse(lsData) : [];
};

const saveToLocalStorage = (value, key) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const tasks = readFromLocalStorage(LS_KEY);
const task_list = document.querySelector('#task_list');
const task_template = document.querySelector('.task_item');

const removeTaskFromList = (id) => {
    document.getElementById(id).remove();
};

const updateTaksOnList = (task) => {
    const taskItem = document.getElementById(task.id);
    if (taskItem){
        taskItem.querySelector('.task_status').innerText = task.status;
    } 
}
document.querySelector('.edit_task').onclick = () => {
    console.log(1);
};
const removeTask = (id) => {
    const index = tasks.indexOf( x => x.id === id)
    if ( index ){
        tasks.splice(index, 1);
        saveToLocalStorage(tasks, LS_KEY);
        removeTaskFromList(id);
    }
};

const changeTaskStatus = (id, status = undefined) => {
    const task = tasks.find( x => x.id == id);
    if ( task ){
        if ( status ){
            task.status = status;
            return;
        } 
        task.status = task.status === "pending" ? "done" : "pending";
        saveToLocalStorage(tasks, LS_KEY);
        updateTaksOnList(task);
    }
};

const addTaskToList = (task) => {
    const task_entry = document.createElement('li');
    task_entry.id = task.id;
    task_entry.classList.add('list-group-item');
    const task_item = task_template.cloneNode(true);
    
    task_item.querySelector('.task_text').innerText = task.name;
    task_item.querySelector('.task_status').innerText = task.status;
    task_item.querySelector('.change_task_status').onclick = () => {
        changeTaskStatus(task.id);
    }
    task_item.querySelector('.remove_task').onclick = () => {
        removeTask(task.id);
    }
    task_item.style.display = 'flex';

    task_entry.append(task_item);
    task_list.append(task_entry);
}

const addNewTask = (taskName) => {
    const task = Task(taskName);
    tasks.push(task);
    addTaskToList(task);
    saveToLocalStorage(tasks, LS_KEY);
};

document.querySelector('#add_task').onclick = () => {
    const task = document.querySelector('#task_content');
    addNewTask(task.value);
    task.value = "";

};

// INIT:
tasks.forEach( x => {
    addTaskToList(x);
});