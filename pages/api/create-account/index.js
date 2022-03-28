import { getSession } from "next-auth/react";
import User from "../../../schemas/User";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    // const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const mails = await User.find().sort({ createdAt: -1 }).limit(100);
        response.status(200).json(mails);
        break;

      case "POST":
        const createdUser = await User.create({
          ...request.body,
        });
        response.status(200).json({ success: true, data: createdUser });

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
