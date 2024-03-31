import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ActivatedRoute } from '@angular/router';

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
  genUser = (): User => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress()
  });

  users: User[] = [];

  constructor(private route: ActivatedRoute) {}

  @Input('amount') amount: any = 5;


  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      const amountParam = params.get('amount');
      this.amount = amountParam ? +amountParam : this.amount;
      this.users = Array.from({length: this.amount}, this.genUser);
      console.log(this.users);
    });
  }
}
