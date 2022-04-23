import pkg from "../../package.json" assert { type: "json" };
import fs from "fs";

fs.writeFile(
    "./index.html",
    `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0;url=docs/hybrid-object/${pkg.version}/index.html" />
</head>
</html>`,
    (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    }
);
