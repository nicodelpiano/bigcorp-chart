import React, { useState } from 'react'
import Employee from '../Employee'
import { isEmpty, map } from 'lodash'
import './styles.css'

function OrgChart({ tree }) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    !isEmpty(tree) && (
      <div className="container">
        <Employee
          employee={tree.data}
          onClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
          displayButton={!isEmpty(tree.children)}
        />
        {!isEmpty(tree.children) && (
          <div
            style={{
              display: !collapsed ? 'flex' : 'none'
            }}
            className="children"
          >
            {map(tree.children, (child, index) => (
              <OrgChart tree={child} key={index} />
            ))}
          </div>
        )}
      </div>
    )
  )
}

export default OrgChart
