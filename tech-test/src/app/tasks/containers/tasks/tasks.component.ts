import { Component, Inject, OnInit } from '@angular/core';
import { IAPITaskService } from '@models/api-tasks.model';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    @Inject(API_TASKS_SERVICE) private readonly _taskService: IAPITaskService
  ) { }

  ngOnInit(): void {
      this._taskService.list()
  }

}
