import cx from 'classnames'
import { ArrowDate } from '../ArrowDate'
import { ArrowFrom } from '../ArrowFrom'
import { ArrowSubject } from '../ArrowSubject'

import { ArrowTo } from '../ArrowTo'

import { sortKey, sortOrd } from '../../routes/Home/Home'

import styles from './TableHeader.module.scss'
import { useSort } from '../../utils'

interface TableHeaderProps {
  className?: string
  sortOrder: sortOrd
  sortKey: sortKey
  onSort(id: sortKey, type: sortOrd): void
}

const VerticalDivider = ({ className = '' }) => (
  <span className={className}>|</span>
)

export const TableHeader = ({
  className = '',
  sortOrder,
  sortKey,
  onSort,
}: TableHeaderProps) => {
  const { active, type, handleSort } = useSort(sortKey, sortOrder, onSort)
  return (
    <div className={cx(styles.tableHeader, className)}>
      <ArrowFrom
        className={styles.cursor}
        type={type('from')}
        active={active('from')}
        onClick={handleSort('from')}
      />
      <VerticalDivider className={styles.divider} />
      <ArrowTo className={styles.to} />
      <VerticalDivider className={styles.divider} />
      <ArrowSubject
        className={styles.cursor}
        type={type('subject')}
        active={active('subject')}
        onClick={handleSort('subject')}
      />
      <VerticalDivider className={styles.divider} />
      <ArrowDate
        className={styles.cursor}
        type={type('date')}
        active={active('date')}
        onClick={handleSort('date')}
      />
    </div>
  )
}
