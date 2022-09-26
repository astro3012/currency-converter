import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Center, Flex, Heading, Link, Spinner, Text } from '@chakra-ui/react'

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    axios
      .get('https://crypto-backend0.herokuapp.com/news')
      .then((response) => {
        console.log(response.data)
        setArticles(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const firstSevenArticles = articles?.slice(0, 7)

  return (
    <Center padding='16px' borderRadius='8px' backgroundColor='purple.100' width='100%'>
      <Flex alignItems='center' gap='16'>
        <Heading size='2xl'>News Feed</Heading>
        <Flex direction='column' alignItems='flex-start' gap='2'>
          {articles ? (
            firstSevenArticles?.map((article, _index) => {
              return (
                <Box key={_index}>
                  <Link href={article.url} target='_blank' rel='noopener noreferrer'>
                    <Text>{article.title}</Text>
                  </Link>
                </Box>
              )
            })
          ) : (
            <Spinner size='xl' />
          )}
        </Flex>
      </Flex>
    </Center>
  )
}

export default NewsFeed
