import React, { useEffect, useState } from "react";
import CustomCard from "components/card/Card.tsx"; // Import CustomCard component
import proposalsData from "utils/data/proposals.json"; // replace with actual path
import { Box, Button } from "@chakra-ui/react"; // Import Box from Chakra UI

const ProposalDetails = ({ id }) => {
  const [proposal, setProposal] = useState(null);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id); // Parse the id as an integer
      const foundProposal = proposalsData.find((p) => p.id === parsedId);
      setProposal(foundProposal);
    }
  }, [id]);

  const fetchApiData = async () => {
    const response = await fetch("http://localhost:8000/evaluate-feedback", {
      method: "POST",
    });
    const data = await response.json();
    setApiData(data);
  };

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <CustomCard
      position="relative" // Set position absolute on child
      // top="100px" // Adjust this value as needed
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="50%" // Adjust height accordingly
      width="80%"
      mt="100"
      mx="auto"
    >
      {" "}
      {/* Set position relative on parent */}
      <Box>
        <h1>{proposal.title}</h1>
        {/* Add more details about the proposal here */}
        <Button onClick={fetchApiData}>Fetch API Data</Button>
        {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}
      </Box>
    </CustomCard>
  );
};

export default ProposalDetails;
