import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  
  private usersSubject = new Subject<User[]>();

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.usersSubject = data;
    });
  }

  public selectUser(user: User): void {
    this.service.userSelected(user);
  }
}
