# TAM_test

this is a test

INSTALL NODE
INSTALL MONGO
use .env to set the Database name and Mongo URL
brew update
brew tap mongodb/brew
brew install mongodb-community@4.2
START MONGO
brew services start mongodb-community
INSTALL NODE

npm install

# API Login

POST http://localhost:4000/api/login
content-type: application/json

{
"username" : "testUserUsername",
"password" : "qqqAAA11%%"
}
return {token:"token"}

# API Customers

GET http://localhost:4000/api/customers
return all customers

GET http://localhost:4000/api/customers/:id
return customer by id
or {message:error}

###

POST http://localhost:4000/api/customers
content-type: application/json

{
"name":"asdfasdf",
"surname":"asdfasdfasdf"
}

Create a customer
return created customer
or {message:error}

###

PATCH http://localhost:4000/api/customers/:id
content-type: application/json

{
"name":"qwertyu"
}

update a customer
return updated customer
or {message:error}

###

DELETE http://localhost:4000/api/customers/:id

delete a customer
{seccess:boolean}
or {message:error}

###

# API Users

GET http://localhost:4000/api/users
return all users

###

GET http://localhost:4000/api/users/:id
return user by id
or {message:error}

###

POST http://localhost:4000/api/users
content-type: application/json

{
"name" : "testUserName",
"surname" : "testUserSurname",
"username" : "testUserUsername",
"email" : "aaaa@bbbb.cccc",
"password" : "qqqAAA11%%"
}

Create a user
return created user
or {message:error}

###

PATCH http://localhost:4000/api/users/:id
content-type: application/json

{
"name" : "testUserNameTRES",
"surname" : "testUserSurnameTWO",
"username" : "testUserUsernameTWO",
"email" : "aaaa@bbbb.ccccTWO",
"password" : "qqqAAA11%%TWO"
}

update a user
return updated user
or {message:error}

###

DELETE http://localhost:4000/api/users/:id
delete a customer
{seccess:boolean}
or {message:error}
