
# Getting Started with Material Advanced User Interface (MAUI)

On Windows, install vsts-npm-auth:
`npm i -g vsts-npm-auth`

If the *.npmrc* file is missing, create one in the same root directory as the package.json, and add the following content to the file.

```text
registry=https://pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/registry/
always-auth=true
```

## Windows

From the terminal in Visual Studio Code, run:

`vsts-npm-auth -config .npmrc`

## Mac

Generate a [Personal Access Token](https://dev.azure.com/postaldirect/_usersSettings/tokens) with Packaging read & write scopes. *(Recommend setting it to expire as far out as possible.)*

Create a Base64 encoded Personal Access Token, from the terminal:

```text
node -e "require('readline') .createInterface({input:process.stdin,output:process.stdout,historySize:0}) .question('PAT> ',p => { b64=Buffer.from(p.trim()).toString('base64');console.log(b64);process.exit(); })"
```

Paste your Personal Access Token value and press Enter/Return

Copy the code block:

```text
; begin auth token
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/registry/:username=postaldirect
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/registry/:_password=Nzdsd3M0cTM0emF0ZWt4ajNlNnN2NXU2b3dvdXRqaXVqZnN2dzR0YTVjemlrZHM1cnhqcQ==
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/:username=postaldirect
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/:_password=Nzdsd3M0cTM0emF0ZWt4ajNlNnN2NXU2b3dvdXRqaXVqZnN2dzR0YTVjemlrZHM1cnhqcQ==
//pkgs.dev.azure.com/postaldirect/_packaging/postaldirect/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

Replace *both* [BASE64_ENCODED_PERSONAL_ACCESS_TOKEN] values in your user `.npmrc` file with your encrypted Personal Access Token.

If it doesn't exist, create a *.npmrc* file in your system. *(This is **not** the same as the .npmrc in the project)*

``` bash
vim /Users/MAC_USER_PROFILE/.npmrc
```

Now your are ready!.

## To start development server powered by Storybook

``` bash
npm run start-storybook
```

## Troubleshooting

### Typescript error

**TS(7026)**
This is happening because your Typescript IntelliSense is not working properly. Do either option.
1: Close / reopen your Visual Studio Code.
2: Press (*Windows*: `ctrl + shift + p`) or (*Mac*: `cmd + shift + p`) then search `Typescript:Restart TS server` hit enter.

### Mac

If you get an authentication error during `npm run start`, `npm run start-storybootk`, `npm run install`, etc, re-run the `better-vsts-npm-auth` command and try again.
