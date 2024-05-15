import React from "react";

type Props = {
  color: string,
  children: React.ReactNode
}

const Background: React.FC<Props> = ({ color, children}) => {
  return (
    <span
      style={{
        backgroundColor: color,
      }}
    >{children}</span>
  )
}

export default Background;