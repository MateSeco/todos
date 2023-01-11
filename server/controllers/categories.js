const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../db');
//middleware
app.use(cors());
app.use(express.json()); //gives us access to request the body and get json data

// async function addTodos(req, res) {
//   try {
//     const { description } = req.body;
//     //await waits for the function to complete before it continues
//     const newTodo = await pool.query(
//       'INSERT INTO todo(description) VALUES($1) RETURNING *',
//       [description]
//     );
//     res.json(newTodo.rows[0]);
//     //$1 is a placeholder and desciption is going to be the value
//     console.log(req.body);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

async function getCategories(req, res) {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch {
    console.error(err.message);
  }
}

async function getCategory(req, res) {
  try {
    const { id } = req.params;
    const todo = await pool.query(`SELECT * FROM categories WHERE category_id = ${id} `);
    res.json(todo.rows);
  } catch {
    console.error(err.message);
  }
}
module.exports = {
  getCategories,
  getCategory,
};
