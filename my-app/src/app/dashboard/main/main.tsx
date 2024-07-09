import { use } from "react";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    message: "Hello, About33333!",
  };
}

export default function Main() {
  const { message } = use(getData());
  return <>{ message }</>
}