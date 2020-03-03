import React from "react";
import { Item, Label, Segment, Divider, Icon } from "semantic-ui-react";
import tubeMap from "./static/tubeMap";

const Status = ({ status: { id, name, lineStatuses } }) => {
  return (
    <Segment
      basic
      textAlign="center"
      key={id}
    >
      <Item.Group>
        <Item>
          <Item.Content>
            {tubeMap[id] && (
              <Label
              circular
              empty
                style={{
                  backgroundColor: `#${tubeMap[id].color}`,
                  marginRight: '0.5rem'
                }}
              />
            )}
            <Item.Header content={name} />
            {lineStatuses.map(({ id, statusSeverityDescription }) => (
              <>
                <Item.Description key={id}>
                  {statusSeverityDescription}
                </Item.Description>
                {statusSeverityDescription !== "Good Service" && (
                  <Item.Extra>
                    <Icon name="alarm" color="red" />
                  </Item.Extra>
                )}
              </>
            ))}
          </Item.Content>
        </Item>
        <Divider />
      </Item.Group>
    </Segment>
  );
};
export default Status;
