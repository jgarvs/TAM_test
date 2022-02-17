const Isemail = require('isemail');

const PASSWORD_LEN = 8;
const USERNAME_LEN = 8;

class Validator{

        isValidName(name){

                if(!name){
                        return false;
                }

                let regex = /^[a-zA-Z]+$/;
                return regex.test(name);
        }

        isValidSurname(surname){
                if(!surname){
                        return false;
                }
                return this.isValidName(surname);
        }

        isValidPassword(password){
                if(!password){
                        return false;
                }
                const regexStrongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{'+ PASSWORD_LEN +',})');
                return regexStrongPassword.test(password);
        }

        isValidEmail(email){   
                if(!email){
                        return false;
                }     
                //RFC 2822
                const validatorRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                let result = validatorRegex.test(email);

                //extra validation trying to avoid injection
                result = result && Isemail.validate(email);

                return result;

        }

        isValidUsername(username){
                return this.isValidName(username) && username.length >= USERNAME_LEN;
        }

        isNotValidName(name){
                return !this.isValidName(name);
        }

        isNotValidSurname(surname){ 
                return !this.isValidSurname(surname) 
        }

        isNotValidPassword(password){
                return !this.isValidPassword(password)
        }

        isNotValidEmail(email){
                return !this.isValidEmail(email)
        }

        isNotValidUsername(username){
                return !this.isValidUsername(username);
        }


        //TODO: isId
        //TODO:photoField

}

module.exports = new Validator();