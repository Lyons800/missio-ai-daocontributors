import React, { useEffect, useState } from "react";
import CustomCard from "components/card/Card.tsx"; // Import CustomCard component
import proposalsData from "utils/data/proposals.json"; // replace with actual path
import { Box, Button } from "@chakra-ui/react"; // Import Box from Chakra UI

const ProposalDetails = ({ id }) => {
  const [proposal, setProposal] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [vcData, setVcData] = useState(null);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id); // Parse the id as an integer
      const foundProposal = proposalsData.find((p) => p.id === parsedId);
      setProposal(foundProposal);
    }
  }, [id]);

  const fetchApiData = async () => {
    const response = await fetch("http://10.32.16.207:8000/evaluate-feedback", {
      method: "POST",
    });
    const data = await response.json();
    setApiData(data);
  };

  const mintVerifiableCredential = async () => {
    const response = await fetch(
      "http://localhost:8000/createClaim?score=100",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    setVcData(data);
  };

  const fetchQrCode = async () => {
    if (vcData && vcData.id) {
      const response = await fetch(
        `http://localhost:8000/qr-code?id=${vcData.id}&schema=KYCAgeCredential`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setQrData(data);
    }
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
      // backgroundColor="#25242F"
    >
      {" "}
      {/* Set position relative on parent */}
      <Box>
        <h1>{proposal.title}</h1>
        {/* Add more details about the proposal here */}
        <Button onClick={fetchApiData}>Fetch API Data</Button>
        {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}
        {apiData && (
          <Button onClick={mintVerifiableCredential}>
            Mint Verifiable Credential
          </Button>
        )}
        {vcData && <pre>{JSON.stringify(vcData, null, 2)}</pre>}
        {vcData && <Button onClick={fetchQrCode}>Revieal QR Code</Button>}
        {qrData && <pre>{JSON.stringify(qrData, null, 2)}</pre>}
      </Box>
    </CustomCard>
  );
};

export default ProposalDetails;
