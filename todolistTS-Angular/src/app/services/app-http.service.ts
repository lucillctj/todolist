import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'app/models/todolist';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:5000/');
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:5000/${taskId}`);
  }

  updateTaskById(taskId: number, data: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:5000/${taskId}`, data);
  }

  createTask(data: Task): Observable<Task> {
    return this.http.post<Task>(`http://localhost:5000/`, data)
  }

  deleteTask(taskId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:5000/${taskId}`)
  }

}
