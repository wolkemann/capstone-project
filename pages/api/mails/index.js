import { getSession } from "next-auth/react";
import Mail from "../../../schemas/Mail";
import User from "../../../schemas/User";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { authorid } = request.query;
  try {
    connectDb();
    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        if (session) {
          if (authorid) {
            const mails = await Mail.find({
              authorId: authorid,
            }).sort({
              createdAt: -1,
            });

            response.status(200).json(mails);
          } else {
            const mails = await Mail.find({
              recipientId: session.user.id,
            }).sort({
              createdAt: -1,
            });

            response.status(200).json(mails);
          }
        }
        break;

      case "POST":
        if (session) {
          const selectUser = await User.find({ _id: { $ne: session.user.id } });

          const assignRecipient =
            selectUser[Math.floor(Math.random() * selectUser.length) + 0];

          const createdMail = await Mail.create({
            ...request.body,
            authorId: session.user.id,
            recipientId: assignRecipient._id,
          });
          response.status(200).json({ success: true, data: createdMail });
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
