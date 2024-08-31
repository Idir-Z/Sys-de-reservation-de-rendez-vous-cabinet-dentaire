// validators.js
const express = require('express')
const passwordValidator = require('password-validator')
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(49)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


function validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    return emailRegex.test(email);
    
}
function validateInt(id) {
    for (let i = 0; i < id.length ; i++) {
        if (!/^\d$/.test(id[i])) {
            return NaN; // or throw new Error('Invalid input');
        }
    }
    return parseInt(id, 10);
}

function validatePasswordStrength(password) {
return schema.validate(password)
}

function validateStringLength(inputString, minLength, maxLength) {
    // String length validation logic
}

function validateDate(dateString) {
    // Date validation logic
}

function sanitizeInput(input) {
    // Input sanitization logic
}
function validateUserName(userName) {
    if (typeof userName == 'string') return true
    else return false;
}

module.exports = {
    validateUserName,
    validateEmail,
    validatePasswordStrength,
    validateStringLength,
    validateDate,
    validateInt,
    sanitizeInput
};
