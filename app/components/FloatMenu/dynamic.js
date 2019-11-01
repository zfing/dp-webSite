import dynamic from 'next/dynamic'

export default dynamic({
  loader: () => import('./index'),
  loading: () => null,
  ssr: false,
})
