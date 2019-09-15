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
        style={{ height: 120, width: 250, borderRadius: 5, backgroundColor: "#d6e4aa" }}
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
          {id && <EmployeeInfoRow name={'ID'} value={id} />}
          {department && <EmployeeInfoRow name={'Department'} value={department} />}
          {office && <EmployeeInfoRow name={'Office'} value={office} />}
        </div>
      </Card>
      {displayButton && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            shape="circle"
            style={{ position: 'relative', top: -18, color: "#76dbd1" }}
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
