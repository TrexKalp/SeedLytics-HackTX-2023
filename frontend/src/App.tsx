import { useState } from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Center,
  Heading,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("There was an error fetching the search results:", error);
    }
  };

  return (
    <Center h="100vh" w="100vw">
      <Box w="500px">
        <Heading mb={4}>SeedLytics</Heading>
        <InputGroup size="lg">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box mt={4}>
          <ul>
            {results.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Box>
      </Box>
    </Center>
  );
}

export default App;
