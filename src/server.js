const { app } = require('./app');
const { env } = require('./env');
require('dotenv').config();


app.listen(env.PORT || 3001, '0.0.0.0', () => {
  console.log('HTTP Server Running!');
});

