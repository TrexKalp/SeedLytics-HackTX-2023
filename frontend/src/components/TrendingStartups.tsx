import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";

type Startup = {
  name: string;
  description: string;
  imageUrl: string;
};

const TrendingStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/trending")
      .then((response) => response.json())
      .then((data) => setStartups(data))
      .catch((error) =>
        console.error("Error fetching trending startups:", error)
      );
  }, []);

  return (
    <VStack spacing={5} align="start">
      <Heading size="md">Trending Startups</Heading>
      {startups.map((startup) => (
        <Box
          key={startup.name}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Image src={startup.imageUrl} alt={startup.name} boxSize="100px" />
          <Heading size="sm">{startup.name}</Heading>
          <Text>{startup.description}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default TrendingStartups;
