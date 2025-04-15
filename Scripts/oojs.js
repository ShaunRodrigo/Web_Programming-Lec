
class UIElement {
    constructor(content) {
      this.element = document.createElement('div');
      this.element.textContent = content;
    }
  
    render(parent = document.body) {
      parent.appendChild(this.element);
    }
  }
  
  
  class Task extends UIElement {
    constructor(content) {
      super(content); 
      this.content = content;
      this.element.className = 'task-item';
      this.addDeleteButton();
    }
  
    addDeleteButton() {
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => this.remove();
      this.element.appendChild(deleteBtn);
    }
  
    remove() {
      this.element.remove();
    }
  }
  
  
  class TaskManager {
    constructor(taskListId) {
      this.taskList = document.getElementById(taskListId);
    }
  
    addTask(content) {
      if (content.trim() === '') return;
  
      const task = new Task(content);
      task.render(this.taskList);
    }
  }
  
 
  const taskManager = new TaskManager('taskList');
  
  
  function addTask() {
    const input = document.getElementById('taskInput');
    const content = input.value;
    taskManager.addTask(content);
    input.value = '';
  }