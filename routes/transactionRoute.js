const Transaction = require("../models/Transaction");
const router = require("express").Router();
const moment = require("moment");

router.post("/add-transaction", async (req, res) => {
    try {
        const newTransaction = await new Transaction(req.body);
        const transaction = await newTransaction.save();
        return res.status(200).json(transaction);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.post("/edit-transaction", async (req, res) => {
    try {
        await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload);
        return res.status(200).json("Transaction Updated Successfully!");
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.post("/delete-transaction", async (req, res) => {
    try {
        await Transaction.findOneAndDelete({_id: req.body.transactionId});
        return res.status(200).json("Transaction Updated Successfully!");
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.post('/get-all-transactions', async (req, res) => {
    const { frequency, selectedRange, type } = req.body;
    try {
        const transactions = await Transaction.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
                },
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                },
            }),
            userId: req.body.userId,
            ...(type !== '全て' && {type})
        });
        return res.status(200).json(transactions);
    } catch (err) {
        return res.status(403).json(err);
    }
})

module.exports = router;