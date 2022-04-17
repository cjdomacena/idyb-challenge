import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Logo: React.FC<Props> = (props: Props) => {
  return (
	<Link to="/"><p className=" uppercase font-bold text-2xl tracking-widest">Staem</p></Link>
  )
}

export default Logo