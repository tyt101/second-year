
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    message: "Hello, Dashboard22222!",
  };
}

export default function DashboardPage() {
  const { message } = getData();
  const router = useRouter()
  const pathname = usePathname()

  return <>
  <h1>{message}</h1>
  <Link href="/dashboard/about">Link跳转至about:</Link>
  <h2 onClick={() => {router.push('/dashboard/about', { scroll: false })}}>h2跳转至about:</h2>
  <h3>pathname: { pathname }</h3>
  </>;
}
