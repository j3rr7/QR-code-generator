import type { LinksFunction, ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import * as QRCode from 'qrcode'
import styles from '~/styles/qr.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData()
  const edt_content = form.get('edt_content')
  const errors = {}

  if (request.method !== 'POST') {
    return null
  }

  if (typeof edt_content !== 'string' || edt_content.length <= 0) {
    errors.content = 'hey :)... Should i report this?'
  }

  if (Object.keys(errors).length) {
    return null // return json(errors, { status: 422 })
  }

  // create qr from content
  let qr = await generateQR(edt_content)

  return new Response(qr, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}

export default function CreateQR() {
  const data = useActionData<typeof action>()
  return (
    <>
      {data ? (
        <img src={data} alt="QR Code" />
      ) : (
        <div className="container">
          <div className="unicode">
            <div>?</div>
            <div className="middle">?</div>
            <div className="right">?</div>
          </div>
          <div className="big-circle head">
            <div className="ear ear-left"></div>
            <div className="ear ear-right"></div>
            <div className="eye eye-left"></div>
            <div className="eye eye-right"></div>
            <div className="nose"></div>
            <div className="mouth"></div>
          </div>
          <div className="body"></div>
          <div className="big-circle hand hand-left"></div>
          <div className="hand hand-right"></div>
          <div className="leg leg-left"></div>
          <div className="leg leg-right"></div>
          <div className="shadow"></div>
        </div>
      )}
    </>
  )
}
