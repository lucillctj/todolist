import { Component, OnInit } from '@angular/core';
import { AppHttpService } from 'app/services/app-http.service';
import { Observable } from 'rxjs';
import { Task } from 'app/models/todolist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task$: Observable<Task>;


  constructor(private appHttpService: AppHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const taskId = +params.get('id')
      this.task$ = this.appHttpService.getTaskById(taskId);
    });
    
    
  }
};
