import React from 'react'

const Feedback = ({isActive}) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_101_48)">
                <path d="M23.3334 2.33333H4.66671C3.37754 2.33333 2.34504 3.37749 2.34504 4.66666L2.33337 25.6667L7.00004 21H23.3334C24.6225 21 25.6667 19.9558 25.6667 18.6667V4.66666C25.6667 3.37749 24.6225 2.33333 23.3334 2.33333ZM15.1667 16.3333H12.8334V14H15.1667V16.3333ZM15.1667 11.6667H12.8334V7H15.1667V11.6667Z" fill={`${isActive?'#FA782F':'#C4C4C4'}`} />
            </g>
            <defs>
                <clipPath id="clip0_101_48">
                    <rect width="28" height="28" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default Feedback