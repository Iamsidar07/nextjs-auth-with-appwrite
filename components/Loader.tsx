import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <Image src={'/spinner.jpg'} alt='loader' width={70} height={70} className="object-contain animate-spin mx-auto my-6" />
    )
}

export default Loader