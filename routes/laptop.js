var express = require('express');
var router = express.Router();
var laptopServices = require('../services/laptopService');
var appLogger = require('../logging/appLogger');

//routes

router.get('/getLaptopDetails', function (req, res, next) {
    laptopServices.getLaptopDetails(function (err, details) {
        if (!err) {
            appLogger.info("laptop details retrived");
            res.send(details);
        }
        else {
            appLogger.error({ err: err }, "Error while trying to retrieve laptop details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
});

router.post('/addlaptop', function (req, res, next) {
    laptopServices.addLaptop(req.body,function (err, response) {
        if (!err) {
            appLogger.info("laptop details successfully saved");
            res.send(response);
        }
        else {
            appLogger.error({ err: err }, "Error while saving laptop details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
   
});
router.post('/updatelaptop', function (req, res, next) {
    laptopServices.updateLaptop(req.body,function (err, response) {
        if (!err) {
            appLogger.info("laptop details successfully updated");
            res.send(response);
        }
        else {
            appLogger.error({ err: err }, "Error while updating laptop details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
   
});
router.delete('/deleteLaptop', function (req, res, next) {
    laptopServices.deleteLaptop(req.body.id,function (err, response) {
        if (!err) {
            appLogger.info("user details successfully deleted");
            res.send(response);
        }
        else {
            appLogger.error({ err: err }, "Error while  user details");
            res.status(500).send({ error: err.name, message: err.message });
        }
    });
   
});

module.exports = router;