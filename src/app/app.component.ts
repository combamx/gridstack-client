import { RouterOutlet } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {

  }
}
