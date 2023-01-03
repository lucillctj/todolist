import express, { Express, Request, Response } from 'express';
import { Todo } from './lib/todo.js';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'my-secret-pw',
  database: 'todo'
});

connection.connect(function(error) {
  if (error) {
    return console.error('error: ' + error.message);
  }
  console.log('Connected to the MySQL server.');
});

//requête GET SQL
app.get('/', (_: Request, res: Response) => {
  connection.query(
    'SELECT * FROM todo',
    (error: Error, results) => {
      if (error) throw error;
      else {
        console.log(results);
        return res.send(results.map(r => new Todo(r.id, r.name, r.date)));
      }
    });
});

//requête GET (by id) SQL
app.get('/:id', (req: Request, res: Response) => {
  const idParams = req.params.id;
  connection.query(
    'SELECT DISTINCT * FROM todo WHERE id=?', idParams, (error: Error, results) => {
      if (error) throw error;
      else if (results.length === 0) {
        res.status(400);
        res.send("Id doesn't exist");
      } else {
        res.status(200);
        console.log('Success!');
        res.send(results);
      }
    }
  )
});

//requête POST SQL
app.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  let sql = 'INSERT INTO todo SET ?';
  let postTodo = {
    id: body.id,
    name: body.name,
    date: body.date
  };
  connection.query(sql, postTodo, (error: Error, results) => {
    if (error) {
      res.status(400);
      console.log(results);
      res.send("error !");
      return error;
    }
    else {
      res.status(200);
      return res.send(`New todo created : {id = ${postTodo.id}, name = ${postTodo.name}, date = ${postTodo.date}}`);
    }
  });
});

//requête PUT SQL
app.put('/:id', async (req: Request, res: Response) => {
  const body = req.body;
  const idParams = req.params.id;
  const sql = `UPDATE todo SET name = '${body.name}' WHERE id = ${idParams}`;
  connection.query(sql, (error: Error, results) => {
    if (error) {
      res.status(500);
      return res.send(error);
    }
    else if (results.affectedRows === 0) {
      res.status(400);
      return res.send('No todo found');
    }
    res.status(200);
    return res.send('Todo modified!');
  })
});

//requête DELETE (by id ) SQL
app.delete('/:id', (req: Request, res: Response) => {
  const idParams = req.params.id;
  connection.query(
    'DELETE FROM todo WHERE id=?', idParams, (error: Error, results) => {      
      if (error) throw error;
      else if (results.affectedRows === 0) {
        res.status(400);
        res.send("Id doesn't exist or doesn't have the right format");
      }
      else {
        res.status(200);
        console.log('Success!');
        res.send(`Todo n°${idParams} deleted`);
      }
    })
});

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
