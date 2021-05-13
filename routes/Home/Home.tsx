import {
  DateRange,
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
    <TableHeader className={styles.mobileTableHeader} />
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
  </div>
)
