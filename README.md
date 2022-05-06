# alfred-coder

> Alfred workflow to start/stop workspaces on Coder

![Alfred search example](images/alfred-search.png)

## Installation

1. Download [zip](https://github.com/zpthree/alfred-coder/archive/refs/heads/master.zip)
2. Unzip
3. Double-click alfred-coder.alfredworkflow and import to Alfred
4. Right-click on the workflow and select "Open in Terminal"
5. Install dependencies by running npm install
6. Copy example.env to .env and assign values to all the variables

```
cp example.env .env
nano .env
```

## Requirements

You will need to have the [coder cli](https://github.com/coder/coder-cli) installed and configured. You will also need to create a coder api key by running the following command in your terminal:

```
coder tokens create api_key
```

## Usage

Search for a workspace with the `coder` or `cdr` keywords. Select the workspace to start/stop it.

You can pass the `-stop` flag to show all workspaces that are currently on and you can select one to it shutdown.

```
cdr -stop
```

You can pass the `-url` flag to show all workspaces that are currently on and you can select one to open the url in the browser.

```
cdr -url
```

You can pass the `-stopall` flag to stop all workspaces that are currently on.

```
cdr -stopall
```

In the `Run Script` action you can set the browser to whatever browser you want to use. I have it set to `Firefox Developer Edition`.

```
open -a "Firefox Developer Edition" $url
```

## References

- Coder Workspaces API - https://apidocs.coder.com/#operations-tag-Workspaces
- Coder CLI - https://github.com/coder/coder-cli
