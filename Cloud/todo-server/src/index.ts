import express from 'express';
import mysql from 'mysql2/promise';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';


interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const pool = mysql.createPool({
    host: "database-1.dhwjccabeu31.eu-central-1.rds.amazonaws.com",
    port: 3306,
    user: "root",
    password: "password",
    database: "tasks",
});

const app = express();
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});


app.get('/api/isAlive', async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(true);
});

app.get('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM `todos`'
        );
        res.send(results);
    } catch (err: any) {
        console.log("error")
        next(err)
    }
});

app.post('/api/tasks', async (req: Request, res: Response) => {
    const { id, text, completed }: Todo = req.body;
    try {
        await pool.query(
            'INSERT INTO `todos` (`id`, `text`, `completed`) VALUES (?, ?, ?)',
            [id, text, completed]
        );
        res.status(201).send();
    } catch (err: any) {
        res.status(500).send({ error: err.message });
    }
});

app.put('/api/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text, completed }: Todo = req.body;
    try {
        const result = await pool.query(
            'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
            [text, completed, id]
        );
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query(
            'DELETE FROM todos WHERE id = ?',
            [id]
        );
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

const port = 3010;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
