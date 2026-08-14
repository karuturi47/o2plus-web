import { proxyToJava } from "@/lib/javaProxy";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  return proxyToJava(`/api/admin/coupons/${id}`, { method: "PATCH", body });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToJava(`/api/admin/coupons/${id}`, { method: "DELETE" });
}
