import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeComponent } from "./liste/liste.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ListeComponent]
})
export class AppComponent {
  title = 'tier-list-dev2-24';


}
