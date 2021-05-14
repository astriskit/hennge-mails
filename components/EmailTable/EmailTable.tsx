import React from 'react'
import cx from 'classnames'

import { Email } from '../../routes/Home/emails'
import { ArrowDate } from '../ArrowDate'
import { ArrowFrom } from '../ArrowFrom'
import { ArrowSubject } from '../ArrowSubject'
import { ArrowTo } from '../ArrowTo'
import { EmailDate } from '../EmailDate'
import { EmailTo } from '../EmailTo'

import styles from './EmailTable.module.scss'
import { GreyBox } from '../GreyBox'
import { EmailCard } from '../EmailCard'

interface EmailTableProps {
  emails: Email[]
  className?: string
}

const hasAttachment = true

export const EmailTable = ({
  emails = [],
  className = '',
}: EmailTableProps) => (
  <div className={cx(styles.emailTable, className)}>
    <table>
      <thead>
        <tr>
          <th>
            <ArrowFrom className={styles.arrowSize} />
          </th>
          <th>
            <ArrowTo className={styles.arrowSize} />
          </th>
          <th>
            <ArrowSubject className={styles.arrowSize} />
          </th>
          <th>
            <ArrowDate className={styles.arrowSize} type="up" active />
          </th>
        </tr>
      </thead>
      <tbody>
        {emails.map(({ to, from, subject, date, body }, id) => {
          const [hiddenEmails, setHiddenEmails] = React.useState<number>(0)
          const [expanded, setExpanded] = React.useState<boolean>(false)
          const [hasFocus, setHasFocus] = React.useState<boolean>(false)

          const handleMouseEnter = () => setHasFocus(true)
          const handleMouseLeave = () => setHasFocus(false)

          const toggleBody = () => setExpanded((t) => !t)
          return (
            <React.Fragment key={id}>
              <tr
                key={id}
                onClick={toggleBody}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cx({
                  [styles.hasFocus]: hasFocus,
                  [styles.expanded]: expanded,
                })}
              >
                <td>
                  <div>{from}</div>
                </td>
                <td>
                  <EmailTo
                    width={25}
                    className={styles.to}
                    onHiddenChange={setHiddenEmails}
                  >
                    {to}
                  </EmailTo>
                  {!!hiddenEmails && <GreyBox>+{hiddenEmails}</GreyBox>}
                </td>
                <td>
                  <div className={styles.subject}>{subject}</div>
                  {hasAttachment && (
                    <img
                      src="/images/icon_clip.svg"
                      alt="has-attachments"
                      className={styles.clipIcon}
                    />
                  )}
                </td>
                <td>
                  <EmailDate>{date}</EmailDate>
                </td>
              </tr>
              {expanded && (
                <tr key={`${id}-extended`} className={styles.body}>
                  <td colSpan={4}>
                    <EmailCard
                      to={to}
                      from={from}
                      body={body}
                      subject={subject}
                      date={date}
                      attachments={hasAttachment}
                      className={styles.emailCard}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  </div>
)
