import { FaRegTrashAlt } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import { IoMdTime } from 'react-icons/io'
import { LuPencil } from 'react-icons/lu'
import { TbDotsVertical } from 'react-icons/tb'

interface IconProps {
   name: 'Arrow_Right' | 'Trash' | 'Time' | 'Dots_Vertical' | 'Pen'
}

export default function Icon({ name }: IconProps) {
   switch (name) {
      case 'Arrow_Right':
         return <FaArrowRight />
      case 'Trash':
         return <FaRegTrashAlt />
      case 'Time':
         return <IoMdTime />
      case 'Dots_Vertical':
         return <TbDotsVertical />
      case 'Pen':
         return <LuPencil />
      default:
         return <span>Icon not found</span> // Or any other fallback
   }
}
