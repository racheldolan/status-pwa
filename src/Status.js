import React from "react";
import { Card, Label, Icon } from "semantic-ui-react";
import tubeMap from "./static/tubeMap";

const Status = ({ status: { id: statusId, name, lineStatuses } }) => (
    <Card key={statusId}>
      <Card.Content>
        <Card.Header content={name} />
        {tubeMap[statusId] && (
          <Label
            circular
            empty
            style={{
              backgroundColor: `#${tubeMap[statusId].color}`,
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
);
export default Status;
