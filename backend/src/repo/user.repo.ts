import { User } from '../model/user.model';
import { userData } from '../util/database';

export class UserRepository {

  findAll(): User[] {
    return userData;
  }

  findById(_id: number): User | null {
    if (_id < 0 || _id >= userData.length)
      return null;
    return userData[_id];
  }

  findByUsername(username: string): User[] {
    return null;
  }

  create(entity: User): User {
    const newId = userData.length;
    entity._id = newId;
    userData.push(entity);
    return entity;
  }

  update(entity: User): User {
    userData.map((user) => {
      if (user._id == entity._id) {
        return entity;
      }
      return user;
    })
    return entity;
  }

  delete(_id: number): void {
    if (_id >= 0 && _id <= userData.length)
      userData.splice(_id, 1);
  }

}

export default new UserRepository();
