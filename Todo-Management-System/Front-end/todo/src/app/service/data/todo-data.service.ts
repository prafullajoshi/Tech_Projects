import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { TODO_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`);
    // console.log("Execute Hello World Bean Service.");
  }

  deleteTodo(username, id)
  {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username, id)
  {
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo)
  {
    return this.http.put(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo)
  {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/todos`, todo);
  }

  createBasicAuthenticationHttpHeader() {
    let username = `prafulla`;
    let password = `dummy`;
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = 'Bearer ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

}
