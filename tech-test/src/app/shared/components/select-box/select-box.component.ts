import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectBoxComponent {
  @Input() items: Array<string> = [];
  @Output() selectItem: EventEmitter<string> = new EventEmitter();

  onSelect({value}: MatSelectChange) {
    this.selectItem.emit(value);
  }
}
