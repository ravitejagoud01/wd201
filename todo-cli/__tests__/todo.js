/* eslint-disable no-undef */
const todoList = require("../todo.js");

const { all, markAsComplete, add } = todoList();

describe("TodoList test suite", () => {
    beforeAll(() => {
        add({
            title: "test todo",
            completed: false,
            dueDate: new Date().toISOString(),
        });
    });

    test("should add new todo", () => {
        const todoItemscount = all.length;
        add({
            title: "test todo",
            completed: false,
            dueDate: new Date().toISOString(),
        });
        expect(all.length).toBe(todoItemscount + 1);
    });

    test("should mark a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    const getOverdueTodos = () => {
        const today = new Date().toISOString();
        return all.filter(
            (todo) =>
                !todo.completed && new Date(todo.dueDate).toISOString() < today
        );
    };

    const getDueTodayTodos = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter(
            (todo) =>
                !todo.completed &&
                new Date(todo.dueDate).toISOString().split("T")[0] === today
        );
    };

    const getDueLaterTodos = () => {
        const today = new Date().toISOString().split("T")[0];
        return all.filter(
            (todo) =>
                !todo.completed &&
                new Date(todo.dueDate).toISOString().split("T")[0] > today
        );
    };

    test("check retrieval of overdue items", () => {
        const overdueItemsCount = getOverdueTodos().length;
        add({
            title: "Overdue Task",
            completed: false,
            dueDate: new Date(Date.now() - 86400000).toISOString(), // An overdue task
        });
        expect(getOverdueTodos().length).toBe(overdueItemsCount + 1);
    });

    test("check retrieval of due today items", () => {
        const dueTodayItemsCount = getDueTodayTodos().length;
        add({
            title: "Due Today Task",
            completed: false,
            dueDate: new Date().toISOString().split("T")[0], // A task due today
        });
        expect(getDueTodayTodos().length).toBe(dueTodayItemsCount + 1);
    });

    test("check retrieval of due later items", () => {
        const dueLaterItemsCount = getDueLaterTodos().length;
        add({
            title: "Due Later Task",
            completed: false,
            dueDate: new Date(Date.now() + 86400000).toISOString(), // A task due later
        });
        expect(getDueLaterTodos().length).toBe(dueLaterItemsCount + 1);
    });
});
