import { Component, } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { LoadingService } from '../loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
    ) {
      this.loadingService.loading$.subscribe(isLoading => {
        this.isLoading = isLoading;
      });
    }

  amount = 0;
  
  async generateData(){
    this.amount = parseInt((<HTMLInputElement>document.getElementById('amount')).value);
    await this.router.navigate(['/random-data'], { queryParams: { amount: this.amount } });
  }
}
