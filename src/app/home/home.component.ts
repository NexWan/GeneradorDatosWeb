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
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
    ) {
      this.loadingService.loading$.subscribe(loading => {
        this.isLoading = loading;
      });
    }
  elements:string[] = ["Nombre", "Email", "Telefono", "Direccion"];
  amount = 0;


  validateInput(evt:KeyboardEvent) {
    const charCode = evt.key;
    if(!/[0-9]/.test(charCode)) evt.preventDefault();
  }
  
  async generateData(){
    const prueba:HTMLInputElement = (<HTMLInputElement>document.getElementById('Nombre'));
    console.log(prueba.checked);
    
    this.amount = parseInt((<HTMLInputElement>document.getElementById('amount')).value);

   if(this.amount < 1 || isNaN(this.amount)){
      alert("Por favor ingrese un numero mayor a 0");
      return;
   } 
    await this.router.navigate(['/random-data'], { queryParams: { amount: this.amount } });
  }
}
