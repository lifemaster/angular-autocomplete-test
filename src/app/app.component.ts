import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { IUser } from './types.d';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public filteredUsers$: Observable<UserModel[]>;
  public userSearchControl: FormControl = new FormControl(['']);

  private _users: IUser[] = [
    { id: 1, firstName: 'Barak', lastName: 'Obama' },
    { id: 2, firstName: 'Bill', lastName: 'Gates' },
    { id: 3, firstName: 'Steve', lastName: 'Jobs' },
    { id: 4, firstName: 'Boris', lastName: 'Jonson' },
    { id: 5, firstName: 'Tim', lastName: 'Cook' }
  ];

  private _userModels: UserModel[];

  constructor() {
    this._userModels = this._users.map((user) => new UserModel(user));

    this.filteredUsers$ = this.userSearchControl.valueChanges.pipe(
      startWith(''),
      map(name => this._filterProducts(name))
    );
  }

  private _filterProducts(value: string): UserModel[] {
    if (!value.startsWith('@')) {
      return [];
    }

    const filterValue = value.toLowerCase().slice(1);

    return this._userModels.filter(user => user.fullName.toLocaleLowerCase().includes(filterValue));
  }
}
