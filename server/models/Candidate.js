const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Mongoose şeması
const InteractionSchema = new mongoose.Schema({
    type: String,
    content: String,
    date: String,
    candidateResponded: Boolean
  });
  
  const CandidateSchema = new mongoose.Schema({
    name: String,
    surname: String,
    contactInformation: {
      phone: String,
      email: String
    },
    candidateStatus: String,
    interactions: [InteractionSchema]
  });
  

  

module.exports = mongoose.model('Candidate', CandidateSchema);