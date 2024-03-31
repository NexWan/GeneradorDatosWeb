import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { RandomDataComponent } from './utils/random-data/random-data.component';
import { NgFor } from '@angular/common';
import { HeaderComponent } from './layer/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RandomDataComponent, NgFor, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'genDatos';

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {}

  amount = 0;
  
  generateData(){
    this.amount = parseInt((<HTMLInputElement>document.getElementById('amount')).value);
    this.router.navigate(['/random-data'], { queryParams: { amount: this.amount } });
  }
}
