import React from "react";
import { List } from "semantic-ui-react";

const ListItem = (props) => {
  return(
    <List.Item>
      <List.Content>
        <List.Header>anonymous</List.Header>
        {props.text}
      </List.Content>
    </List.Item>
  );
};

export default ListItem;