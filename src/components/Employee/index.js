import React from 'react'
import { Avatar, Button, Card, Divider, Icon, Typography } from 'antd'
import './styles.css'

const { Meta } = Card
const { Text } = Typography

function EmployeeInfoRow({ name, value }) {
  return (
    <p style={{ margin: 1 }}>
      <Text strong>{name}:</Text> {value}
    </p>
  )
}

function CollapseButton({ onClick, collapsed }) {
  return (
    <Button
      shape="circle"
      style={{
        position: 'relative',
        top: -10,
        color: collapsed ? '#76dbd1' : '#ff4d4f'
      }}
      onClick={onClick}
    >
      {collapsed ? (
        <Icon type="plus-circle" theme="filled" />
      ) : (
        <Icon type="minus-circle" theme="filled" />
      )}
    </Button>
  )
}

function EmployeeCard({ employee }) {
  const { id, first, last, department, office } = employee
  return (
    <Card
      size="small"
      className="employee-card"
      style={{ backgroundColor: '#69c0ff' }}
    >
      <Meta
        avatar={
          <Avatar
            shape="square"
            src={`https://api.adorable.io/avatars/60/${id}`}
            style={{ border: '1px solid' }}
          />
        }
        title={`${first} ${last}`}
      />
      <div className="employee-content">
        {id && <EmployeeInfoRow name={'ID'} value={id} />}
        {department && (
          <EmployeeInfoRow name={'Department'} value={department} />
        )}
        {office && <EmployeeInfoRow name={'Office'} value={office} />}
      </div>
    </Card>
  )
}

function Employee({ employee, displayButton, onClick, collapsed }) {
  return (
    <div className="employee-container">
      <EmployeeCard employee={employee} />
      {displayButton && (
        <CollapseButton collapsed={collapsed} onClick={onClick} />
      )}
      {!collapsed && (
        <Divider
          style={{ height: 40, width: 2, backgroundColor: '#2c003e' }}
          type="vertical"
        />
      )}
    </div>
  )
}

export default Employee
