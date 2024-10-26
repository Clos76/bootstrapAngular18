import { Component } from '@angular/core';
import { RouterLink, RouterOutlet , RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive], //para poder navegar, necesita implementar el uso de router aqui
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bootstrapAngular18';
}
