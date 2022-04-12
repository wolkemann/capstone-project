import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import User from "../../../schemas/User";
import Mail from "../../../schemas/Mail";

export default async function handler(request, response) {
  const { mailId, shuffle, authorId } = request.query;
  console.log(request.query);

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const getMail = await Mail.findById(mailId).exec();
        response.status(200).json(getMail);
        break;

      case "PATCH":
        if (session) {
          if (shuffle) {
            const selectUser = await User.find({
              $and: [
                { _id: { $ne: session.user.id } },
                { _id: { $ne: authorId } },
              ],
            });
            const assignRecipient =
              selectUser[Math.floor(Math.random() * selectUser.length) + 0];

            const modifyMail = await Mail.findByIdAndUpdate(
              mailId,
              {
                recipientId: assignRecipient._id,
              },
              { returnDocument: "after", runValidators: true }
            );

            response.status(200).json(modifyMail);
          } else {
            const modifyMail = await Mail.findByIdAndUpdate(
              mailId,
              {
                $set: request.body,
              },
              { returnDocument: "after", runValidators: true }
            );

            response.status(200).json(modifyMail);
          }
        }

        break;

      default:
        console.log("request method was neither PATCH or DELETE");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
