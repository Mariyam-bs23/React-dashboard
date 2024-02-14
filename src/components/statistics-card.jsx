import ShowChartIcon from '@mui/icons-material/ShowChart';

const StatisticsCard = (props) => {
    const {statistics , cardColor, customClass , iconColor } = props; 
    return(
        <div className={`rounded-lg p-8 ${cardColor} ${customClass}`}>
            <h3 className="text-4xl font-medium">{statistics.number}</h3>
            <p className="text-sm text-gray-500">{statistics.description}</p>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-base font-medium mt-3">{statistics.percentage}</p>
                    <p className="text-sm text-gray-500">This month</p>
                </div>
                <ShowChartIcon className={`!text-4xl ${iconColor}`}/>
            </div>
        </div>
    )
}

export default StatisticsCard;