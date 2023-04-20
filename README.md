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

To create a new ticket, a request body with `name`, `seat`, and `status` properties is required. The status property must be either open or closed, while the seat property must be a number between 1 and 40. The name property must be a string.

Once a ticket is created, its `status` is set to open by default. If a seat is already booked by another user and its status is still `open`, the API will not allow the creation of a new ticket for the same seat number. However, if a ticket for a seat is already `closed`, the API will allow the creation of a new ticket for that `seat` number.

      "name": "Ticket 1",
      "seat": "1",
      "status": "open",

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
