import StatisticsCard from "../components/statistics-card";
import LineChart from "../components/line-chart";
import BasicTable from "../components/table";
import CardList from "../components/list-card";
import { useEffect, useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axiosinstance from "../utils/axiosinstance";
import { authUtils } from "../utils/authUtils";

const Dashboard = () => {
    const [topCustomers, setTopCustomers] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            // Check if user is authenticated before making API calls
            if (!authUtils.isAuthenticated()) {
                console.warn('User not authenticated, redirecting to login');
                authUtils.logout('/login');
                return;
            }

            try {
                // Fetch dashboard data - axios interceptor will handle token refresh automatically
                const [usersResponse, productsResponse] = await Promise.all([
                    axiosinstance.get('/users'),
                    axiosinstance.get('/products')
                ]);
                
                setTopCustomers(usersResponse.data || []);
                setTopProducts(productsResponse.data || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } 
        };

        fetchDashboardData();
    }, []);

    return(
        <div className="pl-52">
            <div className="px-8 mt-8 grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-6">
                        <StatisticsCard 
                        customClass="col-span-1"
                        cardColor="bg-blue-100"
                        iconColor="text-green-600"
                        statistics={{
                                number : "301.4K",
                                description : "Total Customer",
                                percentage : "+30%"
                                }}/>
                        <StatisticsCard 
                        customClass="col-span-1"
                        cardColor="bg-green-100"
                        iconColor="text-blue-600"
                        statistics={{
                                number : "30.68K",
                                description : "Total Revenue",
                                percentage : "-15%"
                                }}/>
                        <StatisticsCard 
                        customClass="col-span-1"
                        cardColor="bg-blue-100"
                        iconColor="text-green-600"
                        statistics={{
                                number : "2.48k",
                                description : "Total Deals",
                                percentage : "+23%"
                                }}/>
                    </div>
                    <div className="mt-10">
                        <h2>Earnings</h2>
                        <LineChart
                         labels={['January','February','June', 'July', 'August','September','October','November','December']}
                         dataset={[
                           {
                             id: 1,
                             label: 'First Half',
                             data: [50, 40, 55 ,30 ,45,35,20.70,73,80],
                             borderColor: 'rgb(75, 192, 192)',
                               tension: 0.5
                           },
                           {
                             id: 2,
                             label: 'Top Gross',
                             data: [30, 25, 40,60,110,55,70,64,90,80 ,40,50],
                             borderColor: 'rgb(56,56,56)',
                             tension: 0.5
                           },
                         ]}/>
                    </div>
                    <div className="mt-16">
                        <h2 className="mb-4">Top selling products</h2>
                        <BasicTable/>
                    </div>
                </div>
                <div className="col-span-4">
                    <CardList cardHeading={"Top customers"} show={show} setShow={setShow}>
                        <ul className={`transition-all ease-out duration-300 ${show ? 'max-h-[500px] overflow-y-auto' : 'max-h-72 overflow-y-hidden'}`}>
                            {topCustomers && topCustomers.length > 0 && topCustomers.map((value , index) => {
                                return(
                                    <li key={index} className="flex items-center py-3 px-2">
                                        <div className="rounded-full w-11 h-11 bg-gray-200 flex items-center justify-center">
                                        {value.image ? 
                                            <img className="w-full h-full rounded-[inherit] object-cover" src={value.image} alt="img"/>
                                            : 
                                            <InsertPhotoIcon className="rounded-[inherit] object-cover text-gray-600"/>
                                        }                
                                        </div>
                                        <div className="flex flex-col gap-1 ml-4">
                                            <h4 className="text-md text-slate-800 font-bold capitalize">{value.firstName || ''} {value.lastName || ''}</h4>
                                            <p className="text-sm text-gray-400">45 purchases</p>
                                        </div>
                                        <span className="text-lg font-medium text-slate-800 ml-auto">$45.9K</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </CardList>
                    <CardList customClass="mt-8" cardHeading={"Top rated products"} show={show2} setShow={setShow2}>
                        <ul className={`transition-all ease-out duration-300 ${show2 ? 'max-h-[500px] overflow-y-auto' : 'max-h-72 overflow-y-hidden'}`}>
                            {topProducts && topProducts.length > 0 && topProducts.map((value , index) => {
                                if(value.rating > 4.5){
                                    return(
                                        <li key={index} className="flex items-center py-3 px-2">
                                            <div className="rounded-full w-11 h-11 bg-gray-200 flex items-center justify-center">
                                            {value.images[4] ? 
                                                <img className="w-full h-full rounded-[inherit] object-cover" src={value.images[4]} alt="img"/>
                                                : 
                                                <InsertPhotoIcon className="rounded-[inherit] object-cover text-gray-600"/>
                                            }                
                                            </div>
                                            <div className="flex flex-col gap-1 ml-4">
                                                <h4 className="text-md text-slate-800 font-bold capitalize">{value.title}</h4>
                                                <p className="text-sm text-gray-400">{value.brand}</p>
                                            </div>
                                            <span className="text-lg font-medium text-slate-800 ml-auto"><span className="text-yellow-400 text-md mr-2">★</span>{value.rating}</span>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </CardList>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;