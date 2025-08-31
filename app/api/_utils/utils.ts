import { NextResponse } from "next/server";

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
