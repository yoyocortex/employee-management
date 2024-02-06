import React, { Component } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import carousel1 from '../../carousel/annie-spratt-hCb3lIB8L8E-unsplash.jpg';
import carousel2 from '../../carousel/annie-spratt-QckxruozjRg-unsplash.jpg';
import carousel3 from '../../carousel/kevin-butz-YW0pBd0Uo4g-unsplash.jpg';
import { getEmployeeList, getCategoryList } from '../../actions/Actions';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeList: [],
            categoryList: [],
            pieData: []
        }
    }

    static demoUrl = 'https://codesandbox.io/s/pie-chart-of-two-levels-gor24';

    componentDidMount = async () => {
        const {
            employeeList,
            categoryList
        } = this.state;

        let getEmployeeLists = await getEmployeeList();
        let getCategoryLists = await getCategoryList();
        this.setState({ employeeList: getEmployeeLists, categoryList: getCategoryLists });
        if (categoryList > 0 && employeeList > 0) 
            this.createPie();
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {
            employeeList,
            categoryList
        } = this.state;

        if (prevState.categoryList !== categoryList || prevState.employeeList !== employeeList) {
            this.createPie();
        }
    };

    createPie = () => {
        const {
            employeeList,
            categoryList
        } = this.state;

        let data = [];
        let instances = [];

        categoryList.forEach(emp => {
            instances = employeeList.filter((word) => word.category === emp.categoryname);
            data.push({ 'name': emp.categoryname, 'value': instances.length });
        });
        this.setState({ pieData: data });
    };

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="#82ca9d" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                {name} ({`${(percent * 100).toFixed(0)}%`})
            </text>
        );
    };

    render() {
        const {
            style
        } = this.props;

        return (
            <div className='d-flex flex-row justify-content-evenly align-items-center align-self-center w-100 h-100'>
                <div className='d-flex flex-column justify-content-around align-items-center align-self-center w-100 h-50'>
                    <h3>People per category</h3>
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <PieChart width={"100%"} height={"100%"}>
                            <Pie data={this.state.pieData} dataKey="value" cx="50%" cy="50%"
                                innerRadius={80} outerRadius={100} fill="#82ca9d"
                                label={this.renderCustomizedLabel} paddingAngle={10} nameKey="name" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='d-flex flex-column justify-content-around align-items-center align-self-center w-100 h-50'>
                    <div id="carouselExampleDark" className={style === 'dark' ? "carousel slide p-5" : "carousel carousel-dark slide p-5"} data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={carousel1} className="d-block w-100" alt="Carousel1"></img>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src={carousel2} className="d-block w-100" alt="Carousel2"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={carousel3} className="d-block w-100" alt="Carousel3"></img>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
