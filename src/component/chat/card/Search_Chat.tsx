import React from 'react'

interface Toggle {
    isOpen: boolean;
    isClose: () => void;
    // data: CardProps;
    // type: string;
    // handleAccept: () => void;
    // info: InfoProps
}

function Search_Chat({ isOpen, isClose }: Toggle) {

    return (
        <div>Search_Chat</div>
    )
}

export default Search_Chat