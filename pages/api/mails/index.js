import { getSession } from "next-auth/react";
import Mail from "../../../schemas/Mail";
import User from "../../../schemas/User";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const mails = await Mail.find().sort({ createdAt: -1 }).limit(100);
        response.status(200).json(mails);
        break;

      case "POST":
        if (session) {
          const selectUser = await User.find({ _id: { $ne: session.user.id } });
          console.log(selectUser.length);

          const assignRecipient =
            selectUser[Math.floor(Math.random() * selectUser.length) + 0];

          console.log(assignRecipient);

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
