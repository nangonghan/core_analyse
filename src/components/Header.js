import React, { useEffect, useState } from 'react'
import './header.css'

function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [count,setCount] = useState(0)
    useEffect(() => {
        const handleScroll = (event) => {
            if (window.pageYOffset > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return function cleanup() {
            window.removeEventListener('scroll', handleScroll)
            
        };
    }, []);
    //锚点跳转
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
        }
    }
    return (
        <div className={scrolled ? "Header HeaderScrolled" : "Header"} >
            <div className="HeaderGroup">
                {scrolled ? <span onClick={() => scrollToAnchor('top') }>< img src={require('../images/logo.png')} alt="logo" /></span> : <a href='https://docs.google.com/spreadsheets/d/1w_GpWVhG86xrtI1k9xmM1ZWIzPEReMAi-T5qrFcFiyg/edit?usp=sharing' target={'_blank'} >< img src={require('../images/logo.png')} alt="logo" /></a>

                }
                <span onClick={() => scrollToAnchor('tuiGuang') }>总计排名</span>
                <span onClick={() => scrollToAnchor('designer') }>本周文章</span>
                <span onClick={() => scrollToAnchor('yunYing')  }>积分明细</span>
            </div>
        </div>
    )
}
export default Header