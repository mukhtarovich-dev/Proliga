import { memo } from 'react'
import { Loader } from 'lucide-react'

const StadiumSpinner = () => {
  return (
    <div className="absolute right-0 bottom-0 left-0 mx-auto flex h-full items-center justify-center self-center rounded-md">
      <Loader className="mx-auto size-10 animate-spin text-white sm:size-12" />
    </div>
  )
}

export default memo(StadiumSpinner)
