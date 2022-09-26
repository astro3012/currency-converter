import React, { useState } from 'react'
import axios from 'axios'
import ExchangeRate from './ExchangeRate'
import { Box, Button, Center, Flex, Heading, Input, Select, Text } from '@chakra-ui/react'

const CurrencyConverter: React.FC = () => {
  const currencies = ['BTC', 'ETH', 'USD', 'EUR', 'INR', 'XRP', 'LTC', 'ADA']

  const [primaryCurrency, setprimaryCurrency] = useState('BTC')
  const [secondaryCurrency, setsecondaryCurrency] = useState('INR')
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setexchangeRate] = useState(0)
  const [primaryCurrencyExchanged, setprimaryCurrencyExchanged] = useState('BTC')
  const [secondaryCurrencyExchanged, setsecondaryCurrencyExchanged] = useState('INR')
  const [result, setResult] = useState(0)

  const convert = () => {
    axios
      .get('https://crypto-backend0.herokuapp.com/convert', {
        params: {
          from_currency: primaryCurrency,
          function: 'CURRENCY_EXCHANGE_RATE',
          to_currency: secondaryCurrency,
        },
      })
      .then((response) => {
        setexchangeRate(response.data.exchange_rate)
        setResult(response.data.exchange_rate * amount)
        setprimaryCurrencyExchanged(primaryCurrency)
        setsecondaryCurrencyExchanged(secondaryCurrency)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Box padding='16px' borderRadius='8px' backgroundColor='cyan.100' width='100%'>
      <Heading>Currency converter</Heading>

      <Flex gap='4' justifyContent='space-between' alignItems='center' marginY='8px'>
        <Box>
          <Text>Enter amount:</Text>
        </Box>
        <Box flexGrow='2'>
          <Input
            defaultValue={amount}
            variant='filled'
            placeholder='Primary'
            onChange={(e) => {
              setAmount(parseInt(e.target.value, 10))
            }}
          />
        </Box>
      </Flex>

      <Box>
        <Flex gap='4' justifyContent='space-between' alignItems='center' marginY='16px'>
          <Box flex='2'>
            <Select
              variant='filled'
              value={primaryCurrency}
              onChange={(e) => {
                setprimaryCurrency(e.target.value)
                setResult(0)
              }}
            >
              {currencies.map((currency) => {
                return <option key={currency}>{currency}</option>
              })}
            </Select>
          </Box>
          <Center flex='1'>
            <Heading size='sm'>to</Heading>
          </Center>
          <Box flex='2'>
            <Select
              variant='filled'
              value={secondaryCurrency}
              onChange={(e) => {
                setsecondaryCurrency(e.target.value)
                setResult(0)
              }}
            >
              {currencies.map((currency) => {
                return <option key={currency}>{currency}</option>
              })}
            </Select>
          </Box>
        </Flex>

        <Flex gap='4' justifyContent='space-between' alignItems='center' marginY='16px'>
          <Flex flex='2' flexDirection='row' gap='4'>
            <Heading size='2'>{primaryCurrency}</Heading>
            <Heading>{amount || 0}</Heading>
          </Flex>
          <Center flex='1'>
            <Heading>=</Heading>
          </Center>
          <Flex flex='2' flexDirection='row' gap='4' justifyContent='flex-end'>
            <Heading>{result || 0}</Heading>
            <Heading size='2'>{secondaryCurrency}</Heading>
          </Flex>
        </Flex>
        <Button size='lg' w='100%' onClick={convert} colorScheme='gray'>
          Convert
        </Button>
      </Box>

      <ExchangeRate
        exchangeRate={exchangeRate}
        primaryCurrency={primaryCurrencyExchanged}
        secondaryCurrency={secondaryCurrencyExchanged}
      />
    </Box>
  )
}

export default CurrencyConverter
