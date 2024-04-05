import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../loading.service';

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const posElements = ['Nombre', 'Email', 'Telefono', 'Direccion'];

let finalS: string = '';

@Component({
  selector: 'app-random-data',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './random-data.component.html',
  styleUrl: './random-data.component.scss',
})
export class RandomDataComponent implements OnInit {
  textArea?: HTMLTextAreaElement;
  users: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}
  @Input('amount') amount: any = 5;
  completed: boolean = false;

  ngOnInit(): void {
    this.textArea = <HTMLTextAreaElement>document.getElementById('textArea');
    this.route.queryParamMap.subscribe(async (params) => {
      this.loadingService.setLoading(true);
      if (!this.textArea) return;
      this.textArea.value = '';
      const amountParam = params.get('amount');
      this.amount = amountParam;
      const elements = params.getAll('els');
      const activeElements = posElements.map((posEl) =>
        elements.includes(posEl)
      );
      const worker = new Worker(
        new URL('./data-generator.worker', import.meta.url)
      );
      const worker2 = new Worker(
        new URL('./write-data.worker', import.meta.url)
      );
    
      // Split the data into chunks
      const chunkSize = 10000; // Adjust this value as needed
      const chunks = [];
      for (let i = 0; i < activeElements.length; i += chunkSize) {
        chunks.push(activeElements.slice(i, i + chunkSize));
      }
      // Send each chunk to the worker
      chunks.forEach((chunk, index) => {
        worker.postMessage({ amount: this.amount, elements: chunk });
    
        worker.onmessage = ({ data }) => {
          this.users = data;
          worker2.postMessage({ users: this.users });
    
          worker2.onmessage = ({ data }) => {
            finalS = data;
            if (!this.textArea) return;
            this.textArea.value += finalS; // Append the data to the textarea
            // Stop loading when all chunks have been processed
            if (index === chunks.length - 1) {
              this.loadingService.setLoading(false);
            }
          };
        };
      });
    });
  }
}
