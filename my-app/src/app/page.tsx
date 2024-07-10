import Link from 'next/link'
export default function Home() {
  return (
    <>home~
    <div>
      <Link href='/intercept/1'>跳转拦截路由Link</Link>
    </div>
    </>
  );
}
