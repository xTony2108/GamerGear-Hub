
const express = require("express");
const { Discount } = require("../../db");

const app = express.Router();

/**
 * @path /api/discounts
 */

app.post("/", async (req, res) => {
    const { discountCode } = req.body;

    try {
        const codeExists = await Discount.findOne({ discountCode }, "id percentage", { lean: true });

        if (!codeExists) return res.status(404).json({ message: "Codice sconto inesistente" });

        return res.status(200).json({ discount: codeExists.percentage, message: "Sconto applicato con successo!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = app;