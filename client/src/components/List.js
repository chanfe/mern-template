import React, {Component} from "react";
import axios from "axios"
import { Container, List } from "semantic-ui-react"
import ListItems from "./ListItem"

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      items:[]
    };
  }

  //fetch all here

  componentDidMount() {
    axios.get("/api/v1/List/" + this.props.ObjectId)
      .then((res) => {
        this.setState({
          items:res.data.data
        });
      });
  }

  render() {

    let listedReact = this.state.items.map((reaction) => {
        return <ListItems text={reaction}></ListItems>;
    });

    return(
      <Container>
          <List celled>
            {listedReact}
          </List>
      </Container>
    );
  }
}

export default List;