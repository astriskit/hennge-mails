import React from 'react'
import cx from 'classnames'

import { EmailDate } from '../EmailDate'
import { EmailTo } from '../EmailTo'
import { GreyBox } from '../GreyBox'

import styles from './MobileEmailCard.module.scss'

interface MobileEmailCardProps {
  to: string[]
  from: string
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
      <div className={styles.from} title={from}>
        {from}
      </div>
      {hasAttachments && (
        <img
          src="/images/icon_clip.svg"
          alt="attachment"
          className={styles.iconClip}
        />
      )}
      <EmailTo
        width={25}
        className={styles.to}
        onHiddenChange={setHiddenEmails}
        expanded={showHiddenEmails}
      >
        {to}
      </EmailTo>
      {!!hiddenEmails && (
        <GreyBox className={styles.hiddenEmails} onClick={toggleHiddenEmails}>
          {showHiddenEmails ? '-' : '+'}
          {hiddenEmails}
        </GreyBox>
      )}
      <EmailDate className={styles.date}>{date}</EmailDate>
      <img
        src="/images/icon_arrow02.svg"
        alt="arrow"
        className={cx(styles.arrowIcon, { [styles.downArrowIcon]: showBody })}
      />
      <div
        className={cx(styles.subject, { [styles.expanded]: showBody })}
        onClick={toggleBody}
      >
        {subject}
      </div>
      {showBody && <div className={styles.body}>{children}</div>}
    </div>
  )
}
