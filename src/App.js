import React from "react";
import './App.css';
//引入组件
import Banner from './components/Banner'
import Header from './components/Header'
import CustomizeChatGroup from './components/CustomizeChatGroup'
import BarChartGroup from './components/BarChartGroup'
function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <div>
        <h2 className="title" id="tuiGuang">总计排名</h2>
        <BarChartGroup />
      </div>
      {/* <Section title={"本周文章"} id={"designer"}/>
      <Section title={"积分明细"} id={"yunYing"}/> */}
      <h2 className="title" id="yunYing">积分明细</h2>
      <CustomizeChatGroup  />
    </div>
  );
}
export default App;
