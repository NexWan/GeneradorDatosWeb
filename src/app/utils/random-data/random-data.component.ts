import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit,   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../loading.service';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-random-data',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './random-data.component.html',
  styleUrl: './random-data.component.scss'
})

export class RandomDataComponent implements OnInit{
  textArea:HTMLTextAreaElement = (<HTMLTextAreaElement>(document.getElementById("textArea")));;
  users: User[] = [];
  constructor(private route: ActivatedRoute, private loadingService: LoadingService) {}
  @Input('amount') amount: any = 5;
  completed:boolean = false;

  ngOnInit():void {   
    this.textArea = (<HTMLTextAreaElement>(document.getElementById("textArea")));
    this.route.queryParamMap.subscribe(async params => {
      console.log(params.getAll('els'));
      this.loadingService.setLoading(true);
      this.textArea.value = ""
      const amountParam = params.get('amount');
      this.amount = amountParam ? +amountParam : this.amount;
      const posElements = ["Nombre", "Email", "Telefono", "Direccion"]
      const elements = params.getAll('els');
      const activeElements = posElements.map(posEl => elements.includes(posEl));
      console.log(activeElements);
      const worker = new Worker(new URL('./data-generator.worker', import.meta.url));
      worker.postMessage({ amount: this.amount, elements: activeElements});
      worker.onmessage = ({ data }) => {
        this.users = data;
        this.textArea.value = this.users.map((user: User) => `${user.name} ${user.email} ${user.address} ${user.phone.replace(/\D/g, '')}`).join('\n');
        this.loadingService.setLoading(false);
      };
    });
  }
}
