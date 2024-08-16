import React from 'react'
import auth from '../assets/auth.png'
import FAQAccordion from '../auth/FAQS'
const FormLayer = ({children}) => {
  return (
    <>
      <div className="w-full  grid grid-cold-1 md:grid-cols-2">
        <div className="h-screen w-full  justify-center flex-col items-center hidden md:flex bg-[#6172F3]">
          <div className="w-[512px] h-[512px] rounded-full border-[50px] border-[#5A69ED] flex justify-center items-center">
            <img src={auth} alt="" className="" />
          </div>
        </div>
        <div className="max-h-screen flex-col  overflow-y-scroll flex  bg-white">
            <div className="w-full flex justify-center items-center min-h-[90vh]">
              {children}
            </div>
            <FAQAccordion />
        </div>
      
      </div>
    </>
  )
}

export default FormLayer
