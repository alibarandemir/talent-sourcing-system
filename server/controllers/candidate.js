const Candidate= require('../models/Candidate.js');



  const createCandidate= async (req,res)=>{
    try{
        const candidate= await  Candidate.findOne({"contactInformation.email":req.body.contactInformation.email});
        //aynı emaile sahip aday var mı kontrolü
        
        if(candidate){
            console.log("c")
            return res.json({message:"This candidate already is created"})
        }
        const newCandidate= await Candidate.create(req.body);
        
        
        
        
        res.status(200).json({
            newCandidate:newCandidate,
            message:"New Candidate created successfully"
        })
    }
    catch(e){
        res.status(400).json({
            error:e.message
        })
    }

}



 const getAllCandidates=async(req,res)=>{
    try{
        const candidates= await Candidate.find()
        res.status(200.).json({
            success:"Ok",
            candidates:candidates,
        })
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
    

}

const getCandidateDetail=async(req,res)=>{
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
          return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json({candidate:candidate});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

 const editCandidate=async(req,res)=>{
    try {
        
        console.log(req.date)
        console.log(req.body.interactions[0].date)
        console.log(req.body)
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!candidate) {
          return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log(candidate);
        res.status(200).json({candidate:candidate,message:"Updated successfully"});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }

}


const deleteCandidate=async(req,res)=>{
    try{ 
        
        const deletedCandidate= await Candidate.findByIdAndDelete(req.params.id) //Urlden aldığı id ile silinmek istenen adayı 
                                                                                //siler
        res.status(200).json({
            message:"Candidate deleted successfully"
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
module.exports={createCandidate,getAllCandidates,getCandidateDetail,editCandidate,deleteCandidate}