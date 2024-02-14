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
                        <LineChart/>
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