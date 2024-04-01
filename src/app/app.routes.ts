import { Routes } from '@angular/router';
import { RandomDataComponent } from './utils/random-data/random-data.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '',
    component: HomeComponent,
    children: [ 
        { path: 'random-data', component: RandomDataComponent},
    ]},
    { path: '**', pathMatch: 'full', component: NotFoundComponent}
];
