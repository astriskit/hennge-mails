import cx from 'classnames'

import { Email } from '../../routes/Home/emails'

import styles from './EmailCard.module.scss'

interface EmailCardProps extends Email {
  className?: string
}

export const EmailCard = ({
  to,
  from,
  subject,
  body,
  attachments = false,
  className = '',
}: EmailCardProps) => (
  <div className={cx(styles.emailCard, className)}>
    <div className={styles.toTitle}>To:&nbsp;</div>
    <div className={styles.to}>{to.join(', ')}</div>
    <div className={styles.fromTitle}>From:&nbsp;</div>
    <div className={styles.from}>{from}</div>
    <div className={styles.subjectTitle}>Subject:&nbsp;</div>
    <div className={styles.subject}>{subject}</div>
    <div className={styles.attTitle}>Attachments:&nbsp;</div>
    <div className={styles.att}>{attachments ? 'Yes' : 'False'}</div>
    <div className={styles.bodyTitle}>
      ~~~ ~~~ ~~~ ~~~ ~~~ Body ~~~ ~~~ ~~~ ~~~ ~~~
    </div>
    <div className={styles.body}>{body}</div>
    <div className={styles.bodyEnd}> ~~~ x ~~~ </div>
  </div>
)
