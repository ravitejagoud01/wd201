/* eslint-disable no-undef */
const todoList = require("../todo.js");

const {all, markAsComplete , add} = todoList()

describe("TodoList test suite", () => {
    beforeAll(() => {
        add({
            title:"test todo",
            completed : false,
            dueDate: new Date().toISOString()
        })
    })
    test("should add new todo" , () => {
        const todoItemscount = all.length;
        add({
            title:"test todo",
            completed : false,
            dueDate: new Date().toISOString()
        })
        expect(all.length).toBe(todoItemscount + 1)
    })
    test("should mark a todo as complete" , () => {
        expect(all[0].completed).toBe(false)
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
     
test("check retrieval of overdue items" , () => {
    const today = new Date().toISOString();
    const yesterday = new Date(Date.now() - 86400000).toISOString(); 

    add({
        title: "test todo",
        completed: false,
        dueDate: yesterday 
    });
    const overdueItems = all.filter(todo => {
        const dueDate = new Date(todo.dueDate).toISOString();
        return dueDate < today && !todo.completed; 
    });

    expect(overdueItems.length).toBe(2); 
    expect(overdueItems[0].title).toBe("test todo");
});  
 
test("check retrieval of due today items" , () => {
    const today = new Date().toISOString();
    add({
        title: "test todo",
        completed: false,
        dueDate: today 
    });
    const overdueItems = all.filter(todo => {
        const dueDate = new Date(todo.dueDate).toISOString();
        return dueDate === today && !todo.completed; 
    });

    expect(overdueItems.length).toBe(1); 
    expect(overdueItems[0].title).toBe("test todo");
})
test("check retrieval of due later items" , () => {
    const today = new Date().toISOString();
    const tomorrow = new Date(Date.now() + 86400000).toISOString(); 

    add({
        title: "test todo",
        completed: false,
        dueDate: tomorrow 
    });
    const overdueItems = all.filter(todo => {
        const dueDate = new Date(todo.dueDate).toISOString();
        return dueDate > today && !todo.completed; 
    });

    expect(overdueItems.length).toBe(1); 
    expect(overdueItems[0].title).toBe("test todo");
})
})