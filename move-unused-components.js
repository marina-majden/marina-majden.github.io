import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "src");
const componentsDir = path.join(srcDir, "components");
const unusedDir = path.join(__dirname, "unused");

// Ensure directories exist
if (!fs.existsSync(componentsDir)) {
    console.error(`Components directory not found at ${componentsDir}`);
    process.exit(1);
}

if (!fs.existsSync(unusedDir)) {
    fs.mkdirSync(unusedDir);
    console.log(`Created unused directory at ${unusedDir}`);
}

// Helper to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (fullPath !== unusedDir) {
                // Skip the unused folder itself
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            // Only look at code files
            if (/\.(js|jsx|ts|tsx)$/.test(file)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

const allSourceFiles = getAllFiles(srcDir);
const components = fs.readdirSync(componentsDir);

components.forEach((component) => {
    const componentPath = path.join(componentsDir, component);
    const componentName = path.parse(component).name;

    // Skip index files or non-component files if necessary
    if (componentName === "index" || component.startsWith(".")) return;

    let isUsed = false;

    // Check if the component name appears in any other source file
    for (const file of allSourceFiles) {
        if (file === componentPath) continue; // Don't check the file against itself

        if (!fs.existsSync(file)) continue; // Skip files that were moved in previous iterations
        const content = fs.readFileSync(file, "utf-8");
        // Heuristic: check if the component name (e.g. "Header") is present in the file content
        if (content.includes(componentName)) {
            isUsed = true;
            break;
        }
    }

    if (!isUsed) {
        console.log(`Moving unused component: ${component}`);
        const destPath = path.join(unusedDir, component);
        fs.renameSync(componentPath, destPath);
    }
});

console.log("Finished checking for unused components.");
