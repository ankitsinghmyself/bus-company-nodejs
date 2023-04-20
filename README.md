# Bus Company Ticketing System

This is a Node.js-based ticketing system for a bus company. It allows users to create and manage their bus tickets, update the status of their tickets, and view their ticket details.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Setup

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install the dependencies.
3. Run `npm start` or `npm run dev` to start the server.
4. The server will be running on `http://localhost:3000`.

### Postman

Postman can be used to test the endpoints. The Postman collection can be imported from the following link:
https://api.postman.com/collections/2693321-c73d8e48-747e-4c13-b9c9-161f6756494b?access_key=PMAT-01GYFE3E78T7A7WFM73XFS0ZC6

## Endpoints

### `POST /api/ticket`

Create a new ticket. Requires a `title` and `description` properties in the request body.

      "title": "Trip to New York",
      "description": "I would like to travel to New York on June 15th.",

### `GET /api/ticket/:id/details`

Get the details of a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter.

### `PUT /api/ticket/:id/status`

Update the status of a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter, and a `status` property in the request body.

      "status": "closed"

### `GET /api/tickets/open`

Get all open tickets.

### `GET /api/tickets/closed`

Get all closed tickets.

### `PUT /api/ticket/:id/user`

add user details to a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter, and a `user` property in the request body.

      "user": {
        "name": "John Doe",
        "email": "example@gmail.com",
      }

### `GET /api/ticket/:id`

Get the details of a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter.

### `GET /admin/reset`

Reset the server and make all tickets open.

## Event Listener

The server emits a `ticket-updated` event when a ticket's status is updated. To listen for this event, use the following code:

      const eventEmitter = require('./notification');
      eventEmitter.on('ticket-updated', (ticket) => {
      console.log(Ticket ${ticket._id} updated: ${ticket.status});
      });

Replace `console.log` with your own code to handle the event.
