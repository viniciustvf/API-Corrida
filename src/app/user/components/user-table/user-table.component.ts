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
  public users!: User[];
  public userName!: string;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((users) => {
      this.users = users;
    });

    this.service.emitNome.subscribe((name) => {
      this.userName = name;
    });

    this.service.getUsersByName(this.userName).subscribe((users) => {
      this.users = users;
    });
  }

  public selectUser(user: User): void {
    this.service.userSelected(user);
  }
}
