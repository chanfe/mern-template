import React, {Component} from "react";
import axios from "axios"
import { Container, List } from "semantic-ui-react"
import ListItems from "./ListItem"

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      reactions:[]
    };
  }

  //fetch all here

//   componentDidMount() {
//     axios.get(`/api/v1/List/` + this.props.ObjectId + `/reactions`)
//       .then((res) => {
//         this.setState({
//           reactions:res.data.data
//         });
//       });
//   }

  render() {

    let listedReact = this.state.reactions.map((reaction) => {
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