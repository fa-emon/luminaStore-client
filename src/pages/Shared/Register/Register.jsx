import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import animation from '../../../../src/lotties/register.json'


const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useAuth();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        reset();

        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);

                //After user creation, update their profile
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }

                        fetch("http://localhost:5000/user", {
                            method: "POST",
                            body: JSON.stringify(saveUser),
                            headers: {
                                "Content-type": "application/json"
                            }
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Profile Updated Successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/')
                                }
                            });
                    })
                    .catch((error) => {
                        console.error('Error updating user profile:', error);
                    })
            })
            .catch((error) => {
                console.error('error', error)
            })
    }

    return (
        <div className="hero min-h-screen pt-24 pb-24">
            <div className="hero-content flex-col lg:flex-row-reverse w-11/12">
                <div className="lg:w-1/2 heading-font">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center text-[#585858] mb-4">Sign Up!</h1>
                    </div>
                    <div className="card w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* {Name field} */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            {/* {email field} */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            {/* {photo URL field} */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"
                                    {...register('photoURL', { required: true })}
                                    placeholder="photo URL" className="input input-bordered" />
                                {errors.photoURL && <p className='text-red-500'>photo URL is required.</p>}
                            </div>

                            <div className="flex w-full">
                                {/* {password field} */}
                                <div className="form-control me-4 w-1/2">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,
                                        })}
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered"
                                    />
                                    {errors.password && (
                                        <span className="text-red-600">
                                            Password: 6+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special.
                                        </span>
                                    )}

                                </div>

                                {/* {confirm password field} */}
                                <div className="form-control w-1/2">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" {...register("confirm password")} name="confirm password" placeholder="Confirm Password" className="input input-bordered" />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-[#CBE8EE] hover:bg-black text-[#585858] hover:text-white" type="submit" value="Sign Up" />
                            </div>
                            <p className='text-[#585858] font-medium text-xl text-center'><small>Already have an account? <Link to={'/login'}>LOG IN</Link></small></p>
                            <SocialLogin></SocialLogin>
                        </form>
                    </div>
                </div>

                <div className="lg:w-1/2">
                    <Lottie animationData={animation} loop={true}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Register;