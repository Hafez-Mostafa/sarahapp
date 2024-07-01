export const asyncHandling = (fn) => {
    return (req, res, next) => {
        fn(req, res, next)
            .catch((err) => {
                next(err)
            })
    }

}


export const globalErrorHandling = (err,req,res,next)=>{
    if(res.headersSent) return next(err)
    res.status(err.status || 400).json({msg:'Error',err:err.message})

} 