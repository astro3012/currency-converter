import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

type ExchangeRatePropsType = {
  exchangeRate: number
  primaryCurrency: string
  secondaryCurrency: string
}

const ExchangeRate: React.FC<ExchangeRatePropsType> = (props) => {
  const { exchangeRate, primaryCurrency, secondaryCurrency } = props
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      bg='gray.800'
      gap='4'
      color='white'
      marginTop='16px'
      padding='16px'
      borderRadius='8px'
    >
      <Heading size='md'>Exchange Rate</Heading>
      <Heading size='2xl'>{exchangeRate}</Heading>
      <Heading size='lg'>
        {primaryCurrency} to {secondaryCurrency}
      </Heading>
    </Flex>
  )
}

export default ExchangeRate
