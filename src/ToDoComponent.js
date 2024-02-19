import ItemToDoComponent from "./ItemToDoComponent";
import { Component } from "react";

class ToDoComponent extends Component {
  state = {
    todos: [],
    value: '',
    id: 0
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('todos')); 
    if (data && data.length !== 0) {
      this.setState({todos: data});
      this.setState({id: data[data.length - 1].id});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos && prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  onChangeHandler = (e) => {
    this.setState({value: e.target.value});
  }

  onClickHandler = () => {
    if (this.state.value.length > 0) {
      this.setState({todos: [...this.state.todos, {id: this.state.id, todo:this.state.value}]});
      this.setState({value: ''});
      this.setState({id: this.state.id + 1})
    }
  }

  onKeyDownHandler = (e) => {
    if (e.key === 'Enter') this.onClickHandler();
  }

  deleteItem = (id) => {
    const updatedList = this.state.todos.filter((item) => item.id !== id);
    this.setState({todos: updatedList})
  }

  clearToDoList = () => {
    localStorage.clear('todos');
    this.setState({todos: []});
  }

  render() {
    return(
      <>
        <button className="clear" onClick={this.clearToDoList}>Clear Todo List</button>
        <br />
        <input type="text" onChange={this.onChangeHandler} onKeyDown={this.onKeyDownHandler}  value={this.state.value}/>
        <p>{this.state.todos.length}</p>
        <ul>
          {this.state.todos.map((item) => (
            <ItemToDoComponent key={item.id} todo={item.todo} id={item.id} deleteItem={this.deleteItem}/>
          ))}
         
        </ul>
        <button className="add" onClick={this.onClickHandler}>Add ToDo item</button>
      
      </>
    );
  };
}

export default ToDoComponent;