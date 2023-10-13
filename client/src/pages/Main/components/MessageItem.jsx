import React from 'react'

export const MessageItem = () => {
    let d = {
        _id: "6527079ff1230308a53b34df",
        sender: {
            _id: "65259c1b2a225b951f9d374a",
            username: "beamlak",
            email: "test@test",
        },
        content: "Etiam eleifend fermentum ipsum eu rhoncus. In non justo aliquam, imperdiet metus id, tincidunt orci 😍",
        chat: "6525b8c79b508841d0159a46",
        createdAt: "2023-10-11T20:37:51.743Z",
        updatedAt: "2023-10-11T20:37:51.743Z",
        __v: 0,
    };
    const shortName = d.sender.username.substring(0, 2).toUpperCase();
    const time = 'yesterday at 2:29 AM'
    const fullName = d.sender.username.charAt(0).toUpperCase() + d.sender.username.substring(1);
    return (
        <>
            <div className='mb-5'>
                <div className='flex items-start gap-3 py-3 '>
                    <div className="ml-1 px-3 py-2 text-sm rounded-md  bg-clrSmokyBlack ">{shortName}</div>
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2 text-clrGunsmoke'>
                            <p className='font-semibold text-sm'>{fullName}</p>
                            <p className='text-xs'>{time}</p>
                        </div>
                        <div>
                            <p className='text-clrPearlBush'>{d.content + 'lorem ipsum is '}</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis vero hic omnis vitae dolorum voluptatibus inventore explicabo obcaecati sed et. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quis perferendis. Quas possimus nostrum sequi sed illo nihil tempora nam amet itaque fugit cumque facilis quia consectetur magni culpa non delectus, eveniet sunt, minus architecto obcaecati odit! Laboriosam, ducimus rerum.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
