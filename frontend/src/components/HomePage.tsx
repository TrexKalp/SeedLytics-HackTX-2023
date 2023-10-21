import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Heading,
  Center,
  Image,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import seedlytics from "../assets/seedlytics.png";
import TrendingStartups from "./TrendingStartups"; // Ensure the path is correct

const HomePage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?q=${query}`);
  };

  return (
    <Center h="100vh" w="100vw">
      <VStack spacing={6} w="500px">
        <Flex direction="column" align="center" justify="center" mb={2}>
          <Image src={seedlytics} alt="seedlytics logo" />
        </Flex>
        <InputGroup size="lg">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="filled"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleSearch}
              variant="solid"
            >
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Center>
  );
};

export default HomePage;
