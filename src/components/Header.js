import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './utils/firebase';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
          }).catch((error) => {
            navigate("/error");
          });
        //console.log(user);
    }

    return (
        <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
            <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo" className="w-44 " />
            {user?.user && <div className = "flex items-center justify-between p-2">
                <img alt="usericon" src={user?.user?.photoURL} className="w-10 h-10" />
                <button className="font-bold text-white" onClick={handleSignOut}>Sign Out</button>
            </div>}
            
        </div>

    )
}

export default Header;