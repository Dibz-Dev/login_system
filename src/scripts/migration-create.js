const yargs = require("yargs");

const { execSync } = require("child_process");

const concatMigrationName = (description) => {
  return description.replace(/\s/g, "_");
};

const {
  _: [name],
} = yargs.argv;

const migrationPath = `src/database/migrations/${concatMigrationName(name)}`;

execSync(`typeorm migration:create ${migrationPath}`, { stdio: "inherit" });
