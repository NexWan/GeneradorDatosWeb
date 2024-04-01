import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { RandomDataComponent } from './utils/random-data/random-data.component';
import { NgFor } from '@angular/common';
import { HeaderComponent } from './layer/header/header.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RandomDataComponent, NgFor, RouterLink, RouterLinkActive, HeaderComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'genDatos';
}
