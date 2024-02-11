import { useContext } from 'react';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';


const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleWithGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user)

                const saveUser = { name: user.displayName, email: user.email }

                fetch("http://localhost:5000/user", {
                    method: "POST",
                    body: JSON.stringify(saveUser),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                    .then((response) => response.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    });
            })
            .catch((error) => {
                console.error('error', error)
            })
    }

    return (
        <div className='text-center'>
            <div className='mt-2'>
                <button className="btn btn-circle bg-[#CBE8EE] hover:bg-black text-[#585858] hover:text-white font-xl mr-2"><BsGoogle onClick={handleWithGoogleSignIn} className='text-base'></BsGoogle></button>

                {/* {These 2 are just demo} */}
                <button className="btn btn-circle bg-[#CBE8EE] hover:bg-black text-[#585858] hover:text-white font-xl me-2"><BsFacebook className='text-base'></BsFacebook></button>
                <button className="btn btn-circle bg-[#CBE8EE] hover:bg-black text-[#585858] hover:text-white font-xl"><BsGithub className='text-base'></BsGithub></button>
            </div>
        </div>
    );
};

export default SocialLogin;