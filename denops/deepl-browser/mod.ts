import { main } from "https://deno.land/x/denops_std@v0.8/mod.ts";
import { open } from "https://deno.land/x/opener@v1.0.1/mod.ts";

main(async ({ vim }) => {
  vim.register({
    openDeepL: async () => {
      await vim.cmd("silent normal! gvy");
      const content = (await vim.call(
        "getreg",
        await vim.v.get("register"),
        1,
        true,
      )) as Array<string>;

      await open(
        `https://www.deepl.com/translator#en/ja/${
          encodeURI(content.join("\n"))
        }`,
      );
    },
  });

  await vim.execute(`
    command! -range OpenDeepL call denops#request('${vim.name}', 'openDeepL', [])
  `);
});
