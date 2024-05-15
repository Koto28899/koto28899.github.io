import React from 'react';

type Props = {
  children: React.ReactNode,
}

const FakeLink: React.FC<Props> = ({ children }) => {
  return <span
    title={
      '这是个假链接，点了没用'
    }
    onClick={event => alert('这是个假链接，点了没用')}
    style={{
      background: 'white',
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer',
      borderRadius: '2px',
      padding: '0.2rem'
  }}>{children}</span>
}

export default FakeLink;