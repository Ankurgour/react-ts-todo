export const saveLocal = (todos:TodoItemType[]):void => {
    localStorage.setItem("mytodos",JSON.stringify(todos));
}