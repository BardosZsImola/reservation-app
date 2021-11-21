import { User } from "../model/user.model";
import Controller from "./base.controller";
import UserRepository from "../repo/user.repo";

export default class UserController extends Controller<User> {

  constructor() {
    super(UserRepository);
  }

  // findByUsername(request: Request, response: Response) {
  //   const id = parseInt(request.params.id);
  //   const entity = this.repo.findById(id);
  //   if (!entity) {
  //     response.status(404).send({ message: 'Not found' });
  //     return;
  //   }
  //   response.status(200).send(entity);
  // }

}
