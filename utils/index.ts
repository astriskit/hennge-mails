import { sortKey as sKey, sortOrd } from '../routes/Home/Home'

interface TypeOnSort {
  (key: sKey, value: sortOrd): void
}

export const useSort = (
  sortKey: sKey,
  sortOrder: sortOrd,
  onSort: TypeOnSort
) => {
  const active = (key: sKey) => key === sortKey
  const type = (key: sKey) =>
    active(key)
      ? sortOrder === 'asc'
        ? 'up'
        : sortOrder === 'desc'
        ? 'down'
        : 'flat'
      : 'flat'
  const handleSort = (key: sKey) => () => {
    if (active(key)) {
      if (type(key) === 'up') {
        onSort('', '')
      } else if (type(key) === 'down') {
        onSort(key, 'asc')
      }
    } else {
      onSort(key, 'desc')
    }
  }
  return { active, type, handleSort }
}
