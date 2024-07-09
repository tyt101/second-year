'use client'

import { redirect } from 'next/navigation'
import { use } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    message: "Hello, About33333!",
  };
}

export default function Page() {
  const { message } = use(getData());
  return <>
    <h1>{ message }</h1>
    <h1 onClick={() => {redirect('/dashboard/main')}}>跳转至Main：</h1>
  </>;
}
