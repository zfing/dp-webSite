import md5 from 'blueimp-md5'

export const thr = 31

export default {
  decode: (st = '') => {
    const nx = st.substr(10)
    return Number(nx) - thr
  },
  encode: (id = 0) => {
    const nx = (Number(id) || 0) + thr
    return md5(id).substr(0, 10) + nx
  },
}
