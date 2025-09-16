import { Link } from "react-router-dom"
export default function Card(){
    return(
        <div className="flex flex-col p-5  bg-white" style={{width:'335px'}}>
            <div>
                <h4 className="font-bold text-xl ">Revamp your home in style</h4>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 py-1 ">
                <div>
                    <Link to={`/products`}>
                        <div>
                            <img alt="Lighting solutions" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_lighting_2._SY116_CB555624324_.jpg"></img>
                        </div>
                        <div>
                            <span className="text-xs">
                                Lighting Solution
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to={`/products`}>
                        <div>
                            <img alt="Lighting solutions" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_lighting_2._SY116_CB555624324_.jpg"></img>
                        </div>
                        <div>
                            <span className="text-xs">
                                Lighting Solution
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to={`/products`}>
                        <div>
                            <img alt="Lighting solutions" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_lighting_2._SY116_CB555624324_.jpg"></img>
                        </div>
                        <div>
                            <span className="text-xs">
                                Lighting Solution
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link to={`/products`}>
                        <div>
                            <img alt="Lighting solutions" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/1x/final/186x116_Home_lighting_2._SY116_CB555624324_.jpg"></img>
                        </div>
                        <div>
                            <span className="text-xs">
                                Lighting Solution
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mt-2.5">
                <Link to='/products'>
                    <span className="text-xs text-blue-600 hover:text-blue-900 font-semibold">Explore All</span>
                </Link>
            </div>
        </div>
    )
}