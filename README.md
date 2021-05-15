# changes-requested

<img src="https://github.com/luanpotter/changes-requested/workflows/ci-cd/badge.svg?branch=master&event=push" alt="Test" />

This is a GitHub Action to unobtrusively help you manage OSS issues. It works on 3 simple steps!

1. Configure the Action on your repo!
2. Manually tag any issue with a specific label (`changes-requested` by default);
3. If there are no updates after some time (`5` days by default), the issue is closed.

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
        # these are optional, if you want to configure:
        days-until-close: 5
        trigger-label: changes-requested
        closing-comment: This issue was closed by the changes-requested bot due to inactivity.
        dry-run: false
```

## What are updates?

We use the field `updatedAt` of the Issue to determine its staleness. According to my tests, that accounts for:

* new comments
* edits to the issue or to comments
* any other changes, basically.

Therefore, this is a very unobtrusive action. You must first manually add the label. And then if there is absolutely no updates, no edits, no followups, after the determined cutoff date, only them the issue is closed.

This is intended to be a much more lenient version of other similar Actions/Apps, but is still enough to help manage a great portion of all incoming issues.