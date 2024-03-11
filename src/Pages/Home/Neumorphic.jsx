import { Button, useColorModeValue, useColorMode } from '@chakra-ui/react';
export function Neumorphic({ children, ...rest }){
    const { colorMode } = useColorMode();
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const boxShadowLight = '6px 6px 16px rgba(0, 0, 0, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.5)';
  const boxShadowDark = '6px 6px 16px rgba(0, 0, 0, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.1)';
  const boxShadow = colorMode === 'light' ? boxShadowLight : boxShadowDark;
    return (
        <Button
      rounded="full"
      px={6}
      bg={backgroundColor}
      minW="unset"
      color="gray.800"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'none' }}
      _active={{ transform: 'translateY(1px)', boxShadow: 'none' }}
      boxShadow={boxShadow}
      {...rest}
    >
      {children}
    </Button>
    )
}