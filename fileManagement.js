import fs from "fs";

export async function writeFile(path, data) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(`Error writing file at ${path}`);
            return;
        }
    });
}

export function readFile(path) {
    let data = fs.readFileSync(path, { encoding: "utf8" });

    return data;
}

export default { writeFile, readFile };
