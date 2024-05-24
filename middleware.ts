import { NextRequest } from "next/server";
import { updateSession } from "./app/lib/session";

export async function middleware(request: NextRequest) {
  // Update the session cookie if reload the page or navigate to another page
  if (request.method === "GET") {
    await updateSession(request);
  }
}