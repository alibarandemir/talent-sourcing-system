import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";

function Loading({color,height,width}) {
  return (
    <FadeLoader color={color} height={height} width={width} radius={5}/>
  )
}

export default Loading;