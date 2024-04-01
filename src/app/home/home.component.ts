import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
