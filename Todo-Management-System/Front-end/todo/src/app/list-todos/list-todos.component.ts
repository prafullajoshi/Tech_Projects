import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public description : string,
    public done : boolean,
    public targetDate : Date
  ){
    
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  // todos = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an Expert', true, new Date()),
  //   new Todo(3, 'Visit Europe', false, new Date()),
    // {id:1, description:'Learn to Dance'},
    // {id:2, description:'Become an Expert'},
    // {id:3, description:'Visit Europe'},
  // ];

  // todo = {
  //   id : 1,
  //   description : 'Learn to Dance'
  // }

  constructor(
    private todoService:TodoDataService
  ) { }

  ngOnInit(): void {
    this.todoService.retrieveAllTodos('prafulla').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

}
