import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'NaijaNews';
  trends = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Another ipsum dolor sit amet consectetur adipisicing elit.',
    'Agan ipsum dolor sit amet consectetur adipisicing elit.',
    'Maga ipsum dolor sit amet consectetur adipisicing elit.',
  ];
  ngOnInit(): void {
    /* let i = 0;
    setInterval(() => {
      setTimeout(() => {
        document.getElementById('trend').classList.remove('trend');
      }, 3000);
      if (i === this.trends.length - 1) {
        i = 0;
      }
      if (document.getElementById('trend')) {
        document.getElementById('trend').innerHTML = this.trends[i];
        document.getElementById('trend').classList.add('trend');
        i++;
      }
      console.log(i);
    }, 2000); */
  }
}
