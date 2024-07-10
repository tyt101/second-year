export default function Layout({children, steam, ps5, inter}: any) {
  return <>
    <div>Parallel:{children}</div>
    <div>
      <h1>parallel</h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div >Steam:{steam}</div>
          <div>PS5:{ps5}</div>
          {inter}
      </div>
    </div>
  </>
}