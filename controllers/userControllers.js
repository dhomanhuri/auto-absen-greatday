const model = require("../models/index");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
    try {
        let data = await model.User.findAll();
        if (!data) {
            throw "data kosong";
        }
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
};
const add = async (req, res) => {
    try {
        let data = await model.User.create(req.body);
        res.status(200).send({
            status: true,
            message: "success added data",
        });
    } catch (error) {
        res.status(400).send({
            message: "error",
            status: false,
        });
        console.log(error);
    }
};
const dell = async (req, res) => {
    try {
        let data = await model.User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!data) {
            throw "data kosong";
        }
        res.status(200).send({
            success: true,
            message: "success delete data",
        });
    } catch (error) {
        res.status(400).send({
            message: "error",
            status: false,
        });
        console.log(error);
    }
};

module.exports = { index, add, dell };
