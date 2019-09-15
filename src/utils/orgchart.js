class OrgChart {
  constructor(rootManagerValue = 0) {
    // Value to look up when inserting employees to set which one
    // is the root manager
    this._rootManagerValue = rootManagerValue
    // Root manager id. Will be filled when found in the data.
    this._rootManagerId = null
    this._orgChart = new Map()
  }

  _getEmployee(employeeId) {
    return this._orgChart.get(employeeId)
  }

  // Exports the underlying data structure of the tree to a traversable
  // representation intended for displaying the whole organizational structure
  _getHierarchy(employeeId = this._rootManagerId) {
    const { id, first, last, office, department, children } = this._getEmployee(
      employeeId
    )

    const childrenEmployees = Array.from(children).map(child =>
      this._getHierarchy(child)
    )

    return {
      id,
      data: {
        id,
        office,
        department,
        first,
        last
      },
      children: childrenEmployees
    }
  }

  // Upsert
  insert(employee) {
    const { id, manager } = employee
    const employeeEntry = this._getEmployee(id)

    // Upsert employee entry
    this._orgChart.set(id, {
      children: new Set(),
      ...employeeEntry,
      ...employee
    })

    if (manager !== this._rootManagerValue) {
      const managerEntry = this._getEmployee(manager)
      // Update manager's entry if it differs from the root key
      this._orgChart.set(manager, {
        ...managerEntry,
        children: managerEntry ? managerEntry.children.add(id) : new Set([id])
      })
    } else {
      // This is the root manager
      this._rootManagerId = id
    }

    // To chain multiple calls
    return this
  }

  insertMultiple(employees) {
    employees.map(employee => this.insert(employee))
    return this
  }

  drawChart() {
    console.log('Drawing chart...')
    return this._getHierarchy()
  }
}

export default OrgChart
