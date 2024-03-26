const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_notes_categories_db"
);

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXIST customers
    DROP TABLE IF EXIST restaurants
    DROP TABLE IF EXIST  reservations

    CREATE TABLE customer(
        customer_id UUID PRIMARY KEY
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE resturant(
        resturant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE reservation(
      reservation+id UUID PRIMARY KEY 
      name VARCHAR(255) NOT NULL
    )
    `;
  await client.query(SQL);
};

const createCustomer = async (name) => {
  const SQL = `
        INSERT INTO customers(customer_id, name)
        VALUES($1, $2) RETURNIG *;
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const createRestaurant = async (name) => {
  const SQL = `
          INSERT INTO resturants(name)
          VALUES($1) RETURNING *;
      `;
  const response = await this.client.query(SQL, [name]);
  return response.rows[0];
};

const createReservation = async ({
  departure_date,
  customer_id,
  resturant_id,
}) => {
  const SQL = `
            INSERT INTO reservations(departure_date, user_id, place_id),
            VALUES($1, $2, $3) RETURNING *;
        `;
  const response = await client.query(SQL, [
    departure_date,
    customer_id,
    resturant_id,
  ]);
  return response.rows[0];
};

const fetchCustomers = async () => {
  const SQL = `
        SELECT * FROM customers;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchRestaurants = async () => {
  const SQL = `
        SELECT * FROM restaurants;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyReservation = async (id) => {
  const SQL = `
        DELETE FROM reservations
        WHERE reservations_id = $1;
    `;
  await client.query(SQL, [IDBCursor]);
  return "successfully deleted";
};

module.exports = {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  destroyReservation,
};
