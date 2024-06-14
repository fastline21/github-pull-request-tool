## About

The goal of this tool is to provide a list of pull requests that are closed or merged and sort it by merged date. Since Github Pull Request doesn't have the functionality to sort the pull request by merged date, I created one. Using Next.js as Full Stack (Frontend for UI and Backend for API calls). So using Personal Access Token which is generated in the GitHub Account, will be used as a credential to access the pull request in a repository. This app will only work in an organization repository, but in the future, I will update it to become flexible.

## Disclaimer

-   Any information or details of the user's input and response from Github is not stored in any database or file.
-   Check `repo` in the Generate Token in order to work the Personal Access Token.

#### Environment Variables

```
GITHUB_API_BASE_URL={{ Github API Base URL }}
NEXT_PUBLIC_SITE_TITLE={{ Title of Project (Github Pull Request Tool) }}
```

#### Script

```
npm run dev
```
