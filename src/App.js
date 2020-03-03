import React, { useEffect, useState } from "react";
import { Container, Image, Divider, Menu, Segment, Loader } from "semantic-ui-react";
import logo from "./images/logo.png";
import nationalRailLogo from "./images/national-rail-logo.png";
import Status from "./Status";


const App = () => {
  const [tubeStatusArray, setTubeStatusArray] = useState([]);
  const [nationalRailStatus, setNationalRailStatus] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState("tube");
  const [isLoadingNationalRailStatuses, setIsLoadingNationalRailStatuses] = useState(false)
  const [isLoadingTubeStatuses, setIsLoadingTubeStatuses] = useState(false)

  const fetchDataAndSortLinesByStatus = async url => {
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
  };

  useEffect(() => {
    const fetchNationalRailStatuses = async () => {
      setIsLoadingNationalRailStatuses(true)
      const orderedStatusArray = await fetchDataAndSortLinesByStatus(
        "https://api.tfl.gov.uk/line/mode/national-rail/status"
      );
      setIsLoadingNationalRailStatuses(false)
      setNationalRailStatus(orderedStatusArray);
    };
    const fetchTubeStatuses = async () => {
      setIsLoadingTubeStatuses(true)
      const orderedStatusArray = await fetchDataAndSortLinesByStatus(
        "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"
      );
      setIsLoadingTubeStatuses(false)
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
      <Menu tabular pointing>
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
      <Loader active={(isLoadingNationalRailStatuses && activeMenuItem === "rail") || (isLoadingTubeStatuses && activeMenuItem === "tube")} />
      {activeMenuItem === "tube"
        ? tubeStatusArray.map(status => <Status key={status.id} status={status} />)
        : nationalRailStatus.map(status => (
            <Status key={status.id} status={status} />
          ))}
    </Container>
  );
};

export default App;
