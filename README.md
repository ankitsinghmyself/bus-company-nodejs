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

## Endpoints

### `POST /api/ticket`

Create a new ticket. Requires a `title` and `description` properties in the request body.
`{
      "title": "Trip to New York",
      "description": "I would like to travel to New York on June 15th.",
      "user_id": "60637c8824e4e36a3327c4d8",
      "status": "open"
      }
     `

### `GET /api/ticket/:id/details`

Get the details of a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter.

### `PUT /api/ticket/:id/status`

Update the status of a ticket by ID. Requires the ID of the ticket to be provided in the URL parameter, and a `status` property in the request body.
`{
      "status": "closed"
      }
     `

## Event Listener

The server emits a `ticket-updated` event when a ticket's status is updated. To listen for this event, use the following code:

      ```const eventEmitter = require('./eventEmitter');
      eventEmitter.on('ticket-updated', (ticket) => {
      console.log(Ticket ${ticket._id} updated: ${ticket.status});
      });```

Replace `console.log` with your own code to handle the event.
