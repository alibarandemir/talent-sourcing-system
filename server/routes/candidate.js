const express = require('express');
const { getAllCandidates, createCandidate,getCandidateDetail, deleteCandidate, editCandidate } = require('../controllers/candidate');
const convertDate = require('../middleware/dateFormat.js');
const router = express.Router();



router.get('/candidates',getAllCandidates);

router.get('/detail/:id',getCandidateDetail);

router.post('/createCandidate', createCandidate);

router.delete('/detail/:id',deleteCandidate);

router.put('/detail/:id',convertDate,editCandidate);

module.exports=router;