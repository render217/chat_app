import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { ChannelSearchResult } from './ChannelSearchResult';
import { groups } from '../../data/data';

export const ChannelSearch = () => {
    const [search, setSearch] = useState();

    return (
        <div className='py-4'>
            <div className='bg-clrShipGrey py-2 rounded-md px-2 flex items-center'>
                <FontAwesomeIcon icon={faSearch} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-full outline-0 outline-offset-0 border-none bg-transparent pl-4 text-lg' type="text" placeholder='search' />
            </div>
            <div>
                <ChannelSearchResult results={groups} />
            </div>
        </div>
    )
}
