import { useRef, useState } from "react";
import Header from "./Header";
import { checkData } from "./utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utils/firebase";


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick =() => {

        const message=checkData(email.current.value,password.current.value);
        setErrorMessage(message);

        if(message) return;

        //signIn / signUp firebase logic

        if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            }).catch((error) => {
                //const errorCode = error.code;
                // const errorMessage = error.message;
                setErrorMessage(error.code+"-"+error.message);
            });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
            })
            .catch((error) => {
            //   const errorCode = error.code;
            //   const errorMessage = error.message;
              setErrorMessage(error.code+"-"+error.message);
            });
        }
    }

    return <div>
        <Header />
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg"/>
        </div>

    <form onSubmit={(e) => e.preventDefault()} className="w-1/4 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-800" />}
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-800" />
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-800" />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign in Now."}</p>
    </form>

    </div>
}
export default Login;