import React, { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="grid min-h-screen place-items-center">{children}</div>
}

export default Layout
