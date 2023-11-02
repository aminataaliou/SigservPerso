import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppbarService {

  private open = new BehaviorSubject<boolean>(false);
  openSidenav = this.open.asObservable();

  constructor() { }

  toggle(): void {
    this.open.next(!this.open.value);
}
}
