import { Location } from '@prisma/client'
import React from 'react'

const Header = ({name,location}:{name:string,location:Location}) => {
    return (
        <div className="h-96 overflow-hidden">
            <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
                <h1 className="text-7xl text-white capitalize text-shadow text-center">
                    {name} {`(${location.name})`}
                </h1>
            </div>
        </div>
    )
}

export default Header