class Depurator{

        depurateName(inputName){

                if(!inputName){
                        throw new Error('input name null');
                }

                return inputName.replace(/ /g,'')
                .toLowerCase();
        }

        depurateSurname(inputSurname){

                if(!inputSurname){
                        throw new Error('input surname null');
                }

                return inputSurname.replace(/ /g,'')
                .toLowerCase();
        }

        depurateUsername(inputUsername){

                if(!inputUsername){
                        throw new Error('input username null');
                }

                return inputUsername.replace(/ /g,'')
                .toLowerCase();
        }

        depurateEmail(inputEmail){

                if(!inputEmail){
                        throw new Error('input username null');
                }

                return inputEmail.replace(/ /g,'')
                .toLowerCase();
        }

}

module.exports = new Depurator();