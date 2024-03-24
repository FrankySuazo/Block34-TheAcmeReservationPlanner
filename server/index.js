const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
const port = 8080;
const {
  client,
  createTables,
  createUser,
  createPlace,
  createVacations,
  fetchPlaces,
  fetchUsers,
  fetchVacations,
  destroyVacation,
} = require("./db");

const init = async () => {
  await client.connect();
  await createTables();
  const [Mark, James, Victoria, April, Sam, Philly, Spain, Paris, Ghana] =
    await Promise.all([
      createUser("Mark"),
      createUser("James"),
      createUser("Victoria"),
      createUser("April"),
      createUser("Sam"),

      createPlace("Philly"),
      createPlace("Spain"),
      createPlace("Paris"),
      createPlace("Ghana"),

      destroyVacation,
    ]);

  const [vacayOne, vacayTwo, vacayThree] = await Promise.all([
    createVacations({
      departure_date: "",
      user_id: April.user_id,
      place_id: Paris.place_id,
    }),
  ]);

  console.log(vacayOne);

  console.log(await destroyVacation(vacayOne.vacation_id));

  //Testers on console:
  //console.log(Mark, Paris);
  //console.log(await fetchPlaces());
  //console.log(await fetchUsers());
  //console.log(await fetchVacations());
  console.log(await fetchVacations(), vacayOne);

  app.listen(port, () => {
    console.log("connected at port:" + port + " and the database is seeded");
  });
};
init();
