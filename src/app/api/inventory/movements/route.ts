import { proxyToJava } from "@/lib/javaProxy";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") ?? "20";
  return proxyToJava(`/api/inventory/movements?limit=${limit}`);
}
