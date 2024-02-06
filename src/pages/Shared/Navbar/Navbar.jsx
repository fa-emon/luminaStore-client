import { BiSolidUserCircle } from 'react-icons/bi';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const isUserLoggedIn = !!user;

    // const [order] = useOrder();
    // const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const navOptions = <>
        <li><Link className="hover:bg-[#fce4ff] hover:text-black tracking-wide" to={'/'}>Home</Link></li>
        <li><Link className="hover:bg-[#fce4ff] hover:text-black tracking-wide" to={'/men'}>Men</Link></li>
        <li><Link className="hover:bg-[#fce4ff] hover:text-black tracking-wide" to={'/women'}>Women</Link></li>
        <li><Link className="hover:bg-[#fce4ff] hover:text-black tracking-wide me-20" to={'/kids'}>Kids</Link></li>
        {
            user ?
                <>
                    <li><Link className="hover:bg-[#fce4ff] hover:text-black tracking-wide" to={''}>Dashboard</Link></li>
                    <li><Link onClick={handleLogOut} className="heading-font hover:bg-[#fce4ff] hover:text-black tracking-wide ">LogOut</Link></li>
                </>
                :
                <>
                    <li><Link className="hover:bg-[#fce4ff] hover:text-black ms-40" to={'/login'}>Log In</Link></li>
                    <li><Link className="hover:bg-[#fce4ff] hover:text-black me-16" to={'/register'}>Sign Up</Link></li>
                </>
        }
    </>

    return (
        <>
            <div className="navbar opacity-95 text-[#fce4ff] bg-black fixed z-10 px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 heading-font">
                            {navOptions}
                        </ul>
                    </div>
                    <div>
                        <Link to={'/'} className="btn btn-ghost text-xl heading-font uppercase">
                            <h2 className='neon-light'>
                                <span className='text-[#CBE8EE]'>lumina</span>
                                <span className='text-[#FCE4FF]'>Store</span>
                            </h2>
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 heading-font tracking-wide text-lg text-[#fce4ff]">
                        {navOptions}
                    </ul>
                </div>

                <div className="navbar-end w-0 tracking-wide">
                    {isUserLoggedIn ?
                        <>
                            <div className="tooltip tooltip-left all-font" data-tip={user?.displayName}>
                                <img
                                    src={user?.photoURL}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="tooltip tooltip-left" data-tip={'No User Found'}>
                                <BiSolidUserCircle className="w-10 h-10 rounded-full mr-2 bg-[#202020]"></BiSolidUserCircle>
                            </div>
                        </>
                    }
                </div>

            </div>
        </>

    );
};

export default Navbar;