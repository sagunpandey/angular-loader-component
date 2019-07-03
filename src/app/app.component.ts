import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  divALoading: boolean;
  divBLoading: boolean;

  toggleDivALoading() {
    this.divALoading = !this.divALoading;
  }

  toggleDivBLoading() {
    this.divBLoading = !this.divBLoading;
  }
}
