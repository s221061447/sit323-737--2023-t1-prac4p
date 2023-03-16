const express = require("express");
const winston = require('winston');

// Define logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});
   
// Define Express parameters
const app = express();
app.use(express.static(__dirname + '/public'));

const port = 3030;

// Start Server
app.listen(port, () => {
    logger.log({
        level: 'info',
        message: `App listening on port: ${port}`,
    });
});

// Define method for addition
const addTwoNumbers = (n1, n2) => {
    return n1 + n2;
};

// Define method for subtraction
const subtractTwoNumbers = (n1, n2) => {
    return n1 - n2;
};

// Define method for multiplication
const multiplyTwoNumbers = (n1, n2) => {
    return n1 * n2;
};

// Define method for division
const divideTwoNumbers = (n1, n2) => {
    return n1 / n2;
};

// Define endpoint for addition
app.get('/addtwonumbers', (req, res) => {
    log("addition", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = addTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("addition", n1, n2);
});

// Define endpoint for subtraction
app.get('/subtracttwonumbers', (req, res) => {
    log('subtraction', req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = subtractTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("subtraction", n1, n2);
});

// Define endpoint for multiplication
app.get('/multiplytwonumbers', (req, res) => {
    log("multiplication", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = multiplyTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("multiplication", n1, n2);
});

// Define endpoint for division
app.get('/dividetwonumbers', (req, res) => {
    log("division", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = divideTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("division", n1, n2);
});


// Define helper methods
const validateInput = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return false;
    }
    return true;
};

const log = (operation, n1, n2) => {
    logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${n1} ${operation} by ${n2}`
    });
};

const logSuccess = (operation, n1, n2) => {
    logger.log({
        level: 'info',
        message: `${operation} operation successful: ${n1} ${operation} by ${n2}`
    });
};

const logInvalidInput = (n1, n2) => {
    logger.log({
        level: 'error',
        message: `Error performing requested operation due to invalid inputs: ${n1}, ${n2}`
    });
};