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
//code qui fonctionne
app.get('/', (_: Request, res: Response) => {
  connection.query(
    'SELECT * FROM todo ORDER BY date',
    (error: Error, results) => {
      if (error) throw error;
      else {
        console.log(results);
        return res.send(results.map(r => new Todo(r.id, r.name, r.date)));
      }
    });
});

//requête GET (by id) SQL
//code qui fonctionne
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
 
// //requête GET (by id)
// app.get('/:id', (req: Request, res: Response) => {
//   const idTodo = req.params.id;
//   if (Number.isNaN(Number(idTodo))) {
//     res.status(400);
//     res.send("Id doesn't have the right format");
//   } else {
//     const todo = todos.filter((t) => t.id === parseInt(idTodo));
//     if (todo.length == 1) {
//       res.status(200);
//       res.send(JSON.stringify(todo));
//     } else {
//       res.status(400);
//       res.send("Id doesn't exist");
//     }
//   }
// });

//requête POST SQL
//code qui fonctionne
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
//code fonctionne
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

// //requête PUT
// app.put('/', (req: Request, res: Response) => {
//   const body = req.body;
//   if (body.id && body.name && body.date) {
//     let todo = todos.find((t) => t.id === body.id);
//     if (todo) {
//       const index = todos.indexOf(todo);
//       todo = { ...todo, name: body.name };
//       todos.splice(index, 1, todo);
//       res.status(200);
//       res.send(todo);
//       console.log(`Todo n°${todo.id} replace successfull`);
//       console.log(todos);
//     }
//     else {
//       res.status(400);
//       res.send(`Id n°${body.id} doesn\'t exist`);
//       console.log(`Id n°${body.id} doesn\'t exist`);
//       console.log(todos);
//     }
//   }
//   else {
//     res.status(400);
//     res.send('Params not OK');
//     console.log(`Params not OK`);
//   }
// });

// //requête PUT by id
// app.put('/:id', (req: Request, res: Response) => {
// const idTodo = req.params.id;
// const body = req.body;
//   if (Number.isNaN(Number(idTodo))) {
//     res.status(400);
//     res.send("Id doesn't have the right format");
//   } else {
//     let todo = todos.find((t) => t.id === parseInt(idTodo));
//     if (todo) {
//       const index = todos.indexOf(todo);
//       todo = { ...todo, name: body.name };
//       todos.splice(index, 1, todo);
//       res.status(200);
//       res.send(todo);
//       console.log(`Todo n°${todo.id} replace successfull`);
//       console.log(todos);
//     } else {
//       res.status(400);
//       res.send(`Id n°${todo.id} doesn't exist`);
//     }
//   }
// });


//requête DELETE (by id ) SQL
// code fonctionne
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

//requête DELETE SQL
/*app.delete('/', async (req: Request, res: Response) => {
  const body = req.body;
  let sql = 'DELETE FROM todo WHERE ?';
  let post = {
    id: body.id,
    name: body.name,
    date: body.date
  };
  connection.query(sql, post, (error: Error, results) => {
    if (error) throw error;
    const index = todos.indexOf(post);
    todos.splice(index, 1);
    res.status(200);
    console.log(results);
    console.log(todos);
    return res.send(`Todo n°${todos[0].id} deleted`)

  });
});**/

// //requête DELETE
// app.delete('/', (req: Request, res: Response) => {
//   const body = req.body;
//   if (body.id && body.name && body.date) {
//     let todo = todos.find((t) => t.id === body.id);
//     if (todo) {
//       const index = todos.indexOf(todo);
//       todos.splice(index, 1);
//       res.status(200);
//       res.send(todo);
//       console.log(`Todo n°${todo.id} deleted`);
//       console.log(todos);
//     }
//     else {
//       res.status(400);
//       res.send(`Id n°${body.id} doesn\'t exist`);
//       console.log(`Id n°${body.id} doesn\'t exist`);
//       console.log(todos);
//     }
//   }
//   else {
//     res.status(400);
//     res.send('Params not OK');
//     console.log('Params not OK');
//   }
// });

// //requête DELETE by id
// app.delete('/:id', (req: Request, res: Response) => {
//   const idTodo = req.params.id;
//   if (Number.isNaN(Number(idTodo))) {
//     res.status(400);
//     res.send("Id doesn't have the right format");
//   } else {
//     // const todo = todos.find((t) => t.id === parseInt(idTodo));
//     // if (todo) {
//     //   const index = todos.indexOf(todo);
//       const todo = todos.filter((t) => t.id === parseInt(idTodo));
//       // const todo = [
//       //   new Todo(1, 'test', new Date())
//       // ];

//       if (todo.length == 1) {
//         const index = todos.indexOf(todo[0]);
//         todos.splice(index, 1);
//         res.status(200);
//         res.send(todos);
//         console.log(`Todo n°${todo[0].id} deleted`);
//         console.log(todos);
//     } else {
//       res.status(400);
//       res.send(`Id n°${todo[0].id} doesn't exist`);
//     }
//   }
// });

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
