import { GetServerSideProps } from 'next'
import LinkParser from '../../components/LinkParser'
import { Showcase } from '../../types/Showcase'
import getHeaders from '../../utils/getHeaders'

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!process.env.API_ENDPOINT)
    return { props: { error: 'Environment variables not defined' } }

  const id = context.params?.id

  if (!id) return { props: { error: 'No id provided' } }

  const headers = getHeaders()

  const res = await fetch(`${process.env.API_ENDPOINT}/showcase/${id}`, {
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

export default function PortfolioAppPage({
  data,
  error,
}: {
  data: Showcase
  error: string
}) {
  if (error) return <div>{error}</div>

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between">
        <h1 className="font-serif">{data.name}</h1>
        <button>{data.likes}</button>
      </div>
      {data.medias.map((media) => (
        <img key={media.id} src={media.url} alt={media.filename} />
      ))}
      {data.links.split(',').map((link) => (
        <LinkParser key={link} link={link} />
      ))}
      <p>{data.description}</p>
    </div>
  )
}
