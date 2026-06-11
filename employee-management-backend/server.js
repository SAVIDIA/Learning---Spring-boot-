require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT =
  process.env.PORT || 5000;

(async () => {
  await db.initialize();

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
})();