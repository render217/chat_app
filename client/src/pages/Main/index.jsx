import React from 'react'
import { MainHeader } from './components/MainHeader'
import { MainContent } from './components/MainContent'
import { MainBottom } from './components/MainBottom'

export const Main = () => {

  return (
    <>
      <div className='flex flex-col h-full' >
        <div className=' py-3 px-3 shadow-md shadow-clrSmokyBlack'>
          <MainHeader />
        </div>
        <div className='flex-1 overflow-x-hidden overflow-y-auto custom-main-scroll'>
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
        </div>
        <div className='py-4 px-2 border-t'>
          <MainBottom />
        </div>
      </div>
    </>
  )
}
