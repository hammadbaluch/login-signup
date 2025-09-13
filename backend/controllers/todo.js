const todos=[];
const addTodo=(name)=>{
todos.push(name);
return true;
}
const getAllTodos=()=>{
    return todos;
}
module.exports={
    getAllTodos,
    addTodo
}