import React from 'react'
import { Avatar, Badge, Button, Card } from 'antd'

function Employee({ employee, displayButton, onClick, collapsed }) {
  const { id, first, last, office, department } = employee
  console.log(id)
  return (
    <>
      <Card
        size="small"
        style={{ width: 250, borderRadius: 5, border: '2px solid' }}
        title={`${first} ${last}`}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid',
            alignItems: 'center'
          }}
        >
          <Badge count={id}>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              U
            </Avatar>
          </Badge>
        </div>
        <p>{`Department: ${department}`}</p>
        <p>{`Office: ${office}`}</p>
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
            type="dashed"
            shape="circle"
            style={{ position: 'relative', top: -18 }}
            onClick={onClick}
          >
            {collapsed ? '+' : '-'}
          </Button>
        </div>
      )}
    </>
  )
}

export default Employee
