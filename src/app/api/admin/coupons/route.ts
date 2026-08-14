import { proxyToJava } from "@/lib/javaProxy";

export async function GET() {
  return proxyToJava("/api/admin/coupons");
}

export async function POST(request: Request) {
  const body = await request.text();
  return proxyToJava("/api/admin/coupons", { method: "POST", body });
}
