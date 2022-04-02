import * as React from "react"
import { Link } from "gatsby"
import { PrismaClient } from '@prisma/client'
import { Box } from '@chakra-ui/react'

import Layout from "../components/layout"
import Seo from "../components/seo"

const prisma = new PrismaClient()

const UsingSSRPrisma = ({ serverData }) => {
  return (
    <Layout>
      <Seo title="Using SSR" />
      <h1>SSR page</h1>
   
      <div>
      {serverData.map((author) => (
          <Box key={author.id} fontSize="lg">
            <Link to={`/author/${author.id}`}>
              {author.name}
            </Link>
          </Box>
        ))}
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default UsingSSRPrisma

export async function getServerData() {
    // try {
    //   const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
      const res = await prisma.author.findMany()
      console.log(res)
    return {
    //   props: await res.json(),
      props: await res,
    }
//   } catch (error) {
//     console.log(' ----==== prisma errors ====---- ')
//     return {
//       status: 500,
//       headers: {},
//       props: {},
//     }
//   }
}
