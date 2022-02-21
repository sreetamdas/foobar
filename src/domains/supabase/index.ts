import { supabaseClient } from "@/utils/supabaseClient";

export function getSupabaseFileURL(filename: string) {
	return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/storage/v1/object/public/${filename}`;
}

export async function uploadFileToSupabase(
	image: File,
	{ bucket, path } = { bucket: "public", path: "/" }
) {
	return await supabaseClient.storage.from(bucket).upload(`${path}${image.name}`, image);
}
