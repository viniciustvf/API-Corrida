import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public userList: User[] = [];
  public user = {} as User;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (res: User) => {
        this.user.name = res.name;
        this.user.email = res.email;
        this.user.roles = res.roles;
      },
    });
  }

  public getUsersByName(nome: string) {
    this.service.getUsersByName(nome);
  }
}
