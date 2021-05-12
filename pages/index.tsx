import Header from 'next/head'
import { Home } from '../routes'

const Mails = () => {
  return (
    <>
      <Header>
        <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
      </Header>
      <Home />
    </>
  )
}

export default Mails
