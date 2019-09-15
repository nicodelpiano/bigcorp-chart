import React from 'react'
import Chart from './utils/chart'
import OrgChart from './components/OrgChart'
import { MapInteractionCSS } from 'react-map-interaction'

const API_URL =
  'https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api?limit=10000'

class BigCorpChartApp extends React.Component {
  state = {
    chart: new Chart()
  }

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState(state => ({
          chart: state.chart.insertMultiple(data)
        }))
      })
  }

  render() {
    return (
      <MapInteractionCSS>
        <div style={{ height: '100vh' }}>
          <OrgChart tree={this.state.chart.buildTree()} />
        </div>
      </MapInteractionCSS>
    )
  }
}

export default BigCorpChartApp
