import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  ListItem,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";

const ResultsPage = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("There was an error fetching the search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="800px" mx="auto" mt="50px" px={4}>
      <Heading as="h1" size="lg" mb={5}>
        Results for "{query}"
      </Heading>

      {results.length ? (
        <List spacing={3}>
          {results.map((item, index) => (
            <ListItem
              key={index}
              border="1px"
              borderRadius="md"
              padding={3}
              boxShadow="sm"
            >
              {Object.entries(item).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </ListItem>
          ))}
        </List>
      ) : (
        <Text mt={4} color="gray.500">
          No results found for "{query}".
        </Text>
      )}
    </Box>
  );
};

export default ResultsPage;
