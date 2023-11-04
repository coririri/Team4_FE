import { fetchInstance } from './instance';

export async function uploadImageToS3(
  presignendUrl: string,
  file: File,
): Promise<{ data: {} }> {
  const response = await fetchInstance.put(
    `${presignendUrl}`,
    file,
  );
  return response.data;
}
