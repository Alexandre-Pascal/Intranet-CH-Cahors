import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello - GET" });
}

export async function POST(request) {
  const res = await request.json();
  console.log(res);
  return NextResponse.json({ data: res });
}

export async function PUT() {
  return NextResponse.json({ message: "Hello - PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello - DELETE" });
}