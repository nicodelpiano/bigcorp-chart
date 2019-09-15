import React from 'react'
import Chart from './utils/chart'
import OrgChart from './components/OrgChart'
import { MapInteractionCSS } from 'react-map-interaction'

const data = [
  {
    first: 'Patricia',
    last: 'Diaz',
    id: 1,
    manager: 16,
    department: 5,
    office: 2
  },
  {
    first: 'Daniel',
    last: 'Smith',
    id: 2,
    manager: 9,
    department: 5,
    office: 2
  },
  {
    first: 'Thomas',
    last: 'Parker',
    id: 3,
    manager: 9,
    department: 4,
    office: null
  },
  {
    first: 'Ruth',
    last: 'Morgan',
    id: 4,
    manager: 9,
    department: 6,
    office: 2
  },
  {
    first: 'Jerry',
    last: 'Sanders',
    id: 5,
    manager: 2,
    department: 7,
    office: 5
  },
  {
    first: 'Daniel',
    last: 'Phillips',
    id: 6,
    manager: 2,
    department: 4,
    office: 1
  },
  {
    first: 'Raymond',
    last: 'Allen',
    id: 7,
    manager: 2,
    department: 5,
    office: 3
  },
  {
    first: 'Dorothy',
    last: 'Baker',
    id: 8,
    manager: 6,
    department: null,
    office: 5
  },
  {
    first: 'Stephen',
    last: 'Baker',
    id: 9,
    manager: 0,
    department: 2,
    office: 1
  },
  {
    first: 'Stephen',
    last: 'Roberts',
    id: 10,
    manager: 3,
    department: 6,
    office: 4
  },
  {
    first: 'Arthur',
    last: 'Reed',
    id: 11,
    manager: 10,
    department: 10,
    office: 4
  },
  {
    first: 'Lisa',
    last: 'Long',
    id: 12,
    manager: 10,
    department: 6,
    office: 3
  },
  {
    first: 'George',
    last: 'Morgan',
    id: 13,
    manager: 10,
    department: 7,
    office: 5
  },
  {
    first: 'Matthew',
    last: 'Lopez',
    id: 14,
    manager: 4,
    department: 4,
    office: 1
  },
  {
    first: 'Thomas',
    last: 'Washington',
    id: 15,
    manager: 4,
    department: 9,
    office: 1
  },
  {
    first: 'Frank',
    last: 'Long',
    id: 16,
    manager: 4,
    department: 7,
    office: 5
  },
  {
    first: 'Anthony',
    last: 'Stewart',
    id: 17,
    manager: 4,
    department: 8,
    office: 4
  },
  {
    first: 'Virginia',
    last: 'Hayes',
    id: 18,
    manager: 14,
    department: 1,
    office: 2
  },
  {
    first: 'Cynthia',
    last: 'Scott',
    id: 19,
    manager: 14,
    department: 2,
    office: 1
  },
  {
    first: 'Gregory',
    last: 'Adams',
    id: 20,
    manager: 16,
    department: 5,
    office: 3
  }
]

class BigCorpChartApp extends React.Component {
  state = {
    chart: new Chart()
  }

  componentDidMount() {
    this.setState(state => ({
      chart: state.chart.insertMultiple(data)
    }))
  }

  render() {
    return (
      <MapInteractionCSS>
        <OrgChart tree={this.state.chart.buildTree()} />
      </MapInteractionCSS>
    )
  }
}

export default BigCorpChartApp
