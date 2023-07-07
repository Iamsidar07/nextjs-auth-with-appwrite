import Image from 'next/image'
import React, { FC } from 'react'
type AvatarProps = {
    image: string,
    alt?: string,
}
const Avatar: FC<AvatarProps> = ({ image, alt }) => {
  return (
      <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
          <div className="absolute inset-0">
              <Image src={image} alt={alt || image} width={50} height={50}/>
          </div>
      </div>
  )
}

export default Avatar