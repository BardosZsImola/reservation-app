import autoBind from 'auto-bind';
import { NextFunction, Request, Response } from 'express';
import { BaseEntity } from '../model/base';

export default class Controller<T extends BaseEntity> {

  repo: any;

  constructor(repo: any) {
    this.repo = repo;
    autoBind(this);
  }

  findAll(request: Request, response: Response) {
    const entities = this.repo.findAll();
    response.status(200).send(entities);
  }

  findByIdMw(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const entity = this.repo.findById(id);
    if (!entity) {
      response.status(404).send({ message: 'Not found' });
      return;
    }
    response.locals.entity = entity;
    next();
  }
  
  findById(request: Request, response: Response) {
    const { entity } = response.locals;
    response.status(200).send(entity);
  }

  create(request: Request, response: Response) {
    const entity = request.body;
    const createdEntity = this.repo.create(entity);
    response.status(201).location(`${createdEntity}`).send(entity);
  }

  update(request: Request, response: Response) {
    const { entity } = response.locals;
    let newEntity = request.body;
    newEntity._id = entity._id;
    const updatedEntity = this.repo.update(newEntity);
    response.status(200).send(updatedEntity);
  }

  delete(request: Request, response: Response) {
    const { entity } = response.locals;
    this.repo.delete(entity._id);
    response.status(204).send();
  }
}
