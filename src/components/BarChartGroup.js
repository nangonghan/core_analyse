import React from 'react'
import { motion } from "framer-motion"
import BarChart from './BarChart'

function BarChatGroup(props) {
   
    var groupType =[ {dataType: "Rank分"} ]
    const groupList = groupType.map((item, index) => {
        return (
            <motion.li 
                whileHover={{ scale: 1.0005, y:-2,boxShadow: "0px 10px 80px 10px rgba(1, 10, 243, 0.1)" }} 
                transition={{ duration: 0.45 }} 
                key={index} 
                className="BarChatUnit">
                <BarChart type={item.dataType}/>
            </motion.li>
        )
    })
    return (
        <ul className="BarChatGroup">
            {groupList}
        </ul>
    )
}

export default BarChatGroup