import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ITaskTypes } from '@models/task.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { TaskFilterComponent } from './task-filter.component';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFilterComponent ],
      imports: [ SharedModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by category', () => {
    const spyCall = spyOn(component.changeFilter, 'emit');
    component.changeCategory('cat-1');

    expect(spyCall).toHaveBeenCalledWith({
      category: 'cat-1'
    })
  });

  it('should filter by status', () => {
    const spyCall = spyOn(component.changeFilter, 'emit');
    component.changeType(ITaskTypes.COMPLETED);

    expect(spyCall).toHaveBeenCalledWith({
      type: ITaskTypes.COMPLETED
    })
  })
});
