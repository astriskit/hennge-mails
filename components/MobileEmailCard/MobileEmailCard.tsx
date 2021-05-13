import React from 'react'
import cx from 'classnames'

import { EmailDate } from '../EmailDate'
import { EmailFrom } from '../EmailFrom'

import styles from './MobileEmailCard.module.scss'

interface MobileEmailCardProps {
  to: string
  from: string[]
  subject: string
  date: number | string // parsible to date
  children: string
  className?: string
}

const hasAttachments = true

export const MobileEmailCard = ({
  to,
  from,
  subject,
  children,
  date,
  className,
}: MobileEmailCardProps) => {
  const [hiddenEmails, setHiddenEmails] = React.useState<number>(0)
  const [showHiddenEmails, setShowHiddenEmails] = React.useState<boolean>(false)
  const [showBody, setShowBody] = React.useState<boolean>(false)

  const toggleBody = () => setShowBody((t) => !t)
  const toggleHiddenEmails = () => setShowHiddenEmails((t) => !t)
  return (
    <div className={cx(styles.mobileEmailCard, className)}>
      <img
        src="/images/icon_mail_sp.svg"
        alt="to-from"
        className={styles.mailIcon}
      />
      <div className={styles.to}>{to}</div>
      {hasAttachments && (
        <img
          src="/images/icon_clip.svg"
          alt="attachment"
          className={styles.iconClip}
        />
      )}
      <EmailFrom
        width={25}
        className={styles.fromWrapper}
        onHiddenChange={setHiddenEmails}
        expanded={showHiddenEmails}
      >
        {from}
      </EmailFrom>
      {!!hiddenEmails && (
        <div className={styles.hiddenEmails} onClick={toggleHiddenEmails}>
          {showHiddenEmails ? '-' : '+'}
          {hiddenEmails}
        </div>
      )}
      <EmailDate className={styles.date}>{date}</EmailDate>
      <img
        src="/images/icon_arrow02.svg"
        alt="arrow"
        className={cx(styles.arrowIcon, { [styles.downArrowIcon]: showBody })}
      />
      <div className={styles.subject} onClick={toggleBody}>
        {subject}
      </div>
      {showBody && <div className={styles.body}>{children}</div>}
    </div>
  )
}
