import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all posts"), {
      status: 500,
    });
  }
};
