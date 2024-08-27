import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid, email, displayName, photoURL}));
                navigate("/browse");
            } else {
              dispatch(removeUser());
              navigate("/");
            }
          });

          //when component unloads then unsubscribe
          return () => unsubscribe();
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {
          }).catch((error) => {
            navigate("/error");
          });
        //console.log(user);
    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
        if(!showGptSearch) {
            dispatch(changeLanguage("en"));
        }
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
            <img src= {LOGO}
                alt="logo" className="w-44 " />
            {user?.user && <div className = "flex items-center justify-between p-2">
                {showGptSearch && (<select className="py-2 px-4 mt-2 bg-red-800 text-white" onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>)}
                <button className='py-2 px-4 mx-4 mt-2 bg-red-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Home Page" : "GPT Search"}</button>
                <img alt="usericon" src={user?.user?.photoURL} className="w-10 h-10" />
                <button className="font-bold text-white" onClick={handleSignOut}>Sign Out</button>
            </div>}
            
        </div>

    )
}

export default Header;