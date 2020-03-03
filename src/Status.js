import React from "react";
import { Card, Label, Divider, Icon } from "semantic-ui-react";
import tubeMap from "./static/tubeMap";

const Status = ({ status: { id, name, lineStatuses } }) => (
  <>
    <Card key={id}>
      <Card.Content>
        <Card.Header content={name} />
        {tubeMap[id] && (
          <Label
            circular
            empty
            style={{
              backgroundColor: `#${tubeMap[id].color}`,
              marginRight: "0.5rem"
            }}
          />
        )}
        {lineStatuses.map(({ id, statusSeverityDescription }) => (
          <>
            <Card.Description key={id}>
              {statusSeverityDescription}
            </Card.Description>
            {statusSeverityDescription !== "Good Service" && (
              <Card.Meta>
                <Icon name="alarm" color="red" />
              </Card.Meta>
            )}
          </>
        ))}
      </Card.Content>
    </Card>
    <Divider />
  </>
);
export default Status;
