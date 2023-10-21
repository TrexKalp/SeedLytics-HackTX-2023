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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
            onKeyPress={handleKeyPress} // Add this line to listen for Enter key press
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
          <VStack
            mt={2}
            spacing={2} // Add spacing between suggestions
            p={2} // Add padding for suggestion box
            border="1px"
            borderColor="gray.300"
            rounded="md"
            width="100%"
            boxShadow="md"
          >
            {suggestions.map((suggestion, index) => (
              <Text
                key={index}
                cursor="pointer"
                _hover={{ fontWeight: "bold", bg: "gray.100" }}
                onClick={() => {
                  setQuery(suggestion);
                  setSuggestions([]);
                  handleSearch(); // Trigger search when a suggestion is clicked
                }}
                h="2rem" // Set a fixed height for each suggestion
                lineHeight="2rem" // Center the text vertically within the suggestion box
                pl={2} // Add left padding for better alignment
              >
                {suggestion}
              </Text>
            ))}
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default HomePage;
