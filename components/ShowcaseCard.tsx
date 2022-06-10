import React, { FC } from 'react'

import { Showcase } from '../types/Showcase'

import LinkParser from '@components/LinkParser'

interface ShowcaseCardProps extends Showcase {
  className?: string
}

const ShowcaseCard: FC<ShowcaseCardProps> = ({
  name,
  medias,
  links,
  description,
  className,
}) => {
  return (
    <div className={[className, 'flex flex-col items-start gap-y-8'].join(' ')}>
      <div className="flex justify-between w-full">
        <h2 className="font-serif text-3xl font-bold">{name}</h2>
        <>Like Button</>
      </div>
      <img
        src={medias[0]?.url}
        alt={name}
        className="object-cover w-full shadow-xl rounded-2xl aspect-video"
      />
      <div className="flex items-center gap-x-4">
        {links?.split(',').map((link: string) => (
          <LinkParser key={link} link={link} />
        ))}
      </div>
      <p>{description}</p>
    </div>
  )
}

export default ShowcaseCard
