import React from 'react'
import { Avatar, Button, Card, Icon, Typography } from 'antd'

const { Meta } = Card
const { Text } = Typography

function EmployeeInfoRow({ name, value }) {
  return (
    <p style={{ margin: 1 }}>
      <Text strong>{name}:</Text> {value}
    </p>
  )
}

function Employee({ employee, displayButton, onClick, collapsed }) {
  const { id, first, last, office, department } = employee
  return (
    <>
      <Card
        size="small"
        style={{ width: 250, borderRadius: 5, border: '2px solid' }}
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
            justifyContent: 'space-between'
          }}
        >
          <EmployeeInfoRow name={'ID'} value={id} />
          <EmployeeInfoRow name={'Department'} value={department} />
          <EmployeeInfoRow name={'Office'} value={office} />
        </div>
      </Card>
      {displayButton && (
        <div
          style={{
            display: 'flex',
            border: '1px solid',
            justifyContent: 'center'
          }}
        >
          <Button
            shape="circle"
            style={{ position: 'relative', top: -18 }}
            onClick={onClick}
          >
            {collapsed ? (
              <Icon type="plus-circle" theme="filled" />
            ) : (
              <Icon type="minus-circle" theme="filled" />
            )}
          </Button>
        </div>
      )}
    </>
  )
}

export default Employee
