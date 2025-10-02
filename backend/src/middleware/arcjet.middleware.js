import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet";
import { logger } from "../lib/logger.js";

export const arcjetProtection = async (req,res,next) => {
    try {
        const decision = await aj.protect(req)

        if (decision.isDeniedd()){
            if (decision.reason.isRateLimit()){
                return res.status(429).json({message:"Rate limit exceeded. Please try agian later."});
            } else if (decision.reason.isBot()) {
            return res.status(403).json({message:"Bot access denied."});
            } else {
            return res.status(403).json({
                message :"Access denied by security policy.",
            });
        }
    } 

    // check for spoofed bots
    if (decision.result.some(isSpoofedBot)){

    }

    next();
    } catch (error) {
        console.log("Arcjet Protection Error:",error);
        next();
    }
};