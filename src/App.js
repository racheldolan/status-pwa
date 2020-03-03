import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Divider,
  Menu,
  Segment,
  Loader,
  Card,
  Header
} from "semantic-ui-react";
import logo from "./images/logo.png";
import nationalRailLogo from "./images/national-rail-logo.png";
import Status from "./Status";

const App = () => {
  const [tubeStatusArray, setTubeStatusArray] = useState([]);
  const [nationalRailStatus, setNationalRailStatus] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("tube");
  const [
    isLoadingNationalRailStatuses,
    setIsLoadingNationalRailStatuses
  ] = useState(false);
  const [isLoadingTubeStatuses, setIsLoadingTubeStatuses] = useState(false);

  const fetchDataAndSortLinesByStatus = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.reduce(
        (acc, currStatus) =>
          !currStatus.lineStatuses.every(
            status => status.statusSeverityDescription === "Good Service"
          )
            ? [currStatus, ...acc]
            : [...acc, currStatus],
        []
      );
    } catch (error) {
      console.log(`Error fetching latest statuses`);
      return null;
    }
  };

  useEffect(() => {
    const fetchNationalRailStatuses = async () => {
      setIsLoadingNationalRailStatuses(true);
      const orderedStatusArray = await fetchDataAndSortLinesByStatus(
        "https://api.tfl.gov.uk/line/mode/national-rail/status"
      );
      setIsLoadingNationalRailStatuses(false);
      setNationalRailStatus(orderedStatusArray);
    };
    const fetchTubeStatuses = async () => {
      setIsLoadingTubeStatuses(true);
      const orderedStatusArray = await fetchDataAndSortLinesByStatus(
        "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"
      );
      setIsLoadingTubeStatuses(false);
      setTubeStatusArray(orderedStatusArray);
    };
    fetchTubeStatuses();
    fetchNationalRailStatuses();
  }, []);

  return (
    <Container padded="very">
      <Segment basic>
        <Image
          centered
          src={activeMenuItem === "tube" ? logo : nationalRailLogo}
          size="small"
        />
      </Segment>
      <Menu tabular>
        <Menu.Item
          name="Tube"
          active={activeMenuItem === "tube"}
          onClick={() => setActiveMenuItem("tube")}
        />
        <Menu.Item
          name="Rail"
          active={activeMenuItem === "rail"}
          onClick={() => setActiveMenuItem("rail")}
        />
      </Menu>
      <Divider hidden />
      <Loader
        content="Loading..."
        active={
          (isLoadingNationalRailStatuses && activeMenuItem === "rail") ||
          (isLoadingTubeStatuses && activeMenuItem === "tube")
        }
      />

      <Card.Group itemsPerRow={3} stackable>
        {activeMenuItem === "tube" && tubeStatusArray ? (
          tubeStatusArray.map(status => (
            <Status key={status.id} status={status} />
          ))
        ) : activeMenuItem === "tube" && !tubeStatusArray ? (
          <Header content="Oops, something went wrong" />
        ) : activeMenuItem === "rail" ? (
          nationalRailStatus.map(status => (
            <Status key={status.id} status={status} />
          ))
        ) : (
          <Header content="Oops, something went wrong" />
        )}
      </Card.Group>
    </Container>
  );
};

export default App;
