# Contributing to matic.js

1. [Clone](https://help.github.com/articles/cloning-a-repository/) this repository to your local machine.
2. Checkout new branch to start development `git checkout -b <branch-name>`.

_Branch naming convention:_
- Feature - `feat_custom_token`
- Release/Build - `release_2.1` or `v2.1`
- Fix/Bug - `fix_unknown_token` or `fixes` (if more than one)

_Note: No strict convention while naming branch, but try to keep it meaningful for your team members to understand._

3. Add files to be commited and then commit changes to your local machine `git commit -m <commit-message>`

_Commit message convention:_
- Feature - `feat: integrate token balances`
- Release/Build - `chore: release v2.1` or `chore: bump version to 2.1`
- Fix/Bug - `fix: token balances` or `fix: token list, transfers` (if more than one)

_Note: Keep commit message meaningful for your team members to understand while reviewing merge/pull request._

6. Push changes to remote repository `git push origin <branch-name>`

7. Create a merge/pull request against `master` branch.

_Note: Dont push changes to `master` branch directly. Write proper description of the changes while creating merge/pull request_
