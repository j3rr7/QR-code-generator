import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { Hero } from '~/components/Hero'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ request, params }: LoaderArgs) {
  const resp = await fetch(
    'http://ip-api.com/json/?fields=country,regionName,city'
  )
  let locationString = 'Another World Far Far Away'
  if (resp.status == 200) {
    let locationData = await resp.json()
    locationString = `${locationData.city}, ${locationData.country} ${locationData.regionName}`
  }

  return json({
    date: new Date().toLocaleString(),
    location: locationString,
  })
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <>
      <Header date={loaderData.date} location={loaderData.location} />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
