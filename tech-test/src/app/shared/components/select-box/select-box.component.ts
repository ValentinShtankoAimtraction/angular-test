import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectBoxComponent {
  @Input() items: Array<string> = [];
  @Output() selectItem: EventEmitter<string> = new EventEmitter();
}
