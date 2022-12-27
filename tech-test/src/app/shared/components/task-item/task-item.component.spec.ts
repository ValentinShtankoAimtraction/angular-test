import { ComponentFixture, TestBed } from "@angular/core/testing";
import { delay } from "rxjs/operators";

import { TaskItemComponent } from "./task-item.component";

describe("TaskItemComponent", () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should change checkbox value on init", () => {
    const controlSpy = spyOn(
      fixture.componentInstance.checkedControl,
      "setValue"
    );
    component.ngOnChanges({
      task: {
        currentValue: {
          id: "1",
          label: "test",
        },
        previousValue: null,
        firstChange: true,
        isFirstChange() {
          return true;
        },
      },
    });
    expect(controlSpy).toHaveBeenCalled();
  });

  it("should not change checkbox value on init", () => {
    const controlSpy = spyOn(
      fixture.componentInstance.checkedControl,
      "setValue"
    );
    component.ngOnChanges({});
    expect(controlSpy).not.toHaveBeenCalled();
  });

  it("should emit event when value changes", (done) => {
    const emitSpy = spyOn(component.checkTask, "emit");
    component.task = {
      id: 1,
      label: "test",
    };
    const delayTime = 151 // Delayed by debounceTime
    component.checkedControl.valueChanges.pipe(delay(delayTime)).subscribe(() => {
      expect(emitSpy).toHaveBeenCalledWith({
        id: 1,
        checked: true
      });
      done();
    });


    component.checkedControl.setValue(true, {emitEvent: true});
    fixture.detectChanges();
    // setTimeout(() => {
    //   expect(emitSpy).toHaveBeenCalled();
    //   done();
    // }, 100);
  });
});
