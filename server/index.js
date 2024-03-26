const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = 8080;
const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  destroyReservation,
} = require("./db");

const init = async () => {
  await client.connect();
  await createTables();
  const [Mark, James, Victoria, April, Sam, Philly, Spain, Paris, Ghana] =
    await Promise.all([
      createCustomer("Mark"),
      createCustomer("James"),
      createCustomer("Victoria"),
      createCustomer("April"),
      createCustomer("Sam"),

      createRestaurant("Philly"),
      createRestaurant("Spain"),
      createRestaurant("Paris"),
      createRestaurant("Ghana"),

      destroyReservation,
    ]);

  const [vacayOne, vacayTwo, vacayThree] = await Promise.all([
    createRestaurant({
      departure_date: "",
      customers_id: April.customers_id,
      restaurants_id: Paris.restaurants_id,
    }),
  ]);

  console.log(vacayOne);

  console.log(await destroyReservation(vacayOne.revervations_id));

  //Testers on console:
  //console.log(Mark, Paris);
  //console.log(await fetchRestaurant());
  //console.log(await fetchCustomer());
  //console.log(await fetchReservation());
  console.log(await fetchReservation(), vacayOne);

  app.listen(port, () => {
    console.log("connected at port:" + port + " and the database is seeded");
  });
};
init();
