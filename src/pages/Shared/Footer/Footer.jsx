import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="pb-20">
            <div>
                <h2 className='neon-light uppercase text-5xl text-black font-semibold text-center heading-font'>
                    <span>lumina</span>
                    <span>Store</span>
                </h2>
            </div>

            <div className="flex justify-center items-center text-xl font-semibold gap-10 heading-font my-10">
                <Link>Company</Link>
                <Link>Products</Link>
                <Link>Offices</Link>
                <Link>About</Link>
                <Link>Contact</Link>
            </div>

            <div className="flex items-center justify-center gap-10">
                <span className="text-2xl"><BsInstagram></BsInstagram></span>
                <span className="text-2xl"><FaPinterest></FaPinterest></span>
                <span className="text-2xl heartbeat"><BsWhatsapp></BsWhatsapp></span>
            </div>
        </div>
    );
};

export default Footer;