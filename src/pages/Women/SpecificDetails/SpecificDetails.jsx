import { Button } from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useOrder from "../../../hooks/useOrder";
import { useState } from "react";


const SpecificDetails = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [, refetch] = useOrder();

    const specificDetails = useLoaderData();
    const { image, category, old_price, new_price, short_description, category_id } = specificDetails;

    const [order, setOrder] = useState([]);


    const handleOrder = () => {
        const data = {
            image,
            category,
            old_price,
            new_price,
            short_description,
            category_id,
            email: user?.email,
            quantity: 1,
            product_id: category_id,
        };
    
        const existingItemIndex = order.findIndex(item => item.product_id === data.product_id);
    
        if (existingItemIndex !== -1) {
            // Product already exists in the order, update its quantity
            setOrder(prevOrder => {
                const updatedOrder = [...prevOrder];
                updatedOrder[existingItemIndex].quantity += 1;
                return updatedOrder;
            });
        } else {
            // Product does not exist in the order, add it
            setOrder(prevOrder => [...prevOrder, data]);
        }

        if (user) {
            fetch('https://lumina-store-server.vercel.app/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your order has been successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                        // TODO: navigate er kaj baki
                        navigate('')
                    }
                })
                .catch(error => {
                    console.error('Error submitting order:', error);
                });
        }
        else {
            Swal.fire({
                title: "Login required for cart access",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    const isButtonVisible = category !== 'new_collection' && category !== 'popular';

    return (
        <div className="w-full mx-auto px-20 py-44">
            <div className="flex shadow-xl">
                <div className="w-1/2 flex items-center">
                    <div className="w-1/4">
                        <img style={{ height: '20vh', objectFit: 'contain', width: '100%' }} className="object-cover" src={image} alt="" />

                        <img style={{ height: '20vh', objectFit: 'contain', width: '100%' }} className="object-cover mt-5" src={image} alt="" />

                        <img style={{ height: '20vh', objectFit: 'contain', width: '100%' }} className="object-cover mt-5" src={image} alt="" />

                        <img style={{ height: '20vh', objectFit: 'contain', width: '100%' }} className="object-cover mt-5" src={image} alt="" />
                    </div>

                    <div className="w-full">
                        <img style={{ height: '90vh', objectFit: 'cover', width: '100%' }} className="" src={image} alt="" />
                    </div>
                </div>


                <div className="w-1/2 ms-12 text-[#202020]">
                    <p className="heading-font font-semibold w-3/4 pr-4 text-3xl">{short_description}</p>
                    <p className="heading-font my-6">Choose By : {user?.displayName}</p>
                    <div className="flex justify-between mb-2">
                        <div>
                            <h2 className="heading-font line-through">${old_price}</h2>
                        </div>
                        <div>
                            <p className="heading-font pr-40">${new_price}</p>
                        </div>
                    </div>
                    <h2 className="card-title heading-font my-4 text-xl">Category : {category}</h2>
                    <p className="heading-font font-semibold mb-6 mt-12">Select Size</p>

                    <div>
                        <button className="btn btn-square btn-outline border-white hover:bg-black font-semibold text-lg text-[#5f5f5f] me-6">
                            S
                        </button>
                        <button className="btn btn-square btn-outline border-white hover:bg-black font-semibold text-lg text-[#5f5f5f] me-6">
                            M
                        </button>
                        <button className="btn btn-square btn-outline border-white hover:bg-black font-semibold text-lg text-[#5f5f5f] me-6">
                            L
                        </button>
                        <button className="btn btn-square btn-outline border-white hover:bg-black font-semibold text-lg text-[#5f5f5f] me-6">
                            XL
                        </button>
                        <button className="btn btn-square btn-outline border-white hover:bg-black font-semibold text-lg text-[#5f5f5f] me-6">
                            XXL
                        </button>
                    </div>

                    {
                        isButtonVisible && (<div className="mr-4 pt-24">
                            <Button onClick={handleOrder} className='bg-[#CBE8EE] hover:bg-black text-black hover:text-white rounded-md px-2 py-2 w-full'>
                                <span className='tracking-wider heading-font uppercase font-bold '>add to cart</span>
                            </Button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SpecificDetails;