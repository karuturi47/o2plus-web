import { proxyToJava } from "@/lib/javaProxy";

export async function GET() {
  return proxyToJava("/api/inventory");
}
