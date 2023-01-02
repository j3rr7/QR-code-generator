import { ButtonLink } from '~/components/Button'
import { Container } from '~/components/Container'

export function Hero() {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute -inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50 z-[-1]">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            <span className="sr-only">QR Code Generator </span>QR Code Generator
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
            <p>
              The next generation of QR code generator with extra utility and
              function. Usefull for validation of users or participans with API
              to access your data and secure way to store your data for free.
            </p>
            <p>
              Sign In to connect your data with validation from qr code. Any
              data recieved will be encrypted and stored somewhere safe. We are
              not responsible for any loss of data nor data misuse from our
              users.
            </p>
          </div>
          <ButtonLink href="/dashboard" className={'mt-10 w-full'}>
            Getting Started
          </ButtonLink>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['API HIT', randomInteger(1000, 100000)],
              ['Users', randomInteger(1, 50)],
              ['QR Code Generated', randomInteger(1, 1000000)],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
