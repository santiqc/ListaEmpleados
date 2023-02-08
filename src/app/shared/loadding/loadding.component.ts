import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loadding',
  templateUrl: './loadding.component.html',
  styleUrls: ['./loadding.component.css'],
})
export class LoaddingComponent implements OnInit {
  @Input() isVisible: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
