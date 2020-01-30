import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

const fadeStrikeThoughAnimation = trigger('fadeStrikeThough', [
  state('active', style({
    fontSize: '18px',
    color: 'black'
  })),
  state('completed', style({
    fontSize: '17px',
    color: 'lightgrey',
    textDecoration: 'line-through'
  })),
  transition('active <=> completed', [animate(250)])
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [
    fadeStrikeThoughAnimation,
  ]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  isHovered = false;
  isEditing = false;

  constructor() { }
  ngOnInit() {
  }
  changeTodoStatus() {
    this.changeStatus.emit({ ...this.todo, isCompleted: !this.todo.isCompleted });
  }

  submitEdit(event: KeyboardEvent) {
    event.preventDefault(); // prevent Form to submit by default
    // tslint:disable-next-line: deprecation
    if (event.keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  removeTodo() {
    this.deleteTodo.emit(this.todo);
  }
}
