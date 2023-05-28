import Image from 'next/image'

interface UserPictureProps {
  url: string
  size?: 'size-sm' | 'size-md' | 'size-lg'
}

export function UserPicture({ url, size = 'size-sm' }: UserPictureProps) {
  const picSize = {
    'size-sm': {
      size: 'w-8 h-8',
      border: 'p-[2px]',
    },
    'size-md': {
      size: 'w-10 h-10',
      border: 'p-[2px]',
    },
    'size-lg': {
      size: 'w-18 h-18',
      border: 'p-[4px]',
    },
  }

  return (
    <div
      className={`${picSize[size].size} ${picSize[size].border} flex items-center justify-center rounded-full bg-gradient-vertical p-[2px]`}
    >
      <Image
        src={url}
        alt="Profile Image"
        width={72}
        height={72}
        className={`h-fit w-fit rounded-full `}
      />
    </div>
  )
}
