/*************************************************************************************
* WEB322 - 2241 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : GITIKA CHOUHAN
* Student ID    : 169812514
* Course/Section: WEB322/NAA
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
 
const mealKitUtil = require('./modules/mealkit-util');

//set-up dotenv
const dotenv = require("dotenv");
dotenv.config({path: ".config/keys.env"});

//set-up express
const app = express();


//set-up ejs
app.set("view engine", "ejs")
app.set("layout", "layouts/main");
app.use(expressLayouts);

//set-up body-parser
app.use(express.urlencoded({extended: true}));


//set-up assets folder so it is public
app.use(express.static(path.join(__dirname, "/assets")));


//set-up views directory a 

app.get('/', (req, res) => {
    res.render("assignment-2/views/home", {
        title: "Home Page"
    });
});
app.get('/on-the-menu', (req, res) => {
  const allMealKits = mealKitUtil.getAllMealKits();

  res.render('on-the-menu', {mealKits : allMealKits});
});
//render sign-up page with the validation-logic
app.get('/sign-up', (req, res) => {
    res.render("views/sign-up", {
        title: "Sign-up",
        values: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationMessage: {}
    });
});

//validation-login for sign-up page
app.post("/sign-up", (req, res) => {
    console.log(req.body);

    const{firstName, lastName, email, password} = req.body;

    let passedValidation = true;
    let validationMessage = {};
    
    //validation for the firstName
    if(typeof firstName !== "string" || firstName.trim().length === 0){
        passedValidation = false;
        validationMessage.firstName = "You must specify a first name.";
    }
    else if (typeof firstName !== "string" || firstName.trim().length <= 2){
        passedValidation = false;
        validationMessage.firstName = "The first name should be at least 2 characters.";
    }

    //validation for the email
    let verifyEmail = "/^[^\s@]+[^\s@]+.[^\s@]+$";
    if(verifyEmail !== true){
    passedValidation = false;
    validationMessage.email = "You must specify a valid email"
    };

    //validation for the password
     let passwordLength = /^.{8,12}$/;
     let lowerCaseLetters = /[a-z]/;
     let upperCaseLetters = /[A-Z]/;
     let numbersValid = /[0-9]/;
     let symbolValid = /[!@#$%^&*()_+[\]{};":"\\|,.<>/?]/;

     if(password !== passwordLength && password.match(lowerCaseLetters) !== true && password.match(upperCaseLetters) !== true && password.match(numbersValid) !== true && password.match(symbolValid) !== true){
        passedValidation = false;
        validationMessage.password = "Password must contains a lowercase letter, a capital case letter, a number, a special symbol and must be of 8-12 letters long. "
     };

    if(passedValidation){
        //send the email
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

        const msg ={
            to: "nick.romanidis@gmail.com",
            from: "nick.romandis@senecacollege.ca",
            subject: "sign-up submission form",
            html:
            `Customer's Full Name: ${firstName} ${lastName} <br>
            Welcome to Meal Mingle :)) <br> <br>
            Created by @gitikaChouhan`
        };
        
        sgMail.send(msg)
        .then(() => {
            
            res.render("views/welcome");
        })
        .catch(err => {
            console.log(err);
            res.render("views/sign-up", {
                title: "sign-up",
                values: req.body,
                validationMessage
            });
        });
    } 
    else {
        res.render("views/sign-up", {
            title: "Sign-up",
            values: req.body,
            validationMessage
        });
    }
});
//render log-in page
pp.get('/sign-up', (req, res) => {
    res.render("views/sign-up", {
        title: "Sign-up",
        values: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationMessage: {}
    });
});

//validation-login for sign-up page
app.post("/log-in", (req, res) => {
    console.log(req.body);

    const{firstName, lastName, email, password} = req.body;

    let passedValidation = true;
    let validationMessage = {};
    
    //checking for the null or empty value
    if(typeof firstName !== "string" || firstName.trim().length === 0){
        passedValidation = false;
        validationMessage.firstName = "You must specify a first name.";
    }
    else if (typeof firstName !== "string" || firstName.trim().length <= 2){
        passedValidation = false;
        validationMessage.firstName = "The first name should be at least 2 characters.";
    }
});











// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});


// *** DO NOT MODIFY THE LINES BELOW ***

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);