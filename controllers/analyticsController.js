import Analytics from "../models/AnalyticsModel.js"


export const UpdateAnalytics = async (req, res) => {
    try {
        const invprofit = req.body["profit"]
        const sold = req.body["sold"]
        const Month = req.body["Month"]
        const updateDate = req.body["updateDate"]
        const year = req.body["year"]


        let analytics = await Analytics.findOne({ monthname: Month });

        if (!analytics) {
            analytics = new Analytics({
                monthname: Month,
                profit: invprofit,
                sold: sold,
                lastupdated: updateDate,
                year: year
            });
        } else {
            analytics.noinv += 1;
            analytics.sold += sold
            analytics.profit += invprofit;
            analytics.lastupdated = updateDate;

        }


        await analytics.save();

        res.status(200).json({ analytics });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const UpdateinitInvoice = async (req, res) => {
    try {
        const invprofit = req.body["profit"]
        const Month = req.body["Month"]
        const sold = req.body["sold"]
        let analytics = await Analytics.findOne({ monthname: Month });

        if (analytics) {
            analytics.sold -= sold
            analytics.profit -= invprofit;
        }

        await analytics.save();

        res.status(200).json({ analytics });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const UpdateinvchAnalytics = async (req, res) => {
    try {
        const invprofit = req.body["profit"]
        const sold = req.body["sold"]
        const Month = req.body["Month"]
        const updateDate = req.body["updateDate"]
        const year = req.body["year"]
        console.log(sold)

        let analytics = await Analytics.findOne({ monthname: Month });

        if (!analytics) {
            analytics = new Analytics({
                monthname: Month,
                profit: invprofit,
                sold: sold,
                lastupdated: updateDate,
                year: year
            });
        } else {
            analytics.sold += sold
            analytics.profit += invprofit;
            analytics.lastupdated = updateDate;

        }


        await analytics.save();

        res.status(200).json({ analytics });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const GetAnalytics = async (req, res) => {

    try {
        const analytics = await Analytics.find({});

        if (analytics.length === 0) {
            return res.status(204).json({ success: false, message: 'No analytics found.' });
        }
        return res.json(analytics);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const DeleteAnalytics = async (req, res) => {

    console.log("delete")
    try {
        const invprofit = req.body["profit"]
        const sold = req.body["sold"]
        const Month = req.body["Month"]
        const updateDate = req.body["updateDate"]
        const year = req.body["year"]


        let analytics = await Analytics.findOne({ monthname: Month });

        if (analytics) {
            analytics.noinv -= 1;
            analytics.sold -= sold
            analytics.profit -= invprofit;
            analytics.lastupdated = updateDate;
        } else {

            res.status(404).json("Analytics not found")
        }


        await analytics.save();

        res.status(200).json({ analytics });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// export const GetAnalyticsby = async (req, res) => {
//     const catlog = req.params.catlogname;
//     console.log(catlog)
//     try {
//         const rescatlog = await Products.find({ catlogname: catlog });

//         if (rescatlog.length === 0) {
//             return res.status(404).json({ success: false, message: 'No catlog found ' });
//         }
//         console.log(rescatlog[0]["id"])
//         return res.json(rescatlog);
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };


