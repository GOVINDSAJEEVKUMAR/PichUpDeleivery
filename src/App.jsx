import React, { useRef, useState } from 'react'
import ProgressBar from './pages/progressbar'
import Service from './pages/service'
import { Box, Divider } from '@mui/material'
import Book from './pages/booking'
import Footer from './pages/footer'

const App = () => {
  const bookRef = useRef();
  const [selected, setSelected] = useState('regular');

  const handleScroll = () => {
    if (bookRef.current) {
      bookRef.current.scrollIntoView({ behavior: 'smooth', block: "start" });
    }
  }
  return (
    <>
      <ProgressBar />
      <Service scroll={handleScroll} selected={selected} setSelected={setSelected} />
      <Divider color="#fff" />
      <Box ref={bookRef} >
        <Book />
      </Box>
      <Footer selected={selected} />

    </>
  )
}

export default App
