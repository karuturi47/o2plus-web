import { proxyToJava } from "@/lib/javaProxy";

export async function POST(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const body = await request.text();
  return proxyToJava(`/api/inventory/${productId}/adjust`, { method: "POST", body });
}
