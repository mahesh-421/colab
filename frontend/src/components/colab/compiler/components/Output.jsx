import { Box, Text } from '@chakra-ui/react';

const Output = ({ isError, output }) => {
  return (
    <Box
      p={2}
      bg="#1E1E1E"
      color="white"
      border="1px solid"
      borderRadius={4}
      borderColor={isError ? 'red.500' : '#333'}
      overflow="scroll"
      height="100%"
      rounded="lg"
    >
      {output ? (
        output.map((line, i) => (
          <Text
            key={i}
            color={isError ? 'red.400' : 'white'}
            fontSize="xl"
            p={2}
          >
            {isError}
            {line}
          </Text>
        ))
      ) : (
        <Text color="gray.400" fontSize="xl" p={2}>
          Output
        </Text>
      )}
    </Box>
  );
};
export default Output;
