export function pointFormat(point) {
  if (Array.isArray(point)) {
    const x = Number(point[0])
    const y = Number(point[1])
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return []
    }
    return [x, y]
  }
  return []
}

export function pointsFormat(points) {
  if (Array.isArray(points)) {
    return points
      .filter(_ => Array.isArray(_))
      .map(point => pointFormat(point))
  }
  return []
}

export function getLastTime(points) {
  const result = pointsFormat(points)
  const last = result[result.length - 1]
  return Array.isArray(last) ? Number(last[0]) : null
}

export function addPoints(points, series) {
  if (!Array.isArray(points)) points = []
  for (let i = 0; i < points.length; i++) {
    series.addPoint(pointFormat(points[i]), false)
  }
}
