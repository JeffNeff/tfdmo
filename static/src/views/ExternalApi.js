import React, { Component } from 'react';
import ToDo, { TASK_STATUSES } from '../components/ToDo';
import '../css/styles.css';
import Emoji from 'react-emoji-render';
import axios from 'axios'

const BACKEND_URL = "http://127.0.0.1:5000"
const GET_ITEM_ROUTE = "/items"
const INSERT_ITEM_ROUTE = "/insert/item"
const DELETE_ITEM_ROUTE = "/delete/item"

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			task: '',
			list: [],
			done: []
		};
		this.insertTodo = this.insertTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.completeTodo = this.completeTodo.bind(this);
	}
	componentWillMount() {
		axios.get(BACKEND_URL+GET_ITEM_ROUTE).then((resp) => {
			this.setState({list: resp.data})
			// resp.data.forEach(element => {
			// 	console.log(element)
			// 		if (element != null){
			// 			this.setState({ list: this.state.list.concat(element)})
			// 		}
			// 	});
		  }).catch(error => {
			alert("Could not contact backend: " + error)
		  })
	}
	onChange = (event) => {
		this.setState({ task: event.target.value });
	}
	removeTodo(name, type) {
		var bodyFormData = new FormData();
			bodyFormData.append("item", name);
		axios({
			method: 'post',
				url: BACKEND_URL+DELETE_ITEM_ROUTE,
				data: bodyFormData,
    			headers: {'Content-Type': 'multipart/form-data' }
		}).then((resp) => {

		  }).catch(error => {
			alert("Could not contact backend: " + error)
			return error
		  })

		  let array, index;
		  array = this.state.list;
		  index = array.indexOf(name);
		  array.splice(index, 1);
		  this.setState({ list: array });
	}
	completeTodo(name) {
		this.removeTodo(name, TASK_STATUSES.TO_DO);
		var join = this.state.done.slice();
		join.push(name);
		this.setState({ done: join });
		localStorage.setItem('done', JSON.stringify(join));
	}
	insertTodo() {
		if (this.state.task !== '') {
			console.log(this.state.task)
			var bodyFormData = new FormData();
			bodyFormData.append("item", this.state.task);
			axios({
				method: 'post',
				url: BACKEND_URL+INSERT_ITEM_ROUTE,
				data: bodyFormData,
    			headers: {'Content-Type': 'multipart/form-data' }
			 } ).then((resp) => {
			}).catch(error => {
			  alert("Could not contact backend: " + error)
			});
			this.setState({
				task: '',
				list: [...this.state.list, this.state.task]
			}, () => {
			});
		}
	}
	// handleInsertTodo = (event) => {
	// 	if (event.key === 'Enter'){
	// 		this.insertTodo();
	// 	}
	// }
	render() {
		return (
			<div className="header">
				<h1>My tasks<Emoji text="✍" /></h1>
				<input placeholder="Ex: Write a new blog post" maxLength={80} value={this.state.task} type='text' onKeyPress={this.handleInsertTodo} task={this.state.task} onChange={this.onChange}/>
				<button onClick={this.insertTodo}>+</button>
				<ToDo tasks={this.state.list} done={this.state.done} remove={this.removeTodo} complete={this.completeTodo}/>
			</div>
		);
	}
}
