import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'
import useFetch from './hooks/useFetch'
function App() {
  const [count, setCount] = useState(0)
  let {loading, data, error,} =useFetch('http://localhost:1337/api/blogs?populate=*')
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!</p>
  console.log(data)
  
  return (
    <>
    
       {/* Hero  */}
       <Hero/>
    </>
  )
}

export default App
