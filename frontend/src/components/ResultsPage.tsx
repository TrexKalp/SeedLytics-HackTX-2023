import { useState, useEffect, useContext, createContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  Stack,
  StackDivider,
  useColorModeValue,
  Image,
  Text,
  Flex,
  Tooltip,
  chakra,
  Center,
  Spinner,
  Tag,
  Button,
} from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

const FilterContext = createContext(null);

const ResultsPage = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [categoryFilter, setCategoryFilter] = useState("all");

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Funding",
        data: [12, 19, 3, 5, 2, 3],
        fill: false, // for Line chart
        backgroundColor: "#FB8833",
        borderColor: "#FB8833", // for Line chart
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Adjust this to your search route path
  };

  const DEFAULT_IMAGE_URL =
    "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces";

  const DEFAULT_IMAGES = [
    "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sb3IlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb3IlMjBncmFkaWVudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://media.istockphoto.com/id/1395723007/vector/pink-orange-yellow-and-red-color-gradient-summer-defocused-blurred-motion-abstract.jpg?s=612x612&w=0&k=20&c=qf1HnidyUgJiMLa4bHHomssiu7jdNEL7j-ezmiFrGb8=",
    "https://e0.pxfuel.com/wallpapers/416/530/desktop-wallpaper-gradient-pastel-gradient-gradient-background-and-cyan-gradient-navy-gradient.jpg",
  ];

  const filteredResults = results.filter((item) => {
    if (categoryFilter === "all") return true;
    return item.category_list?.includes(categoryFilter);
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();
        setResults(data);
        setSortOrder(order);
      } catch (error) {
        console.error("There was an error fetching the search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, sortOrder]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();

        // Fetch an image for each company from the Unsplash API
        const resultsWithImages = await Promise.all(
          data.map(async (item: { name: any }) => {
            const imageResponse = await fetch(
              `https://api.unsplash.com/search/photos?query=${item.category_list}&client_id=iilr9Q-hBGCeFriyE_Fhqq-ssFJ8ORAWUh6rVQY7JVU`
            );
            const imageData = await imageResponse.json();

            // Use the default image if no image is returned from Unsplash
            const imageUrl =
              imageData.results[0]?.urls.small || DEFAULT_IMAGE_URL;

            return { ...item, image: imageUrl };
          })
        );

        // Sort the results based on the sortOrder state
        const sortedResults = resultsWithImages.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });

        setResults(sortedResults);
      } catch (error) {
        console.error("There was an error fetching the search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, sortOrder]);

  const formatKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center py={12} mt={5}>
      <Box
        maxW="1000px"
        w="full"
        mx="auto"
        px={4}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.800", "white")}
      >
        <Button colorScheme="teal" onClick={handleGoBack} mb={4}>
          Go Back to Search
        </Button>
        <Heading as="h1" size="lg" mb={3}>
          Results for "{query}"
        </Heading>
        <Text fontFamily={"sans-serif"}>Interactive StreamLit Grapher</Text>
        <iframe
          src="http://localhost:8501" // URL to your Streamlit app
          width="100%"
          height="600px" // Adjust height as needed
          frameBorder="0"
        />

        <List spacing={10} mt={12}>
          {results.slice(0, 50).map((item, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              boxShadow="2xl"
              w="full"
              bg={useColorModeValue("white", "gray.900")}
              pos={"relative"}
              zIndex={1}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"230px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${
                    item.image || DEFAULT_IMAGES[index % 5]
                  })`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={item.image || DEFAULT_IMAGES[index % 5]}
                  alt={`${item.name || "Company"} logo`}
                />
                <VStack position="absolute" top={5} right={5} spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="teal"
                    as="a"
                    href={item.homepage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Website
                  </Button>

                  {item.permalink && (
                    <Button
                      size="lg"
                      colorScheme="teal"
                      as="a"
                      href={`https://www.crunchbase.com/${item.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      ml={12}
                    >
                      View on Crunchbase
                    </Button>
                  )}
                </VStack>
              </Box>

              <Stack pt={10} align={"center"}>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {item.name}
                </Heading>
                <Accordion w="100%" defaultIndex={[]} allowToggle mt={4}>
                  <AccordionItem border="none">
                    <h2>
                      <AccordionButton
                        _expanded={{
                          bg: useColorModeValue("gray.200", "cyan.600"),
                          color: useColorModeValue("gray.800", "gray.900"),
                        }}
                        _hover={{
                          bg: useColorModeValue("gray.100", "cyan.500"),
                        }}
                      >
                        <Box flex="1" textAlign="left">
                          Details
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Stack
                        spacing={2}
                        divider={<StackDivider borderColor="gray.300" />}
                      >
                        {Object.entries(item).map(([key, value]) => {
                          if (
                            key !== "image" &&
                            key !== "name" &&
                            key !== "permalink" &&
                            key !== "state_code" &&
                            value
                          ) {
                            let formattedValue = value;

                            if (
                              key === "first_funding_at" ||
                              key === "last_funding_at" ||
                              key === "founded_at"
                            ) {
                              formattedValue = formatDate(value);
                            }

                            return (
                              <Box key={key} d="flex" alignItems="center">
                                <Heading
                                  size="xs"
                                  textTransform="uppercase"
                                  color={useColorModeValue(
                                    "gray.600",
                                    "cyan.300"
                                  )}
                                  mr={2}
                                >
                                  {formatKey(key)}
                                </Heading>

                                <Tag
                                  size="sm"
                                  borderRadius="full"
                                  variant="solid"
                                  colorScheme="teal"
                                >
                                  {formattedValue as String}
                                </Tag>
                              </Box>
                            );
                          }
                          return null;
                        })}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
            </Box>
          ))}
        </List>
      </Box>
    </Center>
  );
};

export default ResultsPage;
