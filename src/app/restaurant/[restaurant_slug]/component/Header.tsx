import { Location } from '@prisma/client'
import React from 'react'

const Header = ({name,location,load}:{name:string,location?:Location,load:string}) => {

    let text; 
    if(location === undefined){
        text = load;
    }else{
        text = (name + "(" + location.name + ")")
    }

    return (
        <div className="h-96 overflow-hidden">
            <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
                <h1 className="text-7xl text-white capitalize text-shadow text-center">
                    {text}
                </h1>
            </div>
        </div>
    )
}

export default Header