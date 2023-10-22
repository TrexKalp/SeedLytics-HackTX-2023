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
    const mockSuggestions = [
      "Ondine Biomedical Inc.",
      "One Inc.",
      "One Block Off the Grid (1BOG)",
      "offerdunia.in",
      "H2O.ai",
      "Hello Alfred",
      "Hornetsecurity",
      "Happy Retailer",
      "Beijing 1000CHI Software Technology",
      "Beans Around",
      "Babyscripts",
      "Basecamp",
      "ZenChef",
      "Zentri",
      "Zibby",
      "ZABC",
      "Redox",
      "ResponseTap",
      "Robinhood",
      "Rewalk Robotics",
      "Cliptone",
      "CAD CAD Design Services",
      "ChartRequest",
      "CtrlShift",
      "yelster digital gmbh (former 123people)",
      "Yago",
      "Youxigu",
      "YuanV",
      "XDN/3Crowd Technologies",
      "Xplornet",
      "Xuehuile",
      "Xunda Pharmaceutical",
      "Nimble VR",
      "NewHound",
      "Nano Think",
      "NetPosa Technologies",
      "Loctronix",
      "Lynq",
      "Leroy Brothers",
      "Longxun Changtian Technology",
      "Shoppable",
      "Sportskeeda",
      "Snapask",
      "Sentrant Security",
      "Applauze",
      "A Plus",
      "A-76 Technologies",
      "A & A Custom Cornhole",
      "Tunepresto",
      "The Activity Exchange (AchieveMint)",
      "The Allstate Corporation",
      "Targazyme",
      "Web Reservations International",
      "WorkBright",
      "Workspace",
      "Wallis & Holdings",
      "FashionAde.com (Abundant Closet)",
      "FOOTBEAT & AVEX Health",
      "Finxera",
      "Fengxiafei",
      "Inherited Health",
      "InboxQ",
      "iTechshark",
      "Inforgence Inc.",
      "Pegasus Imaging Corporation",
      "Pom",
      "PrivacyCheq / AgeCheq",
      "PostRank",
      "Global Ad Source",
      "Gift Connect",
      "GridEdge Networks",
      "Gateway Media",
      "MaestroIQ",
      "Motiva",
      "MustSee guides",
      "Movvo, S.A.",
      "Dokkankom",
      "Driversiti",
      "Desk",
      "DApps Fund",
      "EMBI",
      "Eargo",
      "EVERYWARE",
      "Easpring Material Technology",
      "QDEGA Loyalty Solutions GmbH",
      "QuasarDB",
      "Quire",
      "Quotient Technology",
      "USTC iFLYTEK Science and Technology",
      "Union Cast Network Technology",
      "Uphold",
      "UNIFi Software",
      "Just Sing It",
      "JOYsee Interaction Science and Technology",
      "Jobstore.com",
      "just.me 2014 Inc",
      "Kingtop",
      "Kylin Network",
      "KakaMobi",
      "kalidea",
    ];

    const filteredSuggestions = mockSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    return filteredSuggestions.slice(0, 8);
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
          <Text fontFamily={"sans-serif"}>
            Sowing Insights, Harvesting Success: The Startup Data Destination.
          </Text>
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
                _hover={{ fontWeight: "bold", bg: "gray.700" }}
                onClick={() => {
                  setQuery(suggestion); // <- This sets the search to the clicked suggestion
                  setSuggestions([]);
                  // handleSearch();
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
