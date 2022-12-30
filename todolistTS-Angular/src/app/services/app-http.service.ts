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
    const result = this.http.get<Task[]>('http://localhost:5000/');
    console.log(result);
    return result;
    
  }
}
