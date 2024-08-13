import React from 'react'
import Info from './Info'
import ApiHistory from './ApiHistory'

const Layout = () => {
  return (
    <>
        <div className=" w-full md:w-[80%] mx-auto mt-[80px] flex flex-col ps-2 pt-2">
          <div className="font-semibold text-2xl py-2">Dashboard</div>
          <Info />
          <div className="w-full grid gird-cols-1 lg:grid-cols-2 gap-3">
              <ApiHistory />
              <ApiHistory />
          </div>
        </div>
    </>
      )
}

export default Layout