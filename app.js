import 'dotenv/config.js'; // <== THIS MOTHERFUCKER WASTED 2 HOURS, FUCK YOU
import express from 'express';
import path from 'node:path';

// App modules
import indexRouter from './routes/indexRouter.js';
import addRouter from './routes/addRouter.js';
import deleteRouter from './routes/deleteRouter.js';
import editRouter from './routes/editRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/new', addRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);
app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.render('error', { error: err.message });
});

app.listen(PORT, () => {
  console.log('Server started on: ', PORT);
});
