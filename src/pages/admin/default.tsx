import { Box, Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import Card from 'components/card/Card'
import CustomCard from 'components/card/Card'
import ActiveGovernanceChart from 'components/charts/ActiveGovernanceChart'
import AdminLayout from 'layouts/admin'
import ApecoinLogo from 'public/img/layout/Apecoin-logo.png'
import ChartCard from 'components/charts/ActiveGovernanceChart'
import ApeCoinLogo from '/public/img/layout/ApeCoin_Wordmark_Light_SVG.svg'
import Image from 'next/image'

export default function UserReports() {

    // Chakra Color Mode
    const brandColor = useColorModeValue('brand.500', 'white')
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

    return (
        <AdminLayout>
            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                {/* Banner */}
                <Box w="full" h="100px" bg={brandColor}>
                    <Flex align="center" justify="center" h="100%" pl="00%">
                        <Image src={ApeCoinLogo} alt="Logo" boxSize="50px" />
                        <Text fontSize="xl" fontWeight="bold" color={boxBg}> </Text>
                    </Flex>
                </Box>
                <>
                    {/* Grid */}
                    <SimpleGrid columns={1} gap='20px' mb='20px' marginTop='40px'>

                        <Card backgroundColor='#25242F'>
                            Top Domain: Social DAO
                        </Card>
                        <CustomCard backgroundColor='#25242F'>
                            Active Governance Discussion
                            <ChartCard />

                        </CustomCard>
                        <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap='20px'>
                            <CustomCard backgroundColor='#25242F'>Governance Participation</CustomCard>
                            <CustomCard backgroundColor='#25242F'>Trending Topics</CustomCard>
                            <CustomCard backgroundColor='#25242F'>Top Participants</CustomCard>
                        </SimpleGrid>

                        <CustomCard>Your Content</CustomCard>
                    </SimpleGrid>
                </>
            </Box>
        </AdminLayout>
    )
}
