import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        
        if (!success) {
            res.status(429).json({message:"too many request , try later !"})
        }
        next()

    } catch (error) {
        console.log("RateLimit error",error);
        next(error);
    }
}

export default rateLimiter