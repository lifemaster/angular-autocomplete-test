import { IUser } from '../types';

export class UserModel {
  private _id: number;
  private _firstName: string;
  private _lastName: string;

  constructor(user: IUser) {
    this._id = user.id;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
  }

  get id(): number {
    return this._id;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}
