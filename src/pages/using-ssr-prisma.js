import * as React from "react"
import { Link } from "gatsby"
// import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma';

import Layout from "../components/layout"
import Seo from "../components/seo"

// const prisma = new PrismaClient()

const UsingSSRPrisma = ({ serverData }) => {
  return (
    <Layout>
      <Seo title="Using SSR" />
      <h1>SSR page</h1>
      <img
        style={{ width: "300px" }}
        alt="A random dog"
        src={serverData.message}
      />

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default UsingSSRPrisma

export async function getServerData() {
  try {
    // const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    const res = await prisma.author.findMany()


    console.log(res)


    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
