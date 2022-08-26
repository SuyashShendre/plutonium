
const statusCheck= function ( req, res, next) {
    let {isfreeappuser}=req.headers
    if(isfreeappuser === undefined|| isfreeappuser==""){
        res.send("Request is missing a mandatory header")
    }else{
    req.isFreeAppUser=isfreeappuser;
    next()
    }
}

module.exports.statusCheck= statusCheck