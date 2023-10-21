import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
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

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // Typing the suggestions
  const navigate = useNavigate();

  const handleSearch = (): void => {
    navigate(`/results?q=${query}`);
  };

  const fetchSuggestions = (query: string): string[] => {
    const mockSuggestions = ["Airbnb", "Aggie", "Suggestion 3"];
    return mockSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      const newSuggestions = fetchSuggestions(newQuery);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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
            onKeyPress={handleKeyPress}
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
            spacing={2}
            p={2}
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
                  setQuery(suggestion); // <- This sets the search to the clicked suggestion
                  setSuggestions([]);
                  handleSearch();
                }}
                h="2rem"
                lineHeight="2rem"
                pl={2}
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
