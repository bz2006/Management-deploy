import Catlog from "../models/CatlogModel.js"; 


export const CreateProducts = async (req, res) => {
    try {
        const catlog = req.params.catlog
        const prodlist  = req.body; 

        let productcat = await Catlog.findOne({ catlogname: catlog });

        if (!productcat) {
            productcat = new Catlog({
                catlogname: catlog,
                products: []

            });
            for (const product of prodlist) {
                productcat.products.push({
                  model: product.model,
                  mrp: product.mrp,
                  unitPrice: product.unitPrice,
                  articleNo: product.articleNo,
                });
              }
        } else {

            return res.status(403).json({ error: 'Catlog aldready exist' });
        }


        await productcat.save();

        res.status(200).json({productcat});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const UpdateProducts = async (req, res) => {
    try {
        const catlogid = req.params.id
        const catname = req.body["catname"]
        const prodlist  = []; 
        for (const product of req.body["Models"]) {
            prodlist.push({
              model: product.Model,
              mrp: product.MRP,
              unitPrice: product.unitprice,
              articleNo: product.artno,
            });
          }

        let productcat = await Catlog.findByIdAndUpdate(
            catlogid,
            {
                catlogname:catname,
                products:prodlist
            },
            { new: true }

        )

        if (!productcat) {
            return res.status(404).json({ error: 'Product not found or cannot be updated.' });
        }
        res.json({ message: 'Product updated successfully', updatedProduct: productcat });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getallcatlogs = async (req, res) => {

    try {
        const catlogs = await Catlog.find({});

        if (catlogs.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this user.' });
        }
        return res.json(catlogs);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getCatlogbyname = async (req, res) => {
    const catlog = req.params.catlogname;
console.log(catlog)
    try {
        const rescatlog = await Catlog.find({ catlogname: catlog });

        if (rescatlog.length === 0) {
            return res.status(404).json({ success: false, message: 'No catlog found ' });
        }
console.log(rescatlog[0]["id"])
        return res.json(rescatlog);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const deleteCatlog= async (req, res) => {
    try {
      const  id  = req.params.id;
      await Catlog.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "catlog Deleted Successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while deleting catlog",
        error,
      });
    }
  };
