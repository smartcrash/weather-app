import { FontAwesome } from '@expo/vector-icons'
import { Box, Center, Heading, HStack, Icon, NativeBaseProvider, Text, VStack } from 'native-base'

const API_KEY = '934ed876a8de43bf010a96d95a05b30c'
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`

export default function App() {
  const details = [
    {
      key: 'Wind',
      value: '12 km/h',
      icon: '💨',
    },
    {
      key: 'Humidity',
      value: '63%',
      icon: '💧',
    },
    {
      key: 'Feels like',
      value: '28°',
      icon: '🌡️',
    },
  ]

  return (
    <NativeBaseProvider>
      <VStack
        safeArea
        height={'full'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingX={9}
        paddingTop={6}
        paddingBottom={6}
      >
        <HStack
          space={1}
          alignItems={'center'}
          flexShrink={0}
          borderWidth={1}
          borderRadius={'full'}
          paddingX={4}
          paddingY={0.5}
        >
          <Icon as={FontAwesome} name={'map-marker'} color={'black'} size={'sm'} />
          <Text fontSize={'lg'}>Valencia</Text>
        </HStack>

        <Box flexGrow={1}>
          <Center marginY={'auto'}>
            <Text fontSize={'180px'}>⛅</Text>
            <HStack>
              <Heading fontWeight={'extrabold'} fontSize={'9xl'}>
                30
              </Heading>
              <Text fontSize={'6xl'} marginTop={2} color={'gray.300'}>
                °
              </Text>
            </HStack>
            <Text fontSize={'3xl'} fontWeight={'bold'}>
              Sunny
            </Text>
            <Text marginTop={2} fontSize={'sm'} color={'gray.400'}>
              Monday, 17 May
            </Text>
          </Center>
        </Box>

        <HStack justifyContent={'space-between'} flexShrink={0} width={'full'}>
          {details.map(({ key, value, icon }, index) => (
            <VStack space={0.5} justifyContent={'center'} alignItems={'center'} key={index}>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                {value}
              </Text>
              <Text color={'gray.400'} fontSize={'sm'}>
                {key}
              </Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </NativeBaseProvider>
  )
}
