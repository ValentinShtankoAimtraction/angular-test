import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TaskAddComponent } from './task-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddComponent ],
      imports: [
        NoopAnimationsModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new task', () => {
    const callSpy = spyOn(component.saveForm, 'next');
    component.onFormSave({
      label: 'Test',
      category: 'cat-1',
      description: 'Test description'
    })

    expect(callSpy).toHaveBeenCalledWith({
      label: 'Test',
      category: 'cat-1',
      description: 'Test description'
    });
  } )
});
