import useClothes from "../../../hooks/useClothes";
import DisplayManageProducts from "./DisplayManageProducts";


const ManageProducts = () => {
    const [clothes] = useClothes();

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <img className="wobble-hor-bottom" style={{ height: '20vh', width: '20vh', objectFit: 'contain' }} src="https://i.ibb.co/jhs65zG/vecteezy-aesthetic-flower-plant-leaves-10869705.png" alt="" />
                <p className="text-center text-[#202020] text-5xl heading-font"> <span className="text-white">MANAGE</span> ALL PRODUCTS : {clothes.length}</p>
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

            <div className="overflow-x-auto text-white w-full rounded-md">
                <table className="table heading-font tracking-widest">
                    {/* head */}
                    <thead className="text-[#202020]">
                        <tr>
                            <th>IMAGE</th>
                            <th>PRODUCT DETAILS</th>
                            <th>PRICE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clothes.map(products => <DisplayManageProducts
                                key={products._id}
                                products={products}>
                            </DisplayManageProducts>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageProducts;