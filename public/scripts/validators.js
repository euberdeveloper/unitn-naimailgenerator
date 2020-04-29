function validateNumber(value) {
    return !isNaN(value) && 1 <= value && value <= 4;
}

function validateEmail(value) {
    return !!value && /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);
}

function validateVariant(value) {
    return value === 'Ubuntu' || value === 'Raspberry';
}

function validateMatricola(value) {
    return !!value && /^[0-9]*$/.test(value);
}

function validateText(value) {
    return !!value;
}

function validateFormData(formData) {
    return validateVariant(formData.projectVariant) &&
        validateNumber(formData.componentsNumber) &&
        validateEmail(formData.groupEmail) &&
        formData.components.slice(0, formData.componentsNumber).every(c =>
            validateEmail(c.email) &&
            validateText(c.name) &&
            validateText(c.surname) &&
            validateMatricola(c.matricola)
        )
}