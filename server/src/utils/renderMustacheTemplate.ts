import Mustache from "mustache";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

export async function renderMustacheTemplate({
  filePath,
  data, // name, inviteUrl
}: {
  filePath: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filepath = path.join(
    __dirname,
    `../../public/templates/${filePath}.hbs`,
  );

  const html = await fs.readFile(filepath);
  const stringfyHTML = html.toString();

  return Mustache.render(stringfyHTML, data);
}
