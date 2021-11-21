import express from 'express';
import { json, urlencoded } from 'body-parser';

import { apiPort } from './util/config';
import apiRoutes from './route/index.route';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use('/api', apiRoutes);

app.listen(apiPort, () => {
  console.log(`Server listening on http://localhost:${apiPort}/ ...`);
});
