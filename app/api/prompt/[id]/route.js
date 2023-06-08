import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

// GET (read) a prompt by id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch the prompt"), {
      status: 500,
    });
  }
};

// PATCH (update) a prompt by id
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id).populate("creator");

    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update the prompt"), {
      status: 500,
    });
  }
};

// DELETE a prompt by id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response(JSON.stringify("Prompt deleted successfully"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to delete the prompt"), {
      staus: 500,
    });
  }
};
