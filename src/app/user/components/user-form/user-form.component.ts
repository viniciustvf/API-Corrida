import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public user = {} as User;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (data: User) => {
        this.user = { ...data };
      },
    });
  }

  public insert() {
    if (this.user.id) {
      this.service.update(this.user).subscribe();
    } else {
      this.service.insert(this.user).subscribe();
    }
  }

  public getUsersByName() {
    this.service.getUserByName(this.user.name).subscribe();
  }

  public getUserByEmail() {
    this.service.getUserByEmail(this.user.email).subscribe();
  }
}
