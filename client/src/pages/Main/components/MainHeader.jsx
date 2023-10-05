import React from 'react'
import { useUIState } from '../../../context/UiStateProvider'

export const MainHeader = () => {
  const { openSideBar, isMobileScreen } = useUIState();
  return (
    <div>
      <div className='flex items-center gap-2'>
        {isMobileScreen && <p className='text-xl' onClick={openSideBar}>🍩</p>}

        <h2>Main Header</h2>
      </div>
    </div>
  )
}
