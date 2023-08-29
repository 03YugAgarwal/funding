import connectMongo from "@/lib/database";
import Fund from "@/models/fund";

export default async function handler(req,res){
    try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const fund = await Fund.create(req.body);
        console.log('CREATED DOCUMENT');

        res.json({fund});
    }catch(error){
        console.log(error);
        res.json({error});
    }
}