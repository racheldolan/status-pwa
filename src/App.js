import React, { Fragment, useEffect, useState } from "react";
import { Container, Image, Item, Label, Segment } from "semantic-ui-react";
import tubeMap from "./static/tubeMap";
import logo from "./images/logo.png"
const App = () => {
  const url =
    "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";
  const [statusArray, setStatusArray] = useState([]);

  const fetchStatuses = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setStatusArray(data);
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <Container>
      <Segment>
        <Image size="small" />
      </Segment>
      {statusArray.map(status => 
          <Segment key={status.id} padded={"very"}>
            <Item.Group>
              <Fragment>
                <Item>
                  <Item.Content>
                    <Item.Header>{status.name}</Item.Header>
                    {status.lineStatuses.map(lineStatus => (
                      <Item.Description key={lineStatus.id}>
                        {lineStatus.statusSeverityDescription}
                      </Item.Description>
                    ))}
                    <Label
                      style={{
                        backgroundColor: `#${tubeMap[status.id].color}`
                      }}
                    />
                  </Item.Content>
                </Item>
              </Fragment>
            </Item.Group>
          </Segment>
      )}
      </Container>
  );
};

export default App;
