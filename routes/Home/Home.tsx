import {
  DateRange,
  EmailTable,
  MobileEmailCard,
  Results,
  TableHeader,
} from '../../components'

import { Email } from './emails'

import styles from './Home.module.scss'

export const Home = ({ emails = [] }: { emails: Email[] }) => (
  <div className={styles.home}>
    <DateRange className={styles.dateRange} />
    <Results className={styles.results}>{emails.length}</Results>
    {emails.length && <TableHeader className={styles.mobileTableHeader} />}
    {emails.length && (
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
    {emails.length && (
      <EmailTable emails={emails} className={styles.emailTable} />
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
