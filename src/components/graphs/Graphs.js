import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      averageData: []
    };
  }

  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  componentDidMount = () => {
    this.createAverage();
  };

  componentDidUpdate = (previousProps) => {
    if (previousProps.categoryList !== this.props.categoryList) {
      this.createAverage();
    }
  };

  createAverage = () => {
    let average = [];
    let instances = [];
    let value = 0;

    this.props.categoryList.forEach(emp => {
      instances = this.props.employeeList.filter((word) => word.category === emp.categoryname);

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
    );
  }
}
