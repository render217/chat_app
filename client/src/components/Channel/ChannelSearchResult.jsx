import React from 'react'
import { useUIState } from '../../context/UiStateProvider';
import { ChannelItem } from './ChannelItem';

export const ChannelSearchResult = ({ results }) => {
    const {
        isMobileScreen,
        closeSideBar,
        isChannelOpen,
        openChannel,
        closeChannel,
        isModalOpen,
        openModal,
    } = useUIState();


    let content;

    if (results.length === 0) {
        content = <p>No Result Found</p>
    }
    if (results.length > 0) {
        content = results.map(result => {
            return <ChannelItem key={result._id} data={result} />
        })
    }

    return (
        <div className='py-4'>
            <p onClick={openChannel}>
                {content}
            </p>
        </div>
    )
}
