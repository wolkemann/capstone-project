import { getSession } from "next-auth/react";
import Reply from "../../../schemas/Reply";
import User from "../../../schemas/User";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const mails = await Reply.find({ recipientId: session.user.id }).sort({
          createdAt: -1,
        });
        response.status(200).json(mails);
        break;

      case "POST":
        if (session) {
          const createdReply = await Reply.create({
            ...request.body,
            authorId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdReply });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
