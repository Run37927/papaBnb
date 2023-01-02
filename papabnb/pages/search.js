import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
import { nanoid } from 'nanoid'

function Search({ searchResults }) {
    console.log(searchResults);
    const router = useRouter();
    const { location, startDate, endDate, numOfGuests } = router.query; // destructuring the result (which is an object)
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;


    return (
        <div className='h-screen'>
            <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />

            <main className='flex'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text-xs'>300+ Stays - {range} -  for {numOfGuests} guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className='button'>Cancellation Flexibility</p>
                        <p className='button'>Type of place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms and Beds</p>
                        <p className='button'>More filters</p>
                    </div>

                    <div className='flex flex-col'>
                        {searchResults?.map(result => (
                            <InfoCard
                                key={nanoid()}
                                img={result.img}
                                location={result.location}
                                title={result.title}
                                description={result.description}
                                star={result.star}
                                price={result.price}
                                total={result.total}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search;



const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
export async function getServerSideProps() {
    const res = await fetch("https://links.papareact.com/isz",
        {
            agent: httpsAgent,
        },
    )

    const searchResults = await res.json();

    return {
        props: {
            searchResults: searchResults,
        }

    }
}