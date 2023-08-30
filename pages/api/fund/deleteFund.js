import connectMongo from "@/lib/database";
import Fund from "@/models/fund";

export default async function handler(req, res) {
    try {
      await connectMongo();
      const fund = await Fund.findByIdAndRemove(req.body);
      console.log('DELETED SUCCESFULLY : ', fund);
      res.json({ fund });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
}
