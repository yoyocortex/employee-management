import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getEmployeeList, getCategoryList } from '../../actions/Actions';
import './Graphs.css';
import Loading from '../loading/Loading';

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
      categoryList: [],
      loading: false
    };
  }

  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  componentDidMount = async () => {
    this.setState({ loading: true });
    let getEmployeeLists = await getEmployeeList()
      .then((res) => res)
      .catch((err) => this.errorNotify(err.message));
    let getCategoryLists = await getCategoryList()
      .then((res) => res)
      .catch((err) => this.errorNotify(err.message));
    if (getCategoryLists.length > 0 && getEmployeeLists.length > 0) {
      this.setState({ employeeList: getEmployeeLists, categoryList: getCategoryLists, loading: false });
      this.createAverage();
    };
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

  errorNotify = (err) => toast.error(err, {
    position: "top-right", autoClose: 5000,
    hideProgressBar: false, closeOnClick: true,
    pauseOnHover: true, draggable: false,
    progress: undefined, theme: this.props.style,
    transition: Slide
  });

  render() {
    const { loading } = this.state;
    return (
      <>
        <ToastContainer />
        <div className='content' style={{ height: '100vh' }}>
          {loading ? <Loading /> :
            <>
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
            </>}
        </div>
      </>
    );
  }
}
