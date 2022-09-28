import { connection } from "../datasource";
import express, { Request, Response, NextFunction } from "express";
import { postRepo } from "../routes";
import { generateUUID } from "../helpers/generateUUID";
import { Post } from "../models/Post";

export class PostController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, path, createdAt } = req.body;

      const post = postRepo.create({
        id: generateUUID(),
        name,
        path,
        createdAt,
      });
      // todo: add validation schema

      await postRepo.save(post);

      return res.json(post);
    } catch (error: any) {
      return next(error.message);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postRepo.findOne({
        where: { id: req.params.id },
      });

      if (!post)
        return next(new Error(`There was no post with id: ${req.body.id}`));

      await postRepo.remove(post);

      return res.end();
    } catch (error: any) {
      return next(error.message);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    // put method
    try {
      const { name, path, createdAt } = req.body;
      const post = await postRepo.findOne({
        where: { id: req.params.id },
      });

      if (!post)
        return next(new Error(`There was no post with id: ${req.params.id}`));

      await postRepo
        .createQueryBuilder()
        .update(Post)
        .set({
         id: req.params.id,
         name: name,
         path: path,
         createdAt: createdAt,
       })
        .where("id = :id", {id: req.params.id})
        .execute();

      return res.status(200).json({
         message: `Post with id ${req.params.id} was successfully updated`
      });
    } catch (error: any) {
      return next(error.message);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const all = await postRepo.find({
        order: {
          name: "ASC",
        },
      });

      return res.json(all);
    } catch (error: any) {
      return next(error.message);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await postRepo.findOne({
        where: { id: req.params.id },
      });

      if (!post) {
        return res
          .status(404)
          .json({ message: `Sorry, ${req.params.id} wasn't find here.` });
      }
      return res.json(post);
    } catch (error: any) {
      return next(error.message);
    }
  }
}
