const fs = require("fs");
const path = require("path");

const ANTORA_DIR = "antora/build/docs/reference";
const SITEMAP_PATH = "build/sitemap.xml";

const SITE_URL = "https://developer.riscv.org";

function scan(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      results = results.concat(scan(full));
    } else if (file.endsWith(".html")) {
      results.push(full);
    }
  });

  return results;
}

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error("sitemap.xml not found. Run `yarn build` first.");
  process.exit(1);
}

const files = scan(ANTORA_DIR);

let sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");

const existingUrls = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
);

const urls = files
  .map((file) => {
    let route = file
      .replace(/\\/g, "/")
      .replace("antora/build", "")
      .replace("index.html", "")
      .replace(".html", "");

    route = route.replace(/\/$/, "");

    if (!route || route.endsWith("-")) return null;

    const fullUrl = `${SITE_URL}${route}`;

    if (existingUrls.has(fullUrl)) return null;

    return `
  <url>
    <loc>${fullUrl}</loc>
  </url>`;
  })
  .filter(Boolean)
  .join("");

sitemap = sitemap.replace("</urlset>", urls + "\n</urlset>");

fs.writeFileSync(SITEMAP_PATH, sitemap);

console.log("Antora routes added to sitemap.");