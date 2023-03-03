import React from 'react';
import { useMemo, useState, } from 'react'
import {
    Flex,
    Box,
    Text,
    Input,
    Button
} from '@chakra-ui/react'
import {
    useContractWrite,
    usePrepareContractWrite,
    useContractRead,
    useAccount,
    Address
} from 'wagmi'
import STAKING_ABI from '../abi/IStakingModule.abi';
import formatToBaseUnit from '../utils/formatToBaseUnit';
import { getHexEllipsis } from '../utils/getEvmEllipsis';

// Default Address of the Staking Precompile Contract on Stargazer.
// More information here: TODO: Add link to docs
const STAKING_PRECOMPILE_ADDRESS = '0xd9A998CaC66092748FfEc7cFBD155Aae1737C2fF'

const Staking = () => {

    // State that holds the selected cosmos Hex Validator Address
    const [validator_address, setValidatorAddress] = useState<Address | undefined>(undefined)

    // State that holds the amount of tBera the connected account has delegated to the selected validator
    const [delegated_amount, setDelegatedAmount] = useState<string | undefined>(undefined)

    // State that tracks values of the input field
    const [input_amount, setInputAmount] = useState<string>('')

    // Returns the address of the connected wallet.
    const { address } = useAccount()

    // Query the Staking Precompile for the active validators, returns an array of addresses.
    const { data: rawValidators } = useContractRead({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'getActiveValidators',
    })

    // UseMemo will trigger this function when the value of rawValidators changes. It will set the state variable
    // validator_address to the first raw validator address in the array. This is a lazy way to "select" a validator.
    useMemo(() => {
        if (rawValidators) {
            const validator: Address = ((rawValidators as any)[0] as Address)
            setValidatorAddress(validator)
        }
    }, [rawValidators])

    // Query the Staking Precompile for the amount of tBera delegated to the selected validator from the 
    // connected wallet address. Returns a string or undefined.
    const { data: rawDelegation } = useContractRead({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'getDelegation(address,address)',
        args: [address, validator_address],
    })

    // UseMemo will trigger this function when the value of rawDelegation changes. It will set the state variable
    // delegated_amount to the amount of tBera delegated to the selected validator.
    useMemo(() => {
        if (rawDelegation) {
            const parsedDelegation = formatToBaseUnit(rawDelegation as string, 18).toString()
            setDelegatedAmount(parsedDelegation)
        }
    }, [rawDelegation])

    const { config } = usePrepareContractWrite({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'delegate(address,uint256)',
        args: [validator_address as Address, formatToBaseUnit(input_amount, 18)],
    })

    const { write } = useContractWrite({
        ...config,
        onError(error) {
            console.log('Error', error)
        },
    })

    return (
        <Box
            mt={4}
            borderRadius={'12px'}
            padding={4}
            backgroundColor={'#ffff'}
            color={'#000000'}>
            <Flex justifyContent={'space-between'}>
                <Text>Validator Address:</Text>
                <Text>{validator_address ? getHexEllipsis(validator_address) : ''}</Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
                <Text>Delegated Amount: </Text>
                <Text>{delegated_amount ? delegated_amount : '0'} tBera</Text>
            </Flex>
            <Flex mt={4}>
                <Input
                    focusBorderColor='#1da1f1'
                    variant='filled'
                    placeholder='Enter Amount'
                    value={input_amount}
                    onChange={(e: any) => { setInputAmount(e.target.value) }} />
                <Button colorScheme={'twitter'} marginLeft={4} onClick={write}>Delegate</Button>
            </Flex>
        </Box>
    )
}
export default Staking
