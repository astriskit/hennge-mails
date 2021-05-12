import cx from 'classnames'

import { ArrowText } from '../ArrowText'

import styles from './TableHeader.module.scss'

interface TableHeaderProps {
  className?: string
}

const VerticalDivider = ({ className = '' }) => (
  <span className={className}>|</span>
)

export const TableHeader = ({ className = '' }: TableHeaderProps) => (
  <div className={cx(styles.tableHeader, className)}>
    <ArrowText type="down" active>
      From
    </ArrowText>
    <VerticalDivider className={styles.divider} />
    <ArrowText>To</ArrowText>
    <VerticalDivider className={styles.divider} />
    <ArrowText>Subject</ArrowText>
    <VerticalDivider className={styles.divider} />
    <ArrowText>Date</ArrowText>
  </div>
)
