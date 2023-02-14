import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-action",
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  @Input() isDisabled: boolean | null = false;
  @Input() lastChild: boolean | null = false;
  @Input() readyLogin: boolean | null = false;
  @Input() icon: string = 'home';
  @Input() label: string = '';
  @Input() tooltipText: string = '';
  @Input() data: any;
  @Output() event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  public click() {
    this.event.emit(this.data || true);
  }
}
