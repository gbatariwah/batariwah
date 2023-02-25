import { createRouter, defineEventHandler, useBase } from "h3";
import Post from "../models/post";
import User from "../models/user";

const router = createRouter();

router.get(
  "/",
  defineEventHandler(async (event) => {
    const { page = 1, limit = 4 } = getQuery(event);

    //   execute query with page and limit values
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    // get total documents in the Posts collection
    const count = await Post.estimatedDocumentCount();

    // return response with posts, total pages, and current page

    return {
      posts,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      total: count,
      currentPage: page,
    };
  })
);

export default useBase("/api/posts", eventHandler(router.handler));
