# linkedinscraper

## Get started:

1. Clone this Repo
2. Open the directory in a terminal
3. Run `npm install`

Each time you want it to run, enter `npm start` in the terminal.

If you experience an error or get stuck, just press `control` + `c` to close the process (or just close the terminal and start over).

The default file path value will put the results in the same folder as all the code.

## Example config

has to reside in the root of the project (same level as this README) and be named `config.json`.
```json
{
    "email": "hello@hello.com",
    "password": "mysecretpassword1",
    "total": 400,
    "initialProfile": "https:linkedin.com/in/whoever",
    "filePath": "./my-data.json",
    "csv": true
}
```
