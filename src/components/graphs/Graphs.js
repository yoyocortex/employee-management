import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { getEmployeeList, getCategoryList } from '../../actions/Actions';
import './Graphs.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${label} : ${payload[0].value}$`}</p>
      </div>
    );
  };

  return null;
};

export default class Example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      averageData: [],
      employeeList: [],
      categoryList: []
    };
  }

  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  componentDidMount = async () => {
    const {
      employeeList,
      categoryList
    } = this.state;

    let getEmployeeLists = await getEmployeeList();
    let getCategoryLists = await getCategoryList();
    this.setState({ employeeList: getEmployeeLists, categoryList: getCategoryLists });
    if (categoryList > 0 && employeeList > 0)
      this.createAverage();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      employeeList,
      categoryList
    } = this.state;

    if (prevState.categoryList !== categoryList || prevState.employeeList !== employeeList) {
      this.createAverage();
    }
  };

  createAverage = () => {
    const {
      employeeList,
      categoryList
    } = this.state;

    let average = [];
    let instances = [];
    let value = 0;

    categoryList.forEach(emp => {
      instances = employeeList.filter((word) => word.category === emp.categoryname);

      for (let index = 0; index < instances.length; index++) {
        const element = instances[index];
        value = value + Number(element.salary);
      };

      average.push({ 'name': emp.categoryname, 'salary': value / instances.length });
      value = 0;
    });
    this.setState({ averageData: average });
  };

  render() {
    return (
      <div className='content' style={{ height: '100vh' }}>
        <div className='content-headline'>
          <h2>Graph</h2>
        </div>
        <ResponsiveContainer width="50%" height="80%">
          <BarChart
            width={"100%"}
            height={"100%"}
            data={this.state.averageData}
            margin={{
              top: 20,
              right: 40,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip cursor={{ fill: '#82e4ff', opacity: '0.2' }} content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    );
  }
}
