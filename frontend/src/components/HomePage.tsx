import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Heading,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?q=${query}`);
  };

  return (
    <Center h="100vh" w="100vw">
      <Box w="500px">
        <Heading mb={4}>Search Engine</Heading>
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
      </Box>
    </Center>
  );
};

export default HomePage;
