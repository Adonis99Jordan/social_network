import express from 'express';
// import apiRoutes from "./routes/index"
import connection from './config/connection.js';
import router from './routes/index.js';
// import Thought from './models/Thought.js';
// import Thought from "./models/Thought";
import { thoughtRouter } from './routes/thoughts.js';
const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(thoughtRouter);
connection.once('open', async () => {
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});
