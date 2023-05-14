import {
  Box,
  SimpleGrid,
  Stack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminLayout from "layouts/admin";
import UserProfileCard from "components/card/UserProfileCard";
import RecentProposals from "views/admin/profile/components/RecentProposals";
import Avatar1 from "img/avatars/avatar1.png";
import Card from "components/card/Card";
import contributorData from "utils/data/contributor1.json";
import RadarChart from "components/charts/RadarChart";
import DoughnutChart from "components/charts/DoughnutChart";
import ProposalCard from "components/card/ProposalCard";
import HoverCard from "components/card/HoverCard";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import ProfileImage from "/public/img/layout/Ellipse 97.svg";

import QRCode from "qrcode.react"; // Import QRCode from qrcode.react

export default function profileOverview() {
  const { skills, values, qualityScore, relevancyScore } = contributorData;

  const [qrData, setQrData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchQrCode = async () => {
    const response = await fetch(
      `http://10.32.16.207:8000/qr-code?id=39b1eb56-f1f6-11ed-9db4-0242ac1b0006&schema=KYCAgeCredential`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setQrData(data);
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} w="100%">
        <UserProfileCard
          avatar={ProfileImage}
          name="Lyons800"
          discord={true}
          github={false}
          twitter={true}
          xp={1200}
          size="lg"
          variant="filled"
        />
        <HStack spacing={10} mt={5} align="start">
          <Card backgroundColor="#25242F">
            <Stack spacing={10}>
              {/* Three Cards above the Doughnut Charts */}
              <HStack spacing={10}>
                <Card backgroundColor="#4B4066">{/* Card content */}</Card>
                <Card backgroundColor="#92C092">{/* Card content */}</Card>
                <Card backgroundColor="#28375F">{/* Card content */}</Card>
              </HStack>

              {/* Doughnut Charts */}
              <HStack spacing={10}>
                <Card backgroundColor="#252B3B">
                  <Tooltip
                    label="This is a score that measures the users quality of contributions to proposals"
                    fontSize="md"
                  >
                    <InfoOutlineIcon />
                  </Tooltip>
                  <DoughnutChart
                    score={qualityScore}
                    backgroundColor="#383645"
                    foregroundColor="#A0A4F5"
                  />
                  <Button fontSize="small" onClick={fetchQrCode}>
                    {" "}
                    Create PolygonID Credential{" "}
                  </Button>
                </Card>

                <Card backgroundColor="#252B3B">
                  <Tooltip
                    label="This is a score that measures the users relevancy of contributions to proposals"
                    fontSize="md"
                  >
                    <InfoOutlineIcon />
                  </Tooltip>
                  <DoughnutChart
                    score={relevancyScore}
                    backgroundColor="#383645"
                    foregroundColor="#5056D2"
                    zIndex="999"
                  />
                  <Button fontSize="small" onClick={fetchQrCode}>
                    {" "}
                    Create PolygonID Credential{" "}
                  </Button>
                </Card>

                {/* <HoverCard qualityScore={75} onButtonClick={handleButtonClick} /> */}
              </HStack>

              {/* Radar Chart */}
              <Card backgroundColor="#252B3B">
                <Tooltip
                  label="This is a radar chart that showcases a DAO contributors top skills"
                  fontSize="md"
                >
                  <InfoOutlineIcon />
                </Tooltip>
                <RadarChart
                  skills={skills}
                  contributor={values}
                  backgroundColor="#383645"
                  foregroundColor="#FFFFFF"
                />
              </Card>
            </Stack>
          </Card>
          <Card backgroundColor="#25242F">
            <RecentProposals username={"Lyons"} />
          </Card>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your PolygonID Credential</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {qrData && <QRCode value={JSON.stringify(qrData)} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminLayout>
  );
}
