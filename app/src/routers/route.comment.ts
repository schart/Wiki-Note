"use strict";
import express, { Request, Response, NextFunction, Router } from "express";

export const CommentRoute: Router = express.Router();

// Controllers
import Comment_C from "../controllers/controller.note/note";

// Midwares
import * as user_midwares from "../Middlewares/token/middleware.token";

//? Comment process
CommentRoute.post(
  "/comment/",
  user_midwares.requireAuth,
  Comment_C.note_comment,
  (req: Request, res: Response, next: NextFunction) => {}
);
