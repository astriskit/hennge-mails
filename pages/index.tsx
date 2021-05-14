import React from 'react'
import Header from 'next/head'
import { isBefore, isAfter } from 'date-fns'
import { sortKey, sortOrd, filterVal } from '../routes/Home'
import { TypeDateRange } from '../components/DateRange'
import { Home } from '../routes'

import { Email } from '../routes/Home/emails'

const Mails = ({ emails = [] }: { emails: Email[] }) => {
  const [filtered, setFiltered] = React.useState(emails)

  const [filter, setFilter] = React.useState<{
    key: sortKey
    value: filterVal
  }>({ key: '', value: '' })

  const [sort, setSort] = React.useState<{ key: sortKey; value: sortOrd }>({
    key: 'date',
    value: 'desc',
  })

  React.useEffect(() => {
    let newFiltered = emails
    if (
      (filter?.key === 'date' &&
        ((filter.value as TypeDateRange)?.from ||
          (filter.value as TypeDateRange)?.to)) ||
      (filter?.key !== 'date' && filter.value)
    ) {
      const filKey = filter.key
      let filVal = filter.value
      newFiltered = newFiltered.filter((email) => {
        if (filKey === 'to' || filKey === 'from' || filKey === 'subject') {
          return email[filKey].includes(filVal.toString())
        }
        if (filKey === 'date') {
          const { from = '', to = '' } = filVal as TypeDateRange
          if (from || to) {
            const fDate = new Date(from)
            const tDate = new Date(to)
            const teDate = new Date(email[filKey])
            if (from && to) {
              return isAfter(teDate, fDate) && isBefore(teDate, tDate)
            } else if (from) {
              return isAfter(teDate, fDate)
            } else if (to) {
              return isBefore(teDate, tDate)
            }
          }
        }
        return true
      })
    }
    if (sort.key && sort.value) {
      if (
        (sort.key === 'date' ||
          sort.key === 'from' ||
          sort.key === 'subject' ||
          sort.key === 'to') &&
        sort.value
      ) {
        newFiltered.sort((a, b) => {
          let valueA = a[sort.key]
          let valueB = b[sort.key]
          if (sort.key === 'to') {
            valueA = valueA.join(', ')
            valueB = valueB.join(', ')
          }
          if (sort.value === 'asc') {
            return valueA < valueB ? -1 : valueA === valueB ? 0 : 1
          } else if (sort.value === 'desc') {
            return valueA < valueB ? 1 : valueA === valueB ? 0 : -1
          }
        })
      }
    }
    setFiltered(newFiltered)
  }, [filter.key, filter.value, sort.key, sort.value])

  const handleSort = (key: sortKey, value: sortOrd) => {
    setSort({ key, value })
  }
  const handleFilter = (key: sortKey, value: filterVal) => {
    setFilter({ key, value })
  }

  return (
    <>
      <Header>
        <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
      </Header>
      <Home
        emails={filtered}
        onSort={handleSort}
        onFilter={handleFilter}
        sort={sort}
        filter={filter}
      />
    </>
  )
}

export async function getServerSideProps() {
  const { emails } = await import('../routes/Home/emails')
  return { props: { emails } }
}

export default Mails
