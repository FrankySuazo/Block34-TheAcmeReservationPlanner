# The-Acme-Reservation-Planner
## Overview
In this workshop you will be building an RESTFUL API which calls exported methods from another file. We can think of this other file as our data layer.
## Directions
  You will have a similar setup to the guided practice.
  You will need to create a new repository named the_acme_reservation_planner
  You will have a folder named server in that repository with 2 files within that folder:
    - index.js (will be your express application and setup functions, we called this init in guided practice)
    - db.js (this will be your data layer)

## Your Data Layer (server/db.js) will need to export the following:
Each of these method can be tested in a setup function (we named our init in guided practice) in server/index.js. Make sure each one function works before moving on to the next. Use the guided practice as a reference.

client - a node pg client
createTables method - drops and creates the tables for your application
createCustomer - creates a customer in the database and returns the created record
createRestaurant - creates a restaurant in the database and returns the created record
fetchCustomers - returns an array of customers in the database
fetchRestaurants - returns an array of restaurants in the database
createReservation - creates a reservation in the database and returns the created record
destroyReservation - deletes a reservation in the database
Your Express Application (server/index.js) Should Have the Following RESTFUL Routes
You can test your routes by using curl or POSTMAN

GET /api/customers - returns array of customers
GET /api/restaurants - returns an array of restaurants
GET /api/reservations - returns an array of reservations
POST /api/customers/:id/reservations - payload: an object which has a valid restaurant_id, date, and party_count.
returns the created reservation with a status code of 201
DELETE /api/customers/:customer_id/reservations/:id - the id of the reservation to delete and the customer_id is passed in the URL, returns nothing with a status code of 204
BONUS - add an error handling route which returns an object with an error property.

The Database schema is shown below
Customer
  id (UUID)

  name (STRING)

Restaurant
  id (UUID)

  name (STRING)

Reservation
  id (UUID)

  date (DATE NOT NULL)

  party_count (INTEGER NOT NULL)

  restaurant_id (UUID REFERENCES restaurants table NOT NULL)

  customer_id (UUID REFERENCES customer table NOT NULL) 
