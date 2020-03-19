import React, { useState, useEffect } from "react";
//关于echat必须引入的包
import ReactEcharts from "echarts-for-react";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
//css
import "./LineChart.css";
//motion
import { motion } from "framer-motion";
//axios
import axios from 'axios'
//antd
import { Radio } from "antd";
import "antd/dist/antd.css";

function LineChart(props) {
  //日期周期选择
  function onChange(value) {
    setDataState(value.target.value);
  }
  const [dataState, setDataState] = useState('week');
  //本地CSV引入
  const [data, setData] = useState({ records: [] });
  useEffect(() => {
      const fetchData = async () => { 
        const result = await axios('https://api.airtable.com/v0/applkgfDoXZfJjyTR/' + dataState +'?&view=Grid%20view&api_key=keyTndZAXB1NVMHrf');
        setData(result.data);
      };
      fetchData();
    }, [dataState]);
  // 数据类型
  const dataType = props.type;
  //老师数据
  //日期
  let time = [];
  //都老师
  let mark = [];
  data.records.forEach(item => {
    const floatData = Math.floor(item.fields[dataType] * 100) / 100;
    time.push(item.fields["data"]);
    mark.push(floatData)
  });
   const title = "数据";
  //toggle 是否显示数据
  const [isTap, setIsTap] = useState(true);
  //表格数据
  const option = {
    title: {
      text: dataType
    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "14%",
      top: "18%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: time,
      name: "时间"
    },
    yAxis: {
      type: "value",
      name: "单位:分"  
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: title,
        type: "line",
        data: mark,
        itemStyle: { normal: { label: { show: isTap ? true : false } } }, //是否显示数值
        smooth: true //true 曲线，false折线
      }
    ]
  };

  //定义两种状态
  const container = {
    hidden: { backgroundColor: "#F0F0F0" },
    visible: { backgroundColor: "#4CD964" }
  };
  const item = {
    hidden: { x: 0 },
    visible: { x: 19 }
  };
  //
  return (
    <div className="chartContainer">
      <div className="dataRange">
        <Radio.Group defaultValue="week" buttonStyle="solid" onChange={onChange}>
          <Radio.Button value="week">周</Radio.Button>
          <Radio.Button value="month">月</Radio.Button>
        </Radio.Group>
      </div>
      <motion.div
        className="container"
        initial="hidden"
        animate={isTap ? "visible" : "hidden"}
        variants={container}
      >
        <p>显示数据: </p>
        <motion.div
          className="knob"
          variants={item}
          onClick={() => {isTap ? setIsTap(false) : setIsTap(true)}}
        ></motion.div>
      </motion.div>
      <ReactEcharts
        option={option}
        opts={{ renderer: "svg" }}
        style={{ height: "340px",width:"100%" }}
      />
    </div>
  );
}

export default LineChart;
