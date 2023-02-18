const jwt=require('jsonwebtoken')
const secretkey='nodeproject@abc'

module.exports=(req,res,next)=>{
    const token=req.headers['authorization'];
    //console.log(token)
    if(token)
    {
        //verify
        jwt.verify(token,secretkey,function(err,decoded)
        {
            if(err)
            {
                res.json({
                    "status":403,
                    "success":false,
                    "message":"Unauthorized User"
                })
            }
            console.log(decoded)
            req.decoded=decoded
            next()
        })
    }
    else{
        res.json({
            'status':403,
            'success':false,
            'message':'Unauthorised user'
        })
    }
}