import React from 'react'

import {
  DateRange,
  EmailTable,
  MobileEmailCard,
  Results,
  TableHeader,
} from '../../components'

import { TypeDateRange, DateNumber } from '../../components/DateRange'

import { Email } from './emails'

import styles from './Home.module.scss'

export type sortKey = 'to' | 'from' | 'subject' | 'date' | ''
export type sortOrd = 'asc' | 'desc' | ''
export type filterVal = string | number | TypeDateRange | ''
export interface HomeProps {
  emails: Email[]
  sort: {
    key: sortKey
    value: sortOrd
  }
  filter: {
    key: sortKey
    value: filterVal
  }
  onSort(key: sortKey, value: sortOrd): void
  onFilter(key: sortKey, value: filterVal): void
}

export const Home = ({
  emails = [],
  onFilter,
  onSort,
  sort,
  filter,
}: HomeProps) => {
  const handleFilterDate = (from, to) => {
    onFilter('date', {
      from,
      to,
    })
  }

  const filterDate =
    filter.key === 'date'
      ? (filter.value as TypeDateRange)
      : { from: '', to: '' }

  return (
    <div className={styles.home}>
      <DateRange
        className={styles.dateRange}
        value={filterDate}
        onOk={handleFilterDate}
      />
      <Results className={styles.results}>{emails.length}</Results>
      {!!emails.length && (
        <TableHeader
          className={styles.mobileTableHeader}
          sortOrder={sort.value}
          sortKey={sort.key}
          onSort={onSort}
        />
      )}
      {!!emails.length && (
        <div className={styles.emailList}>
          {emails.map(({ to, from, subject, date, body }, id) => (
            <MobileEmailCard
              key={id}
              className={styles.mobileEmailCard}
              to={to}
              from={from}
              subject={subject}
              date={date}
            >
              {body}
            </MobileEmailCard>
          ))}
        </div>
      )}
      {!!emails.length && (
        <EmailTable
          emails={emails}
          className={styles.emailTable}
          sortOrder={sort.value}
          sortKey={sort.key}
          onSort={onSort}
        />
      )}
      {!emails.length && (
        <div className={styles.noResults}>
          <hr />
          <div>
            <img src="/images/logo.png" alt="logo" />
          </div>
        </div>
      )}
    </div>
  )
}
