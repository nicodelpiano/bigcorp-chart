class OrgChart {
  constructor(rootManagerValue = 0) {
    // Value to look up when inserting employees to set which one
    // is the root manager.
    this._rootManagerValue = rootManagerValue
    // Root manager id, to keep track of the manager when found.
    this._rootManagerId = null
    // The chart for the organization will be a map,
    // where keys are employee ids, and values are their data
    // plus a set with children ids, if any.
    this._orgChart = new Map()
  }

  // Exports the underlying data structure of the tree to a traversable
  // representation intended for displaying the whole organizational structure
  _getHierarchy(employeeId = this._rootManagerId) {
    if (!employeeId) {
      return {}
    }

    const { id, first, last, office, department, children } = this.get(
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

  insert(employee) {
    const { id, manager } = employee
    const employeeEntry = this.get(id)

    // Upsert an employee: data will be overwritten if it already exists.
    this._orgChart.set(id, {
      children: new Set(),
      ...employeeEntry,
      ...employee
    })

    if (manager !== this._rootManagerValue) {
      // Update manager's entry if it differs from the root key.
      const managerEntry = this.get(manager)
      // Recall that we create the managers entry here always: it will be
      // updated when we actually insert the manager's node.
      this._orgChart.set(manager, {
        ...managerEntry,
        children: managerEntry ? managerEntry.children.add(id) : new Set([id])
      })
    } else {
      // This is the root manager, and thus we update the variable.
      this._rootManagerId = id
    }

    // To chain multiple calls.
    return this
  }

  insertMultiple(employees) {
    employees.map(employee => this.insert(employee))
    return this
  }

  get(employeeId) {
    return this._orgChart.get(employeeId)
  }

  size() {
    return this._orgChart.size
  }

  draw() {
    console.log('Drawing chart...')
    return this._getHierarchy()
  }
}

export default OrgChart
