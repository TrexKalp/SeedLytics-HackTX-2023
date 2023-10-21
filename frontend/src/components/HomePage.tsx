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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import seedlytics from "../assets/seedlytics.png";
import TrendingStartups from "./TrendingStartups"; // Ensure the path is correct

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Store suggestions
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?q=${query}`);
  };

  const fetchSuggestions = (query) => {
    // Simulate fetching suggestions (you'd replace this with actual API calls)
    const mockSuggestions = ["Airbnb", "Aggie", "Suggestion 3"];
    return mockSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      const newSuggestions = fetchSuggestions(newQuery);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions when query is empty
    }
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
            onChange={handleInputChange}
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
        {suggestions.length > 0 && (
          <Box
            mt={2}
            border="1px"
            borderColor="gray.300"
            rounded="md"
            position="absolute"
            zIndex="1"
            width="100%"
          >
            <VStack align="start" p={2}>
              {suggestions.map((suggestion, index) => (
                <Text
                  key={index}
                  cursor="pointer"
                  _hover={{ fontWeight: "bold" }}
                  onClick={() => {
                    setQuery(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Center>
  );
};

export default HomePage;
