import OrgChart from '../utils/orgChart'

const data = [
  {
    first: 'Patricia',
    last: 'Diaz',
    id: 1,
    manager: 9,
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
    first: 'Stephen',
    last: 'Baker',
    id: 9,
    manager: 0,
    department: 2,
    office: 1
  }
]

describe('orgChart', () => {
  describe('in an empty organization', () => {
    const emptyOrgChart = new OrgChart()
    test('size should be zero', () => {
      expect(emptyOrgChart.size()).toEqual(0)
    })
    test('it should return undefined when searching for an employee', () => {
      expect(emptyOrgChart.get(0)).toEqual(undefined)
    })
    test('it should build an empty chart', () => {
      expect(emptyOrgChart.buildChart()).toEqual({})
    })
  })

  describe('.get', () => {
    const orgChart = new OrgChart()
    orgChart.insertMultiple(data)

    test('it should return an existent employee', () => {
      expect(orgChart.get(9).id).toEqual(9)
    })
    test('it should return undefined for a non-existent employee', () => {
      expect(orgChart.get(99)).toEqual(undefined)
    })
  })

  describe('.insert', () => {
    const orgChart = new OrgChart()

    test('it should insert new employees correctly', () => {
      const employee = {
        first: 'John',
        last: 'Doe',
        id: 100,
        manager: 1,
        department: 5,
        office: 2
      }
      orgChart.insert(employee)
      expect(orgChart.get(100)).toEqual({ ...employee, children: new Set() })
    })

    test('it should be idempotent', () => {
      const employee = {
        first: 'John',
        last: 'Doe',
        id: 101,
        manager: 1,
        department: 5,
        office: 2
      }
      orgChart.insert(employee)
      const orgChartSizeBefore = orgChart.size()
      orgChart.insert(employee)
      expect(orgChart.size()).toEqual(orgChartSizeBefore)
    })

    test('it should update an already present employee', () => {
      const employee = {
        first: 'John',
        last: 'Doe',
        id: 102,
        manager: 1,
        department: 5,
        office: 2
      }
      const employee2 = {
        first: 'John',
        last: 'Doe',
        id: 102,
        manager: 1,
        department: 5,
        office: 3
      }
      orgChart.insert(employee).insert(employee2)
      expect(orgChart.get(102).office).toEqual(3)
    })

    test(`it should update employee's manager correctly`, () => {
      const manager = {
        first: 'Jorge',
        last: 'Manager',
        id: 40,
        manager: 0,
        department: 5,
        office: 2
      }
      orgChart.insert(manager)
      const managerChildrenSize = orgChart.get(40).children.size
      const employee = {
        first: 'John',
        last: 'Doe',
        id: 103,
        manager: 40,
        department: 5,
        office: 2
      }
      orgChart.insert(employee)
      expect(orgChart.get(40).children.size).toEqual(managerChildrenSize + 1)
    })
  })

  describe('.insertMultiple', () => {
    test('should insert multiple employees correctly', () => {
      const orgChart = new OrgChart()
      orgChart.insertMultiple(data)
      expect(orgChart.size()).toEqual(data.length)
    })
  })

  describe('.buildChart', () => {
    const orgChart = new OrgChart()
    orgChart.insertMultiple(data)
    const chart = orgChart.buildChart()

    test('it should build the chart correctly', () => {
      expect(chart).toEqual({
        id: 9,
        data: {
          id: 9,
          office: 1,
          department: 2,
          first: 'Stephen',
          last: 'Baker'
        },
        children: [
          {
            id: 1,
            data: {
              department: 5,
              first: 'Patricia',
              id: 1,
              last: 'Diaz',
              office: 2
            },
            children: []
          },
          {
            id: 2,
            data: {
              department: 5,
              first: 'Daniel',
              id: 2,
              last: 'Smith',
              office: 2
            },
            children: []
          },
          {
            id: 3,
            data: {
              department: 4,
              first: 'Thomas',
              id: 3,
              last: 'Parker',
              office: null
            },
            children: []
          }
        ]
      })
    })

    test('it should have the manager as root of the chart', () => {
      const { department, first, last, id, office, children } = orgChart.get(9)
      expect(chart.id).toEqual(9)
      expect(chart.data).toEqual({ department, first, last, id, office })
      expect(chart.children.length).toEqual(children.size)
    })
  })
})
