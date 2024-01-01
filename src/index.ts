import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./database/data_source";

dotenv.config();

const PORT = process.env.APP_PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    console.log("SUCCESS: Database is connected");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
