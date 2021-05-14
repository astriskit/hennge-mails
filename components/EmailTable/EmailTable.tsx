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

import { sortKey, sortOrd } from '../../routes/Home/Home'
import { useSort } from '../../utils'
import { IconClip } from './IconClip'

interface EmailTableProps {
  emails: Email[]
  className?: string
  sortOrder: sortOrd
  sortKey: sortKey
  onSort(id: sortKey, type: sortOrd): void
}

const hasAttachment = (mapId: number) => {
  // attachment
  if (mapId % 5) {
    return true
  }
  return false
}

export const EmailTable = ({
  emails = [],
  className = '',
  sortKey,
  sortOrder,
  onSort,
}: EmailTableProps) => {
  const { active, type, handleSort } = useSort(sortKey, sortOrder, onSort)

  const [hiddenEmailsInRow, setHiddenEmailsInRow] = React.useState<
    { key: string; value: number }[]
  >([])
  const [expandedRows, setExpandedRows] = React.useState<string[]>([])
  const [haveFocus, setHaveFocus] = React.useState<string[]>([])

  const handleMouseEnter = (mapId: string) => () =>
    setHaveFocus((t) => [...t, mapId])
  const handleMouseLeave = (mapId: string) => () =>
    setHaveFocus((t) => t.filter((r) => r !== mapId))

  const hasFocus = (mapId: string) => haveFocus.includes(mapId)
  const expanded = (mapId: string) => expandedRows.includes(mapId)

  const setHiddenEmails = (mapId: string, value: number) =>
    setHiddenEmailsInRow((t) => {
      let added = false
      for (let ob of t) {
        if (ob.key === mapId) {
          ob.value = value
          added = true
        }
      }
      if (!added) {
        t.push({ key: mapId, value })
      }
      return t
    })
  const hiddenEmails = (mapId: string) => {
    const found = hiddenEmailsInRow.find(({ key, value }) => key === mapId)
    if (!found) {
      return 0
    }
    return found.value
  }

  const toggleBody = (mapId: string) => () =>
    setExpandedRows((t) => {
      if (t.includes(mapId)) {
        return t.filter((r) => r !== mapId)
      }
      return [...t, mapId]
    })

  return (
    <div className={cx(styles.emailTable, className)}>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort('from')}>
              <ArrowFrom
                className={styles.arrowSize}
                active={active('from')}
                type={type('from')}
              />
            </th>
            <th>
              <ArrowTo className={cx(styles.arrowSize, styles.arrowTo)} />
            </th>
            <th onClick={handleSort('subject')}>
              <ArrowSubject
                className={styles.arrowSize}
                active={active('subject')}
                type={type('subject')}
              />
            </th>
            <th onClick={handleSort('date')}>
              <ArrowDate
                className={styles.arrowSize}
                active={active('date')}
                type={type('date')}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {emails.map(({ to, from, subject, date, body }, id) => {
            const mapId = `${to}-${from}-${subject}-${date}`
            return (
              <React.Fragment key={id}>
                <tr
                  key={id}
                  onClick={toggleBody(mapId)}
                  onMouseEnter={handleMouseEnter(mapId)}
                  onMouseLeave={handleMouseLeave(mapId)}
                  className={cx({
                    [styles.hasFocus]: hasFocus(mapId),
                    [styles.expanded]: expanded(mapId),
                  })}
                >
                  <td className={cx({ [styles.active]: active('from') })}>
                    <div>{from}</div>
                  </td>
                  <td className={cx({ [styles.active]: active('to') })}>
                    <EmailTo
                      width={25}
                      className={styles.to}
                      onHiddenChange={(num) => setHiddenEmails(mapId, num)}
                    >
                      {to}
                    </EmailTo>
                    {!!hiddenEmails(mapId) && (
                      <GreyBox>+{hiddenEmails(mapId)}</GreyBox>
                    )}
                  </td>
                  <td className={cx({ [styles.active]: active('subject') })}>
                    <div className={styles.subject}>{subject}</div>
                    {hasAttachment(id) && (
                      <IconClip
                        className={cx(styles.clipIcon, {
                          [styles.blueClipIcon]: hasFocus(mapId),
                        })}
                      />
                    )}
                  </td>
                  <td className={cx({ [styles.active]: active('date') })}>
                    <EmailDate>{date}</EmailDate>
                  </td>
                </tr>
                {expanded(mapId) && (
                  <tr key={`${id}-extended`} className={styles.body}>
                    <td colSpan={4}>
                      <EmailCard
                        to={to}
                        from={from}
                        body={body}
                        subject={subject}
                        date={date}
                        attachments={hasAttachment(id)}
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
}
