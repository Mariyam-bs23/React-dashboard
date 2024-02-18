import StatisticsCard from "../components/statistics-card";
import LineChart from "../components/line-chart";
import BasicTable from "../components/table";
import CardList from "../components/list-card";
import { useEffect, useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from "axios";

const Dashboard = () => {
    const [topCustomers, setTopCustomers] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/users")
        .then(response => setTopCustomers(response.data))
        .catch(error => console.log(error));
    },[])

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
                        <ul className={`overflow-y-hidden transition-all ease-out duration-300 ${show ? 'max-h-[900px] h-auto' : 'max-h-72 h-72'}`}>
                            {topCustomers && topCustomers.length > 0 && topCustomers.map((value , index) => {
                                return(
                                    <li key={index} className="flex items-center py-3">
                                        <div className="rounded-full w-11 h-11 bg-gray-200 flex items-center justify-center">
                                        {value.image ? 
                                            <img className="w-full h-full rounded-[inherit] object-cover" src={value.image} alt="img"/>
                                            : 
                                            <InsertPhotoIcon className="rounded-[inherit] object-cover text-gray-600"/>
                                        }                
                                        </div>
                                        <div className="flex flex-col gap-1 ml-4">
                                            <h4 className="text-md text-slate-800 font-bold capitalize">{value.name.firstname ? value.name.firstname : ''} {value.name.lastname}</h4>
                                            <p className="text-sm text-gray-400">45 purchases</p>
                                        </div>
                                        <span className="text-lg font-medium text-slate-800 ml-auto">$45.9K</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </CardList>
                    <CardList customClass="mt-8" cardHeading={"Top countries"} show={show} setShow={setShow}>
                        <ul className={`overflow-y-hidden transition-all ease-out duration-300 ${show ? 'max-h-[900px] h-auto' : 'max-h-72 h-72'}`}>
                            {topCustomers && topCustomers.length > 0 && topCustomers.map((value , index) => {
                                return(
                                    <li key={index} className="flex items-center py-3">
                                        <div className="rounded-full w-11 h-11 bg-gray-200 flex items-center justify-center">
                                        {value.image ? 
                                            <img className="w-full h-full rounded-[inherit] object-cover" src={value.image} alt="img"/>
                                            : 
                                            <InsertPhotoIcon className="rounded-[inherit] object-cover text-gray-600"/>
                                        }                
                                        </div>
                                        <div className="flex flex-col gap-1 ml-4">
                                            <h4 className="text-md text-slate-800 font-bold capitalize">{value.name.firstname ? value.name.firstname : ''} {value.name.lastname}</h4>
                                            <p className="text-sm text-gray-400">45 purchases</p>
                                        </div>
                                        <span className="text-lg font-medium text-slate-800 ml-auto">$45.9K</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </CardList>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;