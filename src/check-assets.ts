import path from "path"
// imported relatively as this file is imported in next.config.ts
import { ASSETS } from "./constants/assets"
import fs from "fs"

const listFiles = (dir: string) => {
  let results = [] as string[];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory())
      results = results.concat(listFiles(filePath));
    else
      results.push(filePath);
  }
  return results;
}

let foundFiles = listFiles("public")
const notFoundFiles = [] as string[]

Object.entries(ASSETS).forEach(([_, PAGE_ROUTE]) => {
  Object.entries(PAGE_ROUTE).forEach(([_, fileName]) => {
    if (foundFiles.includes("public" + fileName))
      foundFiles = foundFiles.filter(file => file !== "public" + fileName)
    else
      notFoundFiles.push(fileName)
  })
})

if (foundFiles.length > 0) {
  console.warn("Following files are not used in the codebase:")
  foundFiles.forEach(file => console.warn(file))
}

if (notFoundFiles.length > 0) {
  console.error("Following files are not found in the public directory:")
  notFoundFiles.forEach(file => console.error(file))
}
