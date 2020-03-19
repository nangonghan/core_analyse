import React, { useState, useEffect } from "react";
//关于echat必须引入的包
import ReactEcharts from "echarts-for-react";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
//css
import "./BarChart.css";
//motion
//axios
import axios from 'axios'
//antd
import { Radio, DatePicker } from "antd";
import "antd/dist/antd.css";
//moment
import moment from 'moment';


function BarChart(props) {
  //周期类型定义
  const [dataState, setDataState] = useState('weekGroup');
  //日期周期选择
  function onChangeState(value) {
    setDataState(value.target.value);
    
  }
  const [dataSelected,setDataSelected] = useState('')
  //week
  const [isChangedWeek,setIsChangedWeek] = useState(false)
  //month
  const [isChangedMonth,setIsChangedMonth] = useState(false)
  //week
  function onChangeWeek(date,dateString) {
    setDataSelected(dateString)
    setIsChangedWeek(true)
  }
  //month 
  function onChangeMonth(date,dateString) {
    setDataSelected(dateString)
    setIsChangedMonth(true)
  }
  const [data, setData] = useState({ records: [] });
  useEffect(() => {
      const fetchData = async () => { 
        const result = await axios('https://api.airtable.com/v0/applkgfDoXZfJjyTR/' + dataState + '?&view=Grid%20view&api_key=keyTndZAXB1NVMHrf');
        setData(result.data);
      };
      fetchData(data);
  }, [dataState]);
  // 数据类型
  const dataType = props.type;
  //老师数据
  //日期
  let time = [];
  //都老师
  let mark = []
  //定义数据
  var coreType = dataSelected
  if(dataState === 'total'){
    // eslint-disable-next-line
    var coreType = '总积分'
  }else if(dataState === 'monthGroup' && isChangedMonth === false ){
    // eslint-disable-next-line
    var coreType = moment(new Date()).subtract(1,'month').format('YYYY-MM') 
  }else if(dataState === 'monthGroup' && isChangedMonth === true ){
    // eslint-disable-next-line
    var coreType = dataSelected 
  }else if(dataState === 'weekGroup' && isChangedWeek === false ){
    // eslint-disable-next-line
    var coreType = '2020-' + moment(new Date()).subtract(1,'week').format('DD')  + 'th'
  }else if(dataState === 'weekGroup' && isChangedWeek === true ){
    // eslint-disable-next-line
    var coreType = dataSelected 
  }
  data.records.forEach(item => {
    time.push(item.fields["name"]);
    mark.push(item.fields[coreType])
  });
   const title = "数据";
  //toggle 是否显示数据
  //
  const color = '#3398DB'
  //表格数据
  const option = {
    color: [color],
    title: {
      text: dataType + " - " + coreType 
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
    },
    grid: {
      left: "1%",
      right: "8%",
      bottom: "8%",
      top: "12%",
      containLabel: true
    },
    yAxis: {
      type: "category",
      // boundaryGap: false,
      data: time,
      axisTick: {
        alignWithLabel: true
    }
    },
    xAxis: {
      type: "value",
      name: "单位:分"  
    },
    series: [
      {
        name: title,
        type: "bar",
        barWidth: '40%',
        data: mark,
        label:{
          normal:{
            position:'right',
            fontWeight:'bold',
            color:color
          }
        },
        itemStyle: { normal: { label: { show: true } } }, //是否显示数值
      }
    ]
  };

  const TypePicker = () => {
    if (dataState === 'weekGroup'){
      return <DatePicker onChange={onChangeWeek} picker="week" placeholder="选择周" />
    } else if (dataState === 'monthGroup'){
      return <DatePicker onChange={onChangeMonth} picker="month" placeholder="选择月份" />
    }else{
      return(<div></div>)
    }
  }
  return (
    <div className="chartContainer">
      <div className="BardataSelect">
        <TypePicker />
      </div>
      <div className="BardataRange">
        <Radio.Group defaultValue="weekGroup" buttonStyle="solid" onChange={onChangeState}>
          <Radio.Button value="weekGroup">周</Radio.Button>
          <Radio.Button value="monthGroup">月</Radio.Button>
          <Radio.Button value="total">总</Radio.Button>
        </Radio.Group>
      </div>
      <ReactEcharts
        option={option}
        opts={{ renderer: "svg" }}
        style={{ height: "500px" }}
      />
    </div>
  );
}

export default BarChart;
