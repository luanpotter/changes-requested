# changes-requested

<img src="https://github.com/luanpotter/changes-requested/workflows/ci-cd/badge.svg?branch=master&event=push" alt="Test" />

This is a GitHub Action to unobtrusively help you manage OSS issues. It works on 3 simple steps!

1. Configure the Action on your repo!
2. Manually tag any issue with a specific label
3. If there are no updates after some time, the issue is closed

## Configuration

To set-up, just add a new workflow to your repo, running this action under a cron.

Create a file under `.github/workflows/changes-requested.yml` with the content (see [here](.github/workflows/changes-requested.yml)):

```yaml
name: changes-requested

on:
  schedule:
    - cron: "0 * * * *" # pick a cron here, this is every 1h
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: luanpotter/changes-requested@master
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## What are updates?

...