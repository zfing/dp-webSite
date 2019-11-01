import lrz from 'lrz'

export default file => new Promise((resolve, reject) => {
  lrz(file, {
    width: 2000,
    height: 2000,
    quality: 0.9,
  })
    .then(res => resolve(res.file))
    .catch(err => reject(err))
})
