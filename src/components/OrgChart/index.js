import React, { useState } from 'react'
import Employee from '../Employee'
import { isEmpty, map } from 'lodash'
import 'antd/dist/antd.css'

function OrgChart({ tree }) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    !isEmpty(tree) && (
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
          displayButton={!isEmpty(tree.children)}
        />
        {!isEmpty(tree.children) && (
          <div
            style={{
              display: !collapsed ? 'flex' : 'none',
              justifyContent: 'space-between',
              padding: 10,
              alignItems: 'flex-start',
              flexDirection: 'row',
              border: '3px solid red'
            }}
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
