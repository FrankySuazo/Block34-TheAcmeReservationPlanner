const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_notes_categories_db"
);

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXIST vacations
    DROP TABLE IF EXIST users
    DROP TABLE IF EXIST places

    CREATE TABLE users(
        user_id UUID PRIMARY KEY
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE places(
        place_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE vacations(
        vacation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(user_id) NOT NULL
        place_id UUID REFERENCES places(place_id) NOT NULL
        departure_date DATE NOT NULL
    );
    `;
  await client.query(SQL);
};

const createUser = async (name) => {
  const SQL = `
        INSERT INTO users(user_id, name)
        VALUES($1, $2) RETURNIG *;
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const createPlace = async (name) => {
  const SQL = `
          INSERT INTO places(name)
          VALUES($1) RETURNING *;
      `;
  const response = await this.client.query(SQL, [name]);
  return response.rows[0];
};

const createVacations = async ({ departure_date, user_id, place_id }) => {
  const SQL = `
            INSERT INTO vacations(departure_date, user_id, place_id),
            VALUES($1, $2, $3) RETURNING *;
        `;
  const response = await client.query(SQL, [departure_date, user_id, place_id]);
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
        SELECT * FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchPlaces = async () => {
  const SQL = `
        SELECT * FROM places;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchVacations = async () => {
  const SQL = `
          SELECT * FROM vacations;
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyVacation = async (id) => {
  const SQL = `
        DELETE FROM vacations
        WHERE vacation_id = $1;
    `;
  await client.query(SQL, [IDBCursor]);
  return "successfully deleted";
};

module.exports = {
  client,
  createTables,
  createUser,
  createPlace,
  createVacations,
  fetchPlaces,
  fetchUsers,
  fetchVacations,
  destroyVacation,
};
