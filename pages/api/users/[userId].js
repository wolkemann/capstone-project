import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import User from "../../../schemas/User";

export default async function handler(request, response) {
  const { userId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const getUser = await User.findById(userId).exec();
        response.status(200).json(getUser);
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
