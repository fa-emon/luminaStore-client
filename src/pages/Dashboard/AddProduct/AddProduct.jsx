import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors },
        reset } = useForm()

    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = (data) => {
        const { image, new_price, category, admin_name, admin_email, short_description, old_price } = data;

        const newData = { image, new_price: parseFloat(new_price), old_price: parseFloat(old_price), category, short_description, admin_email, admin_name }

        axiosSecure.post('/clothes', newData)
            .then(data => {
                if (data.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "One Product Added Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />
                <p className="text-center text-[#202020] text-5xl heading-font"> <span className="text-white">ADD A</span> NEW PRODUCT</p>
                <img
                    className="wobble-and-rotate"
                    style={{
                        height: '20vh',
                        width: '20vh',
                        objectFit: 'contain',
                        transform: 'scaleX(-1)',
                    }}
                    src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png"
                    alt=""
                />
            </div>

            <div className="mb-10 heading-font tracking-wide px-5 pt-2 pb-6 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full gap-6 mb-6">
                        {/* {Category field} */}
                        <div className="w-full">
                            <div className="label">
                                <span className="text-[#505050]">Choose Category</span>
                            </div>
                            <div className="">
                                <select className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]" {...register("category", { required: true })}>
                                    <option disabled selected>Pick one</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kids">Kids</option>
                                    <option value="new_collection">New Arrivals</option>
                                    <option value="popular">Popular</option>
                                </select>
                            </div>
                        </div>

                        {/* {photo URL field} */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-[#505050]">Photo URL</span>
                            </label>
                            <input type="text"
                                {...register('image', { required: true })}
                                placeholder="Photo URL" className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]" />
                            {errors.image && <p className='text-red-600'>photo URL is required!.</p>}
                        </div>
                    </div>

                    <div className="flex w-full gap-6">
                        {/* {Old Price field} */}
                        <div className="mb-6 text-black w-full">
                            <div className="label">
                                <span className="text-[#505050]">Old Price</span>
                            </div>
                            <input className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]" type="number" placeholder="$" {...register("old_price", { required: true, maxLength: 80 })} />

                            {errors.old_price?.type === "required" && (
                                <p className="text-red-600">old price is required!</p>
                            )}
                        </div>

                        {/* {New Price field} */}
                        <div className="mb-6 text-black w-full">
                            <div className="label">
                                <span className="text-[#505050]">New Price</span>
                            </div>
                            <input className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]" type="number" placeholder="$" {...register("new_price", { required: true, maxLength: 80 })} />

                            {errors.new_price?.type === "required" && (
                                <p className="text-red-600">new price is required!</p>
                            )}
                        </div>
                    </div>

                    <div className="flex w-full gap-6">
                        {/* {Admin Name field} */}
                        <div className="mb-6 text-black w-full">
                            <div className="label">
                                <span className="text-[#505050]">Admin Name</span>
                            </div>
                            <input className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]" type="text" placeholder="Admin Name" {...register("admin_name", { required: true, maxLength: 80 })}
                                readOnly
                                value={user?.displayName}
                            />
                        </div>

                        {/* {Admin Email field} */}
                        <div className="mb-6 text-black w-full">
                            <div className="label">
                                <span className="text-[#505050]">Admin Email</span>
                            </div>
                            <input className="w-full py-2 px-4 rounded-md bg-[#202020] text-[#CBE8EE]"
                                {...register('admin_email', { required: true })} type="email"

                                value={user?.email}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        {/* {Food Details field} */}
                        <div className="w-full">
                            <div className="label">
                                <span className="text-[#505050]">Product Details</span>
                            </div>

                            <div className="w-full">
                                <textarea className="textarea bg-[#202020] text-[#CBE8EE] w-full textarea-md" placeholder="Product Details" {...register("short_description", { required: true })}></textarea>

                                {errors.short_description && <p className='text-red-600'>product details is required!.</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <input className="btn btn-outline bg-[#CBE8EE] text-black hover:text-white hover:bg-black uppercase btn-sm w-full border-[#202020]" type="submit" value="add product" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;