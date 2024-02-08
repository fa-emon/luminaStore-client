import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { validateCaptcha } from "react-simple-captcha";
import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import Lottie from "lottie-react";
import animation from '../../../../src/lotties/login.json'


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        form.reset();

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);

                Swal.fire({
                    title: 'User logged in successfully.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error('error', error);
            })
    }

    const handleValidateCaptcha = (event) => {
        const user_captcha_value = event.target.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }
        else {
            setDisabled(true);
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    return (
        <>
            <div className="hero min-h-screen primary-color pt-24 pb-24">
                <div className="hero-content flex-col lg:flex-row-reverse mx-10">
                    <div className="lg:w-1/2 heading-font">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold text-center text-[#585858] mb-4">Log in!</h1>
                        </div>
                        <div className="card w-full shadow-2xl bg-base-100">
                            <form onSubmit={handleLogin} className="card-body">
                                {/* {email field} */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>

                                {/* {password field} */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={show ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" required />
                                    <p onClick={() => setShow(!show)}>
                                        <small>
                                            {show ? <span>Hide Password</span> : <span>Show Password</span>}
                                        </small>
                                    </p>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" required />
                                </div>

                                <div className="form-control mt-6">
                                    <input disabled={disabled} className="btn btn-primary" type="submit" value="Log in" />
                                </div>
                                <p className='text-[#D1A054] font-medium text-xl text-center'><small>New Here? <Link to={'/register'}>Create an account.</Link></small></p>
                                <SocialLogin></SocialLogin>
                            </form>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <Lottie animationData={animation} loop={true} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;