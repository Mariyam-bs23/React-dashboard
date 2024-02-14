import Header from "../components/header";
import SideNav from "../components/side-nav";
import StatisticsCard from "../components/statistics-card";
import LineChart from "../components/line-chart";

const Dashboard = () => {
    return(
        <div className="pl-52">
            <SideNav/>
            <Header/>
            <div className="px-8 mt-8 grid grid-cols-12 gap-6<Chart chartData={this.state.chartData} displayLegend={false} />">
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
                    <div className="mt-10">
                        <h2>Top selling products</h2>
                    </div>
                </div>
                <div className="col-span-4">
               
                </div>
            </div>
        </div>
    )
}

export default Dashboard;