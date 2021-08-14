var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const PropertyDetail = require("../models/property")

/* GET PropertyDetail listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


// getting all PropertyDetails from the database
router.get('/getall', function (req, res, next) {
    PropertyDetail.find({}, (error, PropertyDetails) => {
        if (error) {
            res.status(500).send({ "status": false, "message": "failed to get all PropertyDetails.", "result": error });
        } else {
            if (PropertyDetails.length == 0) {
                res.status(200).send({ "status": true, "message": "No PropertyDetail found", "result": [] })
            } else {
                var data = {
                    "propertyDetails": PropertyDetails,
                };
                res.status(200).send({ "status": true, "message": "PropertyDetail found successfully", "result": data });
            }
        }
    })
})


// retrive perticualr PropertyDetails
router.get('/getDetails', function (req, res, next) {
    body = req.query;
    PropertyDetail.find({ _id: body.propertyId }, (error, PropertyDetails) => {
        if (error) {
            res.status(500).send({ "status": false, "message": "failed to get PropertyDetails details.", "result": error });
        } else {
            if (PropertyDetails.length == 0) {
                res.status(200).send({ "status": true, "message": "PropertyDetails not found with this email id.", "result": "" })
            } else {
                res.status(200).send({ "status": true, "message": "PropertyDetails found with this email id. ", "result": PropertyDetails })
            }
        }
    })
});

// add new PropertyDetails
router.post('/add', function (req, res, next) {
    console.log(req.body)
    PropertyDetail.create({
        ownername: req.body.ownername,
        price: req.body.price,
        area: req.body.area,
        location: req.body.location
    }, (error, PropertyDetails) => {
        if (error) {
            res.status(500).send({ "status": false, "message": "failed to store PropertyDetail details.", "result": error });
        } else {
            res.status(200).send({ "status": true, "message": "PropertyDetail created successfully", "result": PropertyDetails })
        }
    });
});

//delete PropertyDetail
router.delete('/delete', function (req, res, next) {
    body = req.body;
    console.log(req)
    PropertyDetail.deleteOne({ _id: body.propertyId }, (error) => {
        if (error) {
            console.log("Error while deleteing PropertyDetail record ", error)
            res.status(500).send({ "status": false, "message": "failed to delete PropertyDetail.", "result": error })
        } else {
            res.status(200).send({ "status": true, "message": "PropertyDetail deleted successfully", "result": "" })
        }
    })
});

//delete PropertyDetail
router.post('/sold', function (req, res, next) {
    body = req.body;
    console.log(body)
    PropertyDetail.findOneAndUpdate({ _id: body.propertyId }, { status: body.status }, { useFindAndModify: false }, (error) => {
        if (error) {
            console.log("Error while deleteing PropertyDetail record ", error)
            res.status(500).send({ "status": false, "message": "failed to update property status details.", "result": error })
        } else {
            res.status(200).send({ "status": true, "message": "PropertyDetail status update successfully", "result": "" })
        }
    })
});

// update PropertyDetail
router.post('/update', function (req, res, next) {
    console.log(req.body)
    body = req.body;
    PropertyDetail.findOneAndUpdate({ _id: body.propertyId }, { name: body.ownername, price: body.price, area: body.area }, { useFindAndModify: false }, (error, details) => {
        if (error) {
            res.status(500).send({ "status": true, "message": "Updating PropertyDetail details failed", "result": error })
        } else {
            res.status(200).send({ "status": true, "message": "PropertyDetail updated successfully", "result": details })
        }
    });
});

// seach PropertyDetail
router.post('/search', function (req, res, next) {
    filter = body.area != "" ? { area: body.area } : {};
    PropertyDetail.find(filter, (error, PropertyDetails) => {
        if (error) {
            res.status(500).send({ "status": false, "message": "failed to get all PropertyDetail details.", "result": error });
        } else {
            if (PropertyDetails.length == 0) {
                res.status(200).send({ "status": true, "message": "No PropertyDetail found", "result": [] })
            } else {
                var data = {
                    "PropertyDetail": PropertyDetails,
                };
                res.status(200).send({ "status": true, "message": "PropertyDetails found successfully", "result": data });
            }
        }
    })
});

router.post('/mypost', function (req, res, next) {
    body = req.body;
    filter = {ownername:body.ownername}
    PropertyDetail.find(filter, (error, PropertyDetails) => {
        if (error) {
            res.status(500).send({ "status": false, "message": "failed to get all PropertyDetail details.", "result": error });
        } else {
            if (PropertyDetails.length == 0) {
                res.status(200).send({ "status": true, "message": "No PropertyDetail found", "result": [] })
            } else {
                var data = {
                    "PropertyDetail": PropertyDetails,
                };
                res.status(200).send({ "status": true, "message": "PropertyDetails found successfully", "result": data });
            }
        }
    })
});

module.exports = router;
