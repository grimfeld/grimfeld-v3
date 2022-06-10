import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ShowcaseCard from '../../components/ShowcaseCard'
import { Showcase } from '../../types/Showcase'
import getHeaders from '../../utils/getHeaders'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'
import { useWindowSize } from 'usehooks-ts'

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

export default function PortfolioPage({
  data,
  error,
}: {
  data: any
  error: string
}) {
  const window = useWindowSize()

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? window.width / 8 : -window.width / 8,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? window.width / 8 : -window.width / 8,
        opacity: 0,
      }
    },
  }
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = wrap(0, data.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const router = useRouter()

  if (error) return <p>{error}</p>

  return (
    <div className="relative flex items-center justify-between w-1/2 h-screen">
      <i
        className="z-50 -ml-32 text-6xl cursor-pointer bx bx-chevron-left"
        onClick={() => paginate(-1)}
      ></i>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 100, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full"
        >
          <ShowcaseCard {...data[imageIndex]} />
        </motion.div>
      </AnimatePresence>
      <i
        className="z-50 -mr-32 text-6xl cursor-pointer bx bx-chevron-right"
        onClick={() => paginate(1)}
      ></i>
    </div>
  )
}
