# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue before making a change. 

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme used is [SemVer](http://semver.org/).
4. Once the Pull Requests is signed-off the CODEOWNER will merge it for you.

## Git Workflow

### Setup
You should only need to complete this setup once. 

If you'd like now is the time to set up SSH and GPG keys.

1. `git clone` the URL given on the Github repo into a directory of your choice.

### Branches
We will be using the [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/) branching model.

We have **two** evergreen branches (persistent branches). 

- `master` always points to our `latest` release. Merge commits on `master` are always tagged with the version.
- `dev` is the branch you `checkout -b` and pull request merge into. `dev` should always be a `green` build (all checks are green)

We can make **three** types of temporary branches:

- `feat/branch-name`: A feature branch is used for most additions. A feature branch always branches off `dev` or another feature branch.
- `fix/branch-name`: A fix branch is identical to a `feat` branch except it indicates the branch is used only for fixing a bug.
- `hotfix/branch-name`: A hotfix branch is used for **critical** fixes such as high severity security flaws. Hotfixes are always merged directly into `master` and `dev`.

N.B1 Note all these branches are made using `checkout -b` from the appropriate base branch. This naming scheme isn't enforced by Git or Github and is only for clarity.

N.B2 We do not use release branches (we go directly from `dev` to `master` to reduce complexity)
