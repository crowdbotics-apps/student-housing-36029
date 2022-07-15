
let regPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
let regName = /^[a-zA-Z\s]+$/;
export const isEmailValid = (email='') => (email.includes('@') && email.includes('.'))
export const isPhoneNumberValid = (phoneNumber='') => (!isEmpty(phoneNumber) && isMinLength(phoneNumber,12) && phoneNumber.startsWith('+1'))
export const isPasswordValid = (password) => (regPassword.test(password))
export const isNameValid = (name) => (regName.test(name))
export const isEmpty = (param="") => (param.trim().length===0)
export const isMinLength = (param="",minLength) => (param.trim().length >= minLength)

export const validateSignup1 = (formValues) => {
    for (const key in formValues) {
        if(key === 'firstName') {
            if(isEmpty(formValues[key])) { alert('First Name field is required'); return false; }
            if(!isNameValid(formValues[key])){ alert('Please enter a valid name (alphabets only)'); return false; }
        }
        if((key === 'phone') && isEmpty(formValues[key])){
            alert('Phone field is required'); return false;
        }
        if(key === 'email'){
            if(isEmpty(formValues[key])) { alert('Email address is required'); return false; }
            if(!isEmailValid(formValues[key])) { alert('Please enter a valid email address'); return false; }
        } 
        if(key === 'password') {
            if(isEmpty(formValues[key])) { alert('Password is required'); return false; }
            if(!isPasswordValid(formValues[key])) { alert('Password must contain letters and numbers, and must be 08 characters long'); return false; }
        } 
        return true;
    }
}
export const validateAccountInfo = (formValues) => {
        if(formValues['firstName'].length == 0){
            alert('First Name field is required'); return false;
        }
        if(formValues['lastName'].length == 0){
            alert('Last Name field is required'); return false;
        }
        if(formValues['email'].length == 0){
            alert('Email field is required'); return false;
        }
        if(formValues['zipcode'].length == 0){
            alert(`Zipcode field is required`); return false;
        }
        // if(formValues['secondLanguage'].length == 0){
        //     alert(`Second Language${errorMsgs['select']}`); return false;
        // }
        return true;
}
export const validateSignup2  = (formValues) => {
        if(formValues['country'].length == 0){
            alert(`Country${errorMsgs['select']}`); return false;
        }
        if(formValues['language'].length == 0){
            alert(`Language${errorMsgs['select']}`); return false;
        }
        // if(formValues['secondLanguage'].length == 0){
        //     alert(`Second Language${errorMsgs['select']}`); return false;
        // }
        return true;
}


export const validateLoginForm = (formValues) => { 
    if(isEmpty(formValues.email) || isEmpty(formValues.password)) {
        alert('Please enter your email/password to login.'); return false;
    }
    for (const key in formValues) {
        if(key === 'email' && !isEmailValid(formValues[key])){
            alert('Please enter a valid email address'); return false;
        } 
        else if(key === 'password' && !isPasswordValid(formValues[key])){
            alert('Password must contain letters and numbers, and must be 08 characters long'); return false;
        } 
        else return true;
    }
}

export const validateResetPassword = (formValues) => {
    for (const key in formValues) {
        if(key == 'password' && !isPasswordValid(formValues[key]))
        { alert('Old Password must contain letters and numbers, and must be 08 characters long'); return false; }
        if(formValues['password'] !== formValues['confirmPassword'])
        { alert('Passwords do not match!'); return false; }
    }
    return true
}
export const validateChangePassword = (formValues) => {
    for (const key in formValues) {
        if(key == 'password' && !isPasswordValid(formValues[key]))
        { alert('New Password must contain letters and numbers, and must be 08 characters long'); return false; }
        if(formValues['password'] !== formValues['confirmPassword'])
        { alert('Passwords do not match!'); return false; }
    }
    return true
}


const errorMsgs = {
    empty: ' cannot be empty!',
    select: ' not selected!',
}; 