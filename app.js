import 'dotenv/config.js'; // <== THIS MOTHERFUCKER WASTED 2 HOURS, FUCK YOU
import express from 'express';
import path from 'node:path';

// App modules
import indexRouter from './routes/indexRouter.js';
import addRouter from './routes/addRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/new', addRouter);

app.use((err, req, res, next) => {
  console.log('On app level error');
  console.log(err);
  res.status(err.statusCode).render('error', { error: err.message });
});

app.listen(PORT, () => {
  console.log('Server started on: ', PORT);
});
