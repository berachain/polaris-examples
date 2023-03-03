import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Flex, Box, Text, Link } from '@chakra-ui/react'
import React from 'react'
import Staking from '../components/Staking'

function Page() {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'100vh'} direction={'column'}>
      <Box
        position={'absolute'}
        top={'0'}
        right={'0'}
        marginTop={'16px'}
        marginRight={'16px'}>
        {/* Rainbow Kit Connect Button floating top right of the screen */}
        <ConnectButton />
      </Box>
      <Text fontSize={'4xl'}>Stargazer Staking Precompile Example</Text>
      <Text fontSize={'xl'}>Ensure you have a Local <Link color={'#1da1f1'} href='https://github.com/berachain/stargazer-examples'>Stargazer Node running.</Link></Text>
      <Staking />
      <Text fontSize={'xs'}>To learn more about Stargazer please reference our <Link color={'#1da1f1'} href='https://github.com/berachain/stargazer-examples'>docs</Link></Text>
    </Flex>
  )
}

export default Page
