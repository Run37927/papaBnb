// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'
import { nanoid } from 'nanoid'

export default function Home({ exploreData, cardsData }) {
  return (
    <div>
      <Head>
        <title>VEGAN SAUSAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>

          {/* pull data from server by using static rendering  (bc it's main page mostly like it's static, but if it's like a newspaper site, then better use server side rendering)*/}

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map((item) => (
              <SmallCard
                key={nanoid()}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map((item) => (
              <MediumCard
                key={nanoid()}
                img={item.img}
                title={item.title}
              />
            ))}
          </div>
        </section>

        <LargeCard
          img='https://links.papareact.com/4cj'
          title='The Greatest outdoors'
          description='Wishlists curated by Airbnb'
          buttonText='Get Inspired'
        />
      </main>

      <Footer />
    </div>
  )
}


const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function getStaticProps() {
  const res = await fetch("https://links.papareact.com/pyp",
    {
      agent: httpsAgent,
    },
  )

  const resp = await fetch("https://links.papareact.com/zp1",
    {
      agent: httpsAgent,
    },
  )

  const exploreData = await res.json();
  const cardsData = await resp.json();
  return {
    props: {
      exploreData,
      cardsData,
    }
  }
}
