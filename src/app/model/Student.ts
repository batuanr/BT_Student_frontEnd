import {Gender} from './Gender';

export class Student {
  id: number;
  name: string;
  birthDay: string;
  gender: Gender;
  avatar: string;

  constructor(name: string, birthDay: string, gender: Gender, avatar: string) {
    this.name = name;
    this.birthDay = birthDay;
    this.gender = gender;
    this.avatar = avatar;
  }
}
