import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js';
import connect from './db.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);

await connect();

app.listen(8080, () => {
  console.log('Server is running at port 8080');
});
