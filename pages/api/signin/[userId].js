import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import User from "../../../schemas/User";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

export default async function handler(request, response) {
  const { userId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "PATCH":
        const randomName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          length: 2,
        });
        const createNickname = await User.findByIdAndUpdate(
          userId,
          {
            nickname: randomName,
          },
          { returnDocument: "after", runValidators: true }
        ).where({ userId: session.user.id });

        if (createNickname) {
          response.status(200).json({
            success: true,
            data: createNickname,
          });
        } else {
          response.status(404).json({ error: "Not found" });
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
