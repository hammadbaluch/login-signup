const express =require('express');
const { addTodo, getAllTodos } = require('../controllers/todo');
const router = express.Router();
router.post('/add',(req,res)=>{
addTodo(req.body.data);
res.send("todo Added!");
})
router.get('/',(req,res)=>{
res.send({todos:getAllTodos()});
})
module.exports= router;