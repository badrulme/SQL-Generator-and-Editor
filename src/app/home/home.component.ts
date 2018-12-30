import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  howToWorkImg = '../../assets/SQLGeneratingTools.gif';
  // howToWorkImg = 'https://user-images.githubusercontent.com/15130238/50544765-0c3d9400-0c2b-11e9-8aec-7b3b2452a34d.gif';
  constructor() { }

  ngOnInit() {
  }

}
