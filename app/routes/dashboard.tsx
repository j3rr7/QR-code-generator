import type { MetaFunction, ActionArgs } from '@remix-run/node'
import { DialogQR } from '~/components/Dialog'
import { Footer } from '~/components/Footer'
import { Link, Form, useFetcher } from '@remix-run/react'
import { useState, useRef } from 'react'

export const meta: MetaFunction = () => ({
  title: 'Dashboard',
})

export default function DashboardIndex() {
  const [isOpen, setIsOpen] = useState(false)
  const textareaContext = useRef(null)
  const fetcher = useFetcher()

  return (
    <>
      <nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link
                to="/dashboard"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <main>
        <div className="flex h-screen bg-gray-100">
          <div className="m-auto">
            <fetcher.Form method="post" action="/qr/create">
              {/*
              <button
                type="button"
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <g>
                    <rect fill="none" height={24} width={24} />
                  </g>
                  <g>
                    <g>
                      <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                    </g>
                  </g>
                </svg>
                <span className="pl-2 mx-1">Create new Label</span>
              </button>
                */}
              <button
                type="submit"
                onClick={() => setIsOpen(true)}
                className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="#FFFFFF"
                    d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zM6 6h2v2H6V6zm0 10h2v2H6v-2zM16 6h2v2h-2V6z"
                  ></path>
                </svg>
                <span className="pl-2 mx-1">Generate QR</span>
              </button>
              <div className="mt-5 bg-white rounded-lg shadow">
                <div className="flex">
                  <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <svg
                      className="inline align-text-top"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M13 6v15h-2V6H5V4h14v2z" />
                    </svg>
                    <h1 className="inline text-2xl font-semibold leading-none">
                      Content
                    </h1>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <textarea
                    name="edt_content"
                    ref={textareaContext}
                    placeholder="Insert Content Here"
                    cols="40"
                    rows="5"
                    maxlength="2331"
                    className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-200 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                  {/*
                  <div className="flex items-center pt-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                    />
                    <label
                      htmlFor="safeAdress"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Save as default address
                    </label>
                  </div>
                    */}
                </div>

                <hr className="mt-4" />
                <div className="flex flex-row-reverse p-3">
                  <div className="flex-initial">
                    <button
                      type="button"
                      onClick={() => {
                        textareaContext.current.value = ''
                        textareaContext.current.focus()
                      }}
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M8 9h8v10H8z" opacity=".3" />
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
                      </svg>
                      <span className="pl-2 mx-1">Clear</span>
                    </button>
                  </div>
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </main>
      {fetcher.data ? (
        <DialogQR
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          QRiFrame={<iframe src={fetcher.data} className="w-[100%] h-[100%]" />}
        />
      ) : (
        <DialogQR
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          QRiFrame={<h3 className="text-red-600">No Content</h3>}
        />
      )}
      <Footer />
    </>
  )
}
