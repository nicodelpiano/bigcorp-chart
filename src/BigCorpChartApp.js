import React from 'react'
import Chart from './utils/chart'
import OrgChart from './components/OrgChart'
import { MapInteractionCSS } from 'react-map-interaction'
import { Spin, Empty } from 'antd'
import './BigCorpChartApp.css'

const LIMIT = 10000
const API_URL =
  `https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api?limit=${LIMIT}`

class BigCorpChartApp extends React.Component {
  state = {
    chart: new Chart(),
    loading: true
  }

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState(state => ({
          chart: state.chart.insertMultiple(data),
          loading: false
        }))
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    return (
      <div className="app-container">
        {this.state.loading ? (
          <Spin size="large" />
        ) : this.state.chart.size() === 0 ? (
          <Empty />
        ) : (
          <MapInteractionCSS>
            <OrgChart tree={this.state.chart.buildTree()} />
          </MapInteractionCSS>
        )}
      </div>
    )
  }
}

export default BigCorpChartApp
