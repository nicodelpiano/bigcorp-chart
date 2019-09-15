import React, { useState } from 'react'
import EmployeeCard from '../EmployeeCard'
import { isEmpty, map } from 'lodash'
import 'antd/dist/antd.css'

function OrgChart({ tree }) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    !isEmpty(tree) && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          height: '100vh'
        }}
      >
        <EmployeeCard
          employee={tree.data}
          onClick={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
          displayButton={!isEmpty(tree.children)}
        />
        {!isEmpty(tree.children) && (
          <div
            style={{
              display: !collapsed ? 'flex' : 'none',
              alignItems: 'flex-start',
              flexDirection: 'row',
              borderTop: '2px solid #2c003e'
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
