import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HamburgerMachineComponent } from './hamburger-machine/hamburger-machine.component'; // ← AGREGAR esta línea

@Component({
  selector: 'app-root',
  imports: [HamburgerMachineComponent], // ← AGREGAR HamburgerMachineComponent aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hamburger-machine');
}