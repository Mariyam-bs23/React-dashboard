import { useState } from "react";

const CardList = (props) => {
    const { cardHeading , children, show, setShow, customClass} = props;

    return(
        <div>
            <div className={`flex justify-between items-center pb-3 border-b border-slate-400/40 ${customClass}`}>
                <h3 className="text-2xl">{cardHeading}</h3>
                <p className="text-gray-500 text-sm cursor-pointer"
                onClick={()=>setShow(!show)}>See All</p>
            </div>
            {children}
        </div>
    )
}

export default CardList;