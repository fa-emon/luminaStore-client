import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { IoWallet } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: statistics = {} } = useQuery({
        queryKey: ['admin-statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-statistics');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-statistics');
            return res.data;
        }
    })

    //custom shape for the bar chart.
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return {name: data.category, value: data.revenue}
    })

    return (
        <>
            <div className="w-full mb-10">
                <div className="animate__animated animate__fadeInLeft">
                    <img className="w-48 h-1/6 mx-auto" src="https://i.ibb.co/3cm669T/8474.png" alt="" />
                </div>
                <h2 className="text-center heading-font text-4xl mb-3 text-[#]"><span className="text-white">Welcome</span>, {user?.displayName}</h2>
                <div className="animate__animated animate__fadeInRight">
                    <img className="w-48 h-1/6 mx-auto" src="https://i.ibb.co/42V3H53/89745.png" alt="" />
                </div>
            </div>

            <div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#CBE8EE] rounded py-10 text-center hover:bg-[#0e0e0e] hover:text-white">
                        <div className="flex items-center justify-center">
                            <IoWallet className="text-6xl me-2 text-[#f1f1f1]"></IoWallet>
                            <div>
                                <p className="text-3xl heading-font text-end">${statistics.revenue}</p>
                                <p className="text-2xl all-font text-end">REVENUE</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#CBE8EE] rounded py-10 text-center hover:bg-[#0e0e0e] hover:text-white">
                        <div className="flex items-center justify-center">
                            <FaUsers className="text-6xl me-2 text-[#f1f1f1]"></FaUsers>
                            <div>
                                <p className="text-3xl heading-font">{statistics.user}</p>
                                <p className="text-2xl all-font text-end">CUSTOMERS</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#CBE8EE] rounded py-10 text-center hover:bg-[#0e0e0e] hover:text-white">
                        <div className="flex items-center justify-center">
                            <GiClothes className="text-6xl me-2 text-[#f1f1f1]"></GiClothes>
                            <div>
                                <p className="text-3xl heading-font">{statistics.products}</p>
                                <p className="text-2xl all-font">PRODUCTS</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#CBE8EE] rounded py-10 text-center hover:bg-[#0e0e0e] hover:text-white">
                        <div className="flex items-center justify-center">
                            <MdOutlineDeliveryDining className="text-6xl me-2 text-[#f1f1f1]"></MdOutlineDeliveryDining>
                            <div>
                                <p className="text-3xl heading-font">{statistics.orders}</p>
                                <p className="text-2xl all-font">ORDERS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex mt-10">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </>
    );
};

export default AdminHome;