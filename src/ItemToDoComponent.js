import { Component } from "react";

class ItemToDoComponent extends Component {
  state = {};

  render() {
    return (
      <li>
        {this.props.todo} 
        <span className="close" onClick={() => this.props.deleteItem(this.props.id)}>{"\u00D7"}</span>
      </li>
    );
  }
}

export default ItemToDoComponent;