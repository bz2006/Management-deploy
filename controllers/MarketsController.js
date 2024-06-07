import Markets from "../models/Marketplaces.js";


export const CreateMarkets = async (req, res) => {
    try {
        const mpname = req.body["marketname"]
        const gst = req.body["gst"]
        const address = req.body["address"]
        const vendorcode = req.body["vendorcode"]
        const Catlog = req.body["Catlog"]
        let Market = await Markets.findOne({ marketname: mpname });

        if (!Market) {
            Market = new Markets({
                marketname: mpname,
                gstNo:gst,
                address:address,
                vendorcode:vendorcode,
                linkedcatlog:Catlog

            });
        } else {

            return res.status(403).json({ error: 'Market aldready exist' });
        }


        await Market.save();

        res.status(200).json({Market});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const GetallMarkets = async (req, res) => {
    try {
      const markets = await Markets.find({});
      res.status(200).send({
        success: true,
        markets,
  
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all markets",
      });
    }
  };
  export const GetMarketbyid = async (req, res) => {
    const id = req.params.id;
    try {
      const markets = await Markets.findById(id);
      const linkedcatlog = markets["linkedcatlog"]
      const vendorcode =markets["vendorcode"]
      res.status(200).send({
        success: true,
        linkedcatlog,vendorcode,markets
  
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all markets",
      });
    }
  };
  
export const UpdateMarket = async (req, res) => {
    try {
        const Marketid = req.params.id
        const mpname = req.body["upmarketname"]
        const gst = req.body["upgst"]
        const address = req.body["upaddress"]
        const vendorcode = req.body["upvendorcode"]
        const Catlog = req.body["upCatlog"]

        let market = await Markets.findByIdAndUpdate(
            Marketid,
            {
                marketname:mpname,
                gstNo:gst,
                address:address,
                vendorcode:vendorcode,
                linkedcatlog:Catlog
            },
            { new: true }

        )

        if (!market) {
            return res.status(404).json({ error: 'Product not found or cannot be updated.' });
        }
        res.json({ message: 'Product updated successfully', updatedmarket: market });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const deleteMarket= async (req, res) => {
    try {
      const  id  = req.params.id;
      await Markets.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "market Deleted Successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while deleting market",
        error,
      });
    }
  };

