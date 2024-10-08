const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Movie-Ticket-Booking',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

