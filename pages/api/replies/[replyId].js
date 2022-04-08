import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";
import Reply from "../../../schemas/Reply";

export default async function handler(request, response) {
  const { replyId } = request.query;

  try {
    connectDb();

    const session = await getSession({ req: request });

    switch (request.method) {
      case "GET":
        const getReply = await Reply.findById(replyId).exec();
        response.status(200).json(getReply);
        break;

      case "PATCH":
        const modifyReply = await Reply.findByIdAndUpdate(
          replyId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        response.status(200).json(modifyReply);
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
