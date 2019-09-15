import React from 'react'
import { Avatar, Button, Card, Divider, Icon, Typography } from 'antd'

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
      style={{position: 'relative', top: -10, color: '#76dbd1' }}
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

function EmployeeCard({ employee, displayButton, onClick, collapsed }) {
  const { id, first, last, office, department } = employee
  return (
    <div style={{ display: 'flex', justifyContent:  'center', flexDirection: 'column', alignItems: 'center'}}>
      <Card
        size="small"
        style={{
          height: 120,
          width: 250,
          borderRadius: 5,
          backgroundColor: '#d6e4aa',
          position: 'relative',
        }}
      >
        <Meta
          avatar={
            <Avatar
              shape="square"
              src={`https://api.adorable.io/avatars/60/${id}`}
            />
          }
          title={`${first} ${last}`}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {id && <EmployeeInfoRow name={'ID'} value={id} />}
          {department && (
            <EmployeeInfoRow name={'Department'} value={department} />
          )}
          {office && <EmployeeInfoRow name={'Office'} value={office} />}
        </div>
      </Card>
      {displayButton && (
        <CollapseButton collapsed={collapsed} onClick={onClick} />
      )}
      {!collapsed && (
        <Divider style={{ height: 40, width: 2, backgroundColor: "#2c003e" }} type="vertical" />
      )}
    </div>
  )
}

export default EmployeeCard
