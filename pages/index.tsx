import type { GetServerSideProps, NextPage } from 'next'
import getHeaders from '../utils/getHeaders'

export const getServerSideProps: GetServerSideProps = async () => {
  if (!process.env.API_ENDPOINT)
    return { props: { error: 'Environment variables not defined' } }

  const headers = getHeaders()

  const res = await fetch(`${process.env.API_ENDPOINT}/showcase`, {
    method: 'GET',
    headers: headers,
  })

  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

const Home: NextPage = () => {
  return <></>
}

export default Home
