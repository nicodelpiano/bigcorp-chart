import React from 'react'
import { Avatar, Badge, Button, Card } from 'antd'

function Employee({ employee }) {
  return (
    <div>{ employee.first }</div>
  )
}

export default Employee