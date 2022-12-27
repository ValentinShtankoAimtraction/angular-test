import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ITaskTypes } from '@models/task.model';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';
import { MockTaskApiService } from 'src/app/testing/mock-task-api-service';
import { TasksModule } from '../../tasks.module';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [
        TasksModule,
        NoopAnimationsModule
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

  it('should provide a valid checked state', () => {
    const spyCall = spyOn(component.taskService, 'patch');
    const spyDatePipe = spyOn(component.datePipe, 'transform').and.returnValue('11-11-1111')
    component.onTaskChecked({id: 1, checked: true});
    expect(spyCall).toHaveBeenCalledWith({id: 1, done: '11-11-1111'});
    component.onTaskChecked({id: 1, checked: false});
    expect(spyCall).toHaveBeenCalledWith({id: 1, done: false});
  })

  it('should call a delete method', () => {
    const spyCall = spyOn(component.taskService, 'delete');
    component.onTaskDelete(1);
    expect(spyCall).toHaveBeenCalledWith(1);
  })

  it('should call a create method', () => {
    const spyCall = spyOn(component.taskService, 'post');
    const mockItem = {
      id: 1,
      label: 'test'
    }
    component.onTaskCreate(mockItem);
    expect(spyCall).toHaveBeenCalledWith(mockItem);
  });

  it('should update filters', () => {
    const spyCall = spyOn(component.taskService, 'changeFilter');
    const mockFilter = {
      category: 'cat-1',
      type: ITaskTypes.COMPLETED      
    };
    component.onChangeFilter(mockFilter);
    expect(spyCall).toHaveBeenCalledWith(mockFilter);
  })
});
