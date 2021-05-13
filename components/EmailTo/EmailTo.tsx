import React from 'react'
import cx from 'classnames'

import styles from './EmailTo.module.scss'

interface EmailToProps {
  children: string[]
  width: number // x ch
  className?: string
  onHiddenChange?(number): void
  expanded?: boolean
}

export const EmailTo = ({
  children,
  width,
  className = '',
  onHiddenChange = null,
  expanded = undefined,
}: EmailToProps) => {
  const [hidden, setHidden] = React.useState<number>(0)
  const [emails, setEmails] = React.useState<string>('')

  React.useEffect(() => {
    let emails = children.join(', ')
    if (expanded) {
      setEmails(emails)
    } else {
      if (emails.length > width - 5) {
        let cArr = emails.split('').slice(0, width - 5)
        let slP = cArr.join('').lastIndexOf(', ')
        cArr = cArr.slice(0, slP)
        emails = cArr.join('') + '...'
        setEmails(emails)
        const hide = children.filter(
          (cEm) => !cArr.join('').split(', ').includes(cEm)
        ).length
        if (hide && hidden !== hide) {
          setHidden(hide)
        }
      }
    }
  }, [expanded])

  React.useEffect(() => {
    onHiddenChange && onHiddenChange(hidden)
  }, [hidden])

  return <div className={cx(styles.EmailTo, className)}>{emails}</div>
}
