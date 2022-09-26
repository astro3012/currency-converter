import React from 'react'
import CurrencyConverter from './components/CurrencyConverter'
import NewsFeed from './components/NewsFeed'
import { Box, Flex } from '@chakra-ui/react'

const App = () => {
  return (
    <Box marginInline='20%' marginTop='5%'>
      <Flex gap='2' direction='column'>
        <CurrencyConverter />
        <NewsFeed />
      </Flex>
    </Box>
  )
}

export default App
