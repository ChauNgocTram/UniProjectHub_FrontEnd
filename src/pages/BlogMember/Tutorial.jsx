import React from 'react'

import step1 from '../../assets/images/step1.png'
import step2 from '../../assets/images/step2.png'
import step3 from '../../assets/images/step3.png'
import Footer from '../../components/Footer/Footer'

function Tutorial() {
  return (
    <>
    <div className='flex flex-col justify-center mx-24 mb-8'>
            <div className='pl-14'>
                <img src={step1} className=' px-24 pt-8' />
            </div>

            <div className='pl-14'>
                <img src={step2} className=' px-24 pt-8' />
            </div>

           
                {/* <img src={step3} className=' px-24 pt-8' /> */}
            
    </div>
    <Footer/>
    </>
    
  )
}

export default Tutorial