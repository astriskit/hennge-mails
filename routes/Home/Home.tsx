import {
  DateRange,
  MobileEmailCard,
  Results,
  TableHeader,
} from '../../components'

import styles from './Home.module.scss'

export const Home = () => (
  <div className={styles.home}>
    <DateRange className={styles.dateRange} />
    <Results className={styles.results}>10</Results>
    <TableHeader className={styles.tableHeader} />
    <MobileEmailCard
      className={styles.mobileEmailCard}
      to="aaa@example.com"
      from={['zzz.zzz@example.com', 'www.www@example.com', 'yyy@example.com']}
      subject="Happy New Year! Greetings for the New Year."
      date={1620741276736}
    >
      Eos qui et quis quas et sunt eos. Labore similique sit quam ut. Hic
      corporis cupiditate voluptates.
    </MobileEmailCard>
  </div>
)
