import React, { useState } from 'react'
import Employee from '../Employee'
import { isEmpty } from 'lodash'

function OrgChart({ tree }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    !isEmpty(tree) &&
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '3px solid blue'
      }}
    >
      <Employee
        employee={tree.data}
        onClick={() => setCollapsed(!collapsed)}
        collapsed={collapsed}
        displayButton={tree.children && tree.children.length > 0}
      />
      {tree.children && (
        <div
          style={{
            display: !collapsed && tree.children.length > 0 ? 'flex' : 'none',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'flex-start',
            flexDirection: 'row',
            border: '3px solid red'
          }}
        >
          {tree.children.map((child, index) => (
            <OrgChart tree={child} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OrgChart
