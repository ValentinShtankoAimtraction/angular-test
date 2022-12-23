import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';
import { ApiTasksService } from '@services/api-tasks.service';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TasksRoutingModule
  ],
  providers: [
    {
      provide: API_TASKS_SERVICE,
      useFactory: (http: HttpClient) => {
        return new ApiTasksService(http)
      },
      deps: [HttpClient]
    }
  ]
})
export class TasksModule { }
