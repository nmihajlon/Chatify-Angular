import { Component, OnInit, signal } from '@angular/core';
import { UserWrapperComponent } from "../shared/user-wrapper/user-wrapper.component";
import { User } from '../../../model/user.model';
import { USERS } from '../../../mocks/user.mock';

@Component({
  selector: 'app-user-list',
  imports: [UserWrapperComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);

  ngOnInit(){
    this.users.set(USERS);
    console.log(this.users());
  }
}
