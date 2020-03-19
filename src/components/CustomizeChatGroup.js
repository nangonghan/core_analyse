import React, { useState ,useEffect} from "react";
import { motion } from "framer-motion";
import LineChart from "./LineChart";
import { Checkbox } from "antd";
import axios from 'axios'

function ChatGroup(props) {
  //定义显示的数据类别

  const [data, setData] = useState({ records: [] });
  useEffect(() => {
      const fetchData = async () => { 
        const result = await axios('https://api.airtable.com/v0/applkgfDoXZfJjyTR/total?&view=Grid%20view&api_key=keyTndZAXB1NVMHrf');
        setData(result.data);
      };
      fetchData(data);
  }, []);
  const dataType = []
  data.records.forEach(item => {
    dataType.push(item.fields);
  });
  //定义所有可选的选项
  const plainOptions = []
  dataType.forEach(item => {
    plainOptions.push(item['name']);
  });
  //定义状态
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  //触发事件
  const onChange = checkedList => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  //生成组件
  //map选则的数组
  const groupType = [];
  //根据已选择的index做筛选
    checkedList.forEach((key)=>{
    groupType.push(dataType.find(item=>item.name===key))
  })
  const groupList = groupType.map((item, index) => {
    return (
      <motion.li
        whileHover={{
          scale: 1.01,
          y: -2,
          boxShadow: "0px 10px 80px 10px rgba(1, 10, 243, 0.1)"
        }}
        transition={{ duration: 0.45 }}
        key={index}
        className="chatUnit"
      >
        <LineChart type={item.name} />
      </motion.li>
    );
  });

  return (
    <div>
      <motion.div
        className="seleted"
        whileHover={{
          scale: 1.005,
          y: -2,
          boxShadow: "0px 10px 80px 10px rgba(1, 10, 243, 0.1)"
        }}
        transition={{ duration: 0.45 }}
      >
        <div className="site-checkbox-all-wrapper">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <Checkbox.Group 
            style={{ width: "100%" }} 
            onChange={onChange} 
            options={plainOptions}
            value={checkedList}
            />
      </motion.div>
      <ul className="chatGroup">{groupList}</ul>
    </div>
  );
}

export default ChatGroup;
