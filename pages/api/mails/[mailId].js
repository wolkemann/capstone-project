import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import Mail from "../../../schemas/Mail";

export default async function handler(request, response) {
  const { mailId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const getMail = await Mail.findById(mailId).exec();
        response.status(200).json(getMail);
        break;

      case "PATCH":
        const modifyMail = await Mail.findByIdAndUpdate(
          mailId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        response.status(200).json(modifyMail);
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
