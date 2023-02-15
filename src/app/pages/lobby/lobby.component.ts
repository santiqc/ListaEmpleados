import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  public token!: string | null;;

  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

}
