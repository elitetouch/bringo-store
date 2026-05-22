import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
const Page = () => {
  const phoneNumber = '+256701463904'; // Nigeria number (e.g., +2348012345678)
  const message = encodeURIComponent('Hello! I’d like to chat with you via WhatsApp.');

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Box className=' w-11/12 m-auto min-h-[90vh]'>
        <Box className=' pt-[30px]'>
    <Button
      colorScheme="green"
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Chat on WhatsApp
    </Button>

        </Box>
    </Box>
  );
};

export default Page;
