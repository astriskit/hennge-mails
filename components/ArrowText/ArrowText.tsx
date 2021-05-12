import cx from 'classnames'

import styles from './ArrowText.module.scss'

interface ArrowTextProps {
  children: string
  type?: 'up' | 'down' | 'flat'
  className?: string
  onClick?(): void
  active?: boolean
}

export const ArrowText = ({
  children,
  type = 'flat',
  className = '',
  onClick = null,
  active = undefined,
}: ArrowTextProps) => (
  <div
    className={cx(
      styles.arrowText,
      { [styles.activeArrowText]: !!active },
      className
    )}
    onClick={() => {
      onClick && onClick()
    }}
  >
    <span className={styles.title}>{children}</span>
    <img
      src="/images/icon_arrow01.svg"
      alt="arrow-up"
      className={cx(styles.arrow, {
        [styles.arrowUp]: type === 'up',
        [styles.arrowDown]: type === 'down',
        [styles.arrowFlat]: type === 'flat',
      })}
    />
  </div>
)
