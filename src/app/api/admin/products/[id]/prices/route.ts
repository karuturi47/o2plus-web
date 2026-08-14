import { proxyToJava } from "@/lib/javaProxy";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  return proxyToJava(`/api/admin/products/${id}/prices`, { method: "PUT", body });
}
