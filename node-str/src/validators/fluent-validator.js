'use strict'

let errors = []

function ValidationContract() {
    errors = []
}

ValidationContract.prototype.isRequired = (value, message, componentName = "") => {
    if (!value || value.length <= 0)
        errors.push({ component: componentName, message: message })
}

ValidationContract.prototype.hasMinLen = (value, min, message, componentName = "") => {
    if (!value || value.length < min)
        errors.push({ component: componentName, message: message })
}

ValidationContract.prototype.hasMaxLen = (value, max, message, componentName = "") => {
    if (!value || value.length > max)
        errors.push({ component: componentName, message: message })
}

ValidationContract.prototype.errors = () => {
    return errors
}

ValidationContract.prototype.clear = () => {
    errors = []
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0
}

module.exports = ValidationContract