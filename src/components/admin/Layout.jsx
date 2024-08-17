import React from 'react'


const Layout = () => {
  return (
    <>
      <div className="w-full md:w-[80%] mt-[60px] mx-auto">
            <div className="w-full grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col md:col-span-4 ">
                    <div className="w-full text-lg font-bold ps-3 md:text-4xl">
                        Hello , Name Here 👋
                    </div>
                    <div className="text-zinc-500 ps-3 font-semibold pt-1">Commission Percentage : 5%</div>
                    <div className="w-full gflex  items-center  gap-5">
                      <div className="w-[223px] h-[223px] rounded-md bg-[#FFE2E5] flex flex-col ps-2"></div>
                    </div>
                </div>
                <div className="flex flex-col md:col-span-6"></div>
            </div>
      </div>
    </>
  )
}

export default Layout
