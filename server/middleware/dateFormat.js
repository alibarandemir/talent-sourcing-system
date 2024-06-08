const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ayları 0-11 arasında alır, bu yüzden +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



 const convertDate=(req,res,next)=>{
    console.log("ddf")
    console.log(req.body)

        for(let i=0;i<req.body.interactions.length;i++){
            const isoDate= req.body.interactions[i].date;
            console.log(isoDate)
            req.body.interactions[i].date=formatDate(isoDate);
            req.date= formatDate(isoDate)
            
            
        }
        
        
    
    next();
}
module.exports= convertDate;