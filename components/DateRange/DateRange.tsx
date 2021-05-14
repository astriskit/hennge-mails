import React, { useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './DateRange.module.scss'

export type DateNumber = string | number | ''
export type TypeDateRange = { from: DateNumber; to: DateNumber }
interface DateRangeProps {
  default?: TypeDateRange
  value?: TypeDateRange
  onChange?(from: DateNumber, to: DateNumber): void
  onOk?(from: DateNumber, to: DateNumber): void
  className?: string
}

export const DateRange = ({
  default: { from: dFrom = '', to: dTo = '' } = { from: '', to: '' },
  value: { from: vFrom, to: vTo } = { from: undefined, to: undefined },
  onChange = null,
  onOk = null,
  className = '',
}: DateRangeProps) => {
  const [range, setRange] = useState({ from: vFrom || dFrom, to: vTo || dTo })

  useEffect(() => {
    setRange({ from: vFrom, to: vTo })
  }, [vFrom, vTo])

  useEffect(() => {
    onChange && !onOk && onChange(range.from, range.to)
  }, [range.from, range.to])

  const changeHandler = (key: 'from' | 'to') => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setRange((r) => ({ ...r, [key]: value as DateNumber }))

  const onReset = () =>
    onOk ? onOk('', '') : onChange ? onChange('', '') : null

  const resetDisabled = !range.from || !range.to

  return (
    <div className={cx(styles.dateRangeWrapper, className)}>
      <div className={styles.dateRange}>
        <img
          src="/images/icon_calender.svg"
          alt="calendar"
          className={styles.iconCalendar}
        />
        <input
          type="date"
          value={range.from}
          onChange={changeHandler('from')}
          className={cx(styles.dateInput, styles.dateFrom)}
        />
        <span className={styles.rangeSeparator}>-</span>
        <input
          type="date"
          value={range.to}
          onChange={changeHandler('to')}
          className={cx(styles.dateInput, styles.dateTo)}
        />
      </div>
      <img
        src="/images/icon_search.svg"
        alt="search"
        className={styles.iconSearch}
        onClick={() => onOk(range.from, range.to)}
      />
      {onReset && !resetDisabled && (
        <img
          onClick={onReset}
          src="/images/reset.png"
          alt="reset"
          className={cx(styles.iconSearch, styles.iconReset)}
          title="reset"
        />
      )}
    </div>
  )
}
