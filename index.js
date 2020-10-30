// require("dotenv").config(); // ??? Follow up if needed?
const server = require('./api/server.js');

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}...`))