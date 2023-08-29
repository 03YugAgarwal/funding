import connectMongo from "@/lib/database";
import User from "@/models/user";

export default async function handler(req,res){
    try{
        await connectMongo();

        const user = await User.findOne(req.body.email);

        const result = user || User.create(req.body)
        res.json({result, message: "Success"});
    }catch(error){
        console.log(error);
        res.json({error});
    }
}