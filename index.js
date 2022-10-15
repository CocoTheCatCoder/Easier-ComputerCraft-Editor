// Get Environment Variables
import dotenv from 'dotenv';
dotenv.config();
const Keys = [process.env.DEVKEY, process.env.USRNAME, process.env.PASSWRD];
// Delete Old Paste and Replace it with new Paste
import fs from 'fs';
import { PasteClient, Publicity, ExpireDate } from 'pastebin-api';
const Directory = fs.readFileSync("./directory.txt",'utf-8');
const client = new PasteClient(Keys[0]);
const token = await client.login(Keys[1], Keys[2]);
    // Delete Old Paste
const deleted = await client.deletePasteByKey({
    userKey: token,
    pasteKey: fs.readFileSync("./log.txt","utf-8").split("/").pop()
});
if (deleted) {
    console.log("Sucessfully deleted old paste");
};
    // Get File which is to be updated, then get content and name
import { createInterface } from "readline";
const Files = fs.readdirSync(Directory);
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let FileName;
let FileContent;
let ChosenFile;
rl.question(`${Files} Choose file to update (Use numbers to select, starting at 0)`, function(answer){
    console.log("Chosen "+answer);
    FileName = answer.split(".").shift();
    ChosenFile = Directory.concat(answer);
    FileContent = fs.readFileSync(ChosenFile, "utf-8");
});
    // Create New Paste
const url = await client.createPaste({
    code: FileContent,
    expireDate: ExpireDate.Never,
    format: "lua",
    name: FileName,
    publicity: Publicity.Public
});
if ("https://pastebin.com/" in url) {
    console.log("Created new paste at "+url);
};
fs.writeFileSync("./log.txt",url);
// Copy ComputerCraft command to clipboard
