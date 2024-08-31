const clinicRouter = require('./routes/clinicRouter');
const clientRouter = require('./routes/clientRouter');

const express = require('express');
const app = express()
app.use(express.json());
app.use('/api', clinicRouter);
app.use('/api', clientRouter);


// Other middleware and routes can be added here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});