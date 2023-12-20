const todoList = () => {
    const all = [];
  
    const add = (todoItem) => {
      all.push(todoItem);
    };
  
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      return all.filter(todo => todo.dueDate < new Date().toISOString());
    };
  
    const dueToday = () => {
      return all.filter(todo => todo.dueDate === new Date().toISOString());
    };
  
    const dueLater = () => {
      return all.filter(todo => todo.dueDate > new Date().toISOString());
    };
  
    const toDisplayableList = (list) => {
       return list.map(item => `${item.completed ? '[x]' : '[ ]' } ${item.title} ${item.dueDate === new Date().toISOString()}`);
    };
   
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  }
module.exports = todoList;