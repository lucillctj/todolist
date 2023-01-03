import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'app/models/todolist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:5000/')
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5000/${taskId}`)
  }
}
