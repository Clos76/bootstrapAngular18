import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import path from 'path';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, 
    },

    {
        path: 'home', component: HomeComponent,
    }, 
    {
        path: 'products', component: ProductsComponent,
    },
    {
        path: 'cart', component: CartComponent,
    }, 
    {
        path: '**', component: PageNotFoundComponent, 
    }

];
