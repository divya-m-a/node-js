function upload(req,res){
    if(req.file.filename){
        res.status(200).json({
            message:"image uploaded",
            url: req.file.filename
        });
    
    }else{
        res.status(400).json({
            message:"error in uploading",
            
        });

    }
}
module.exports = {
    upload:upload
}