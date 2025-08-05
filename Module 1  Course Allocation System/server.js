// server.js
require('dotenv').config(); // ⬅️ Load env variables before anything else

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
