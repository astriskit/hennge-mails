import Header from 'next/head'
import { Home } from '../routes'

import { Email } from '../routes/Home/emails'

const Mails = ({ emails = [] }: { emails: Email[] }) => {
  return (
    <>
      <Header>
        <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
      </Header>
      <Home emails={emails} />
    </>
  )
}

export async function getServerSideProps() {
  const { emails } = await import('../routes/Home/emails')
  return { props: { emails } }
}

export default Mails
