import { DateRange, Results } from '../../components'

import styles from './Home.module.scss'

export const Home = () => (
  <div className={styles.home}>
    <DateRange className={styles.dateRange} />
    <Results className={styles.results}>10</Results>
  </div>
)
