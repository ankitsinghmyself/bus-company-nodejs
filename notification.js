const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('ticket-updated', (ticket) => {
  console.log(`Ticket ${ticket._id} has been updated.`);
  // Send a notification here
});

eventEmitter.on('ticket-created', (ticket) => {
  console.log(`Ticket ${ticket._id} has been created.`);
  // Send a notification here
});

eventEmitter.on('ticket-deleted', (ticketId) => {
  console.log(`Ticket ${ticketId} has been deleted.`);
  // Send a notification here
});

module.exports = eventEmitter;
