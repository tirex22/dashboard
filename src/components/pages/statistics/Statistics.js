import React, { Component } from 'react'
import './Statistics.css'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options1 = {
    chart: {
        type: 'areaspline',
        backgroundColor: 'transparent',
        color: '#0f0',
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: ''
        },
        plotBands: [
            {
                from: 0,
                to: 2.5,
                color: 'rgba(255, 0, 0, .1)'
            },
            {
                from: 10,
                to: 12.5,
                color: 'rgba(0, 0, 255, .1)'
            },
        ]
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0
        }
    },
    series: [{
        name: 'data',
        data: [5, 3, 3.5, 3.6, 3.1, 3, 2.5, 1.5, 2.5, 3, 5, 4, 10, 12]
    }]
}

const options2 = {
    chart: {
        type: 'areaspline',
        backgroundColor: 'transparent',
    },

    colors: ['#0f0', '#ff0', '#00f', '#18529e',],

    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    tooltip: {
        shared: true,
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0
        }
    },
    series: [{
        name: '10CM',
        data: [7, 7, 10, 9, 9, 11, 10]
    }, {
        name: '20CM',
        data: [5, 10, 8, 7, 7, 9, 8]
    }, {
        name: '30CM',
        data: [3, 5, 6, 5, 5, 7, 6]
    }, {
        name: '40CM',
        data: [1, 3, 4, 3, 3, 5, 4]
    }
    ]
}

export default class Statistics extends Component {
    render() {
        return (
            <div className='page'>

                <div className='row'>
                    <h1 style={{ marginLeft: 15, fontWeight: '700' }}>Banana Crop 2</h1>
                </div>

                <div className="row">

                    <div className="col-sm-12 col-lg-12">
                        <div className='card'>
                            <p className='title'>Moisture Levels</p>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options1}
                            />
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-12">
                        <div className='card'>
                            <p className='title'>Salinity Levels</p>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options2}
                            />
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-6">
                        <div className='card'>
                            <p className='title'>Temperature Levels</p>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options1}
                            />
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-6">
                        <div className='card'>
                            <p className='title'>Salinity Levels</p>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options2}
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
