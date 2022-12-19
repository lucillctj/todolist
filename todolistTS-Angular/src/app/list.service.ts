import { Injectable } from '@angular/core';
import { Task } from './todolist';
import { TODOLIST } from './mock-lists';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private messageService: MessageService) { }


  getTasks(): Observable<Task[]> {
    const tasks = of(TODOLIST);
    this.messageService.add ('ListService: fetched tasks');
    return tasks;
  }

}
