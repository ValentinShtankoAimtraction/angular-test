import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';
import { ApiTasksService } from '@services/api-tasks.service';
import { HttpClient } from '@angular/common/http';
import { TASK_CONTAINERS } from './containers';
import { TASK_COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ...TASK_CONTAINERS,
    ...TASK_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
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
