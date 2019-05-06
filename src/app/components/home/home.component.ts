import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  trends = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Another ipsum dolor sit amet consectetur adipisicing elit.',
    'Agan ipsum dolor sit amet consectetur adipisicing elit.',
    'Maga ipsum dolor sit amet consectetur adipisicing elit.',
  ];
  constructor() { }

  ngOnInit() {
    let i = 0;
    setInterval(() => {
      setTimeout(() => {
        document.getElementById('trend').classList.remove('trend');
      }, 3000);
      if (i === this.trends.length - 1) {
        i = 0;
      }
      document.getElementById('trend').innerHTML = this.trends[i];
      document.getElementById('trend').classList.add('trend');
      i++;
      console.log(i);
    }, 2000);
  }

}
