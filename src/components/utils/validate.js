export const checkData = (email, password) => {

    if(email && password){
        const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
        const isPasswordValid = /^(?=.*\d)(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(password);

        if(!isEmailValid) return "Email ID is not valid";
        if(!isPasswordValid) return "Password is not valid";
    }

    return null;
}

