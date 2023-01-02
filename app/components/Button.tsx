import { Link } from '@remix-run/react'

const styles =
  'inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white hover:bg-blue-500 active:text-white/70 focus:outline-none focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500'

export function Button({ className, ...props }) {
  return <button className={styles} {...props} />
}

export function ButtonLink({ href, className, ...props }) {
  return <Link to={href} className={`${className} ${styles}`} {...props} />
}
