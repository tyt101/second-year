export default function Intercept({ params }: any) {
  return <div>拦截路由Intercept这是被拦截的地方：
    <h1>==={params.id}===</h1>
     </div>
}