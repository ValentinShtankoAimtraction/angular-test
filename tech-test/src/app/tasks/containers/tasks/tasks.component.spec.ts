import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';
import { MockTaskApiService } from 'src/app/testing/mock-task-api-service';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [
        
      ],
      providers: [
        DatePipe,
        {
          provide: API_TASKS_SERVICE,
          useClass: MockTaskApiService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
