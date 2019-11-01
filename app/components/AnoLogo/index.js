import React from 'react'
import Avatar from 'components/Avatar'
import anoPNG1 from 'static/img/ano1.png'
import anoPNG2 from 'static/img/ano2.png'
import anoPNG3 from 'static/img/ano3.png'

// function RandomNumBoth(Min, Max) {
//   const Range = Max - Min
//   const Rand = Math.random()
//   const num = Min + Math.round(Rand * Range) // 四舍五入
//   return num
// }

function Ano1(props) {
  return <Avatar {...props} src={anoPNG1} />
}
function Ano2(props) {
  return <Avatar {...props} src={anoPNG2} />
}
function Ano3(props) {
  return <Avatar {...props} src={anoPNG3} />
}

function AnoLogo({ id, ...props }) {
  // const randomNum = RandomNumBoth(1, 3)

  if ((id % 3) === 0) {
    return <Ano1 {...props} />
  } if ((id % 3) === 2) {
    return <Ano2 {...props} />
  }
  return <Ano3 {...props} />
}

export default AnoLogo
