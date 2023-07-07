# — Check My Attendance —

This repository uses the [`gh-pages`][gh-pages] `npm` package to build and deploy a React application. See a live, interactive version of the website [here][live-website].

## Getting Started: Contributing

### 1. Clone the repository

1. Navigate to the desired directory where the project will be stored.

1. Clone the repository by executing the following command.

   ```bash
   git clone https://github.com/diegobajetti/check-my-attendance.git
   ```

### 2. Install the required dependencies

1. Install the required dependencies by executing the following command.

   ```bash
   npm i
   ```

   > It is assumed that `npm` is already installed. If not, refer to the [official documentation][npm-doc].

### 3. Deploy the React app

1. Commit and push any untracked files to the GitHub repository.

1. Build the app.

   ```bash
   npm run deploy
   ```

   By executing the command above, the [`predeploy`][package-json-predeploy] and [`deploy`][package-json-deploy] scripts will run and the React app will be deployed. Internally, the `predeploy` script creates a distributable version of the app and the `build` script pushes the compiled app to a commit in the [`gh-pages`][gh-pages-branch] branch. The [`gh-pages`][gh-pages] package will deploy the application to the specified [URL][package-json-homepage] whenever the `npm run deploy` command is executed. A [GitHub workflow][github-action] will link the GitHub page with the source files in the `gh-pages` branch, and once it is completed, the deployed app with the newest changes will be reflected [here][live-website].

## Common Issues

### Broken Media Display

More than likely, images and/or videos will not render in the deployed site using common `src` linking:

```html
<img src="./images/img-1.jpg" />
```

Since the website is deployed under the [`homepage`][package-json-homepage] URL, it will not recognize the source file for the image or video using local pathing. To overcome this, follow the steps below to change all `src` linking, depending on the use case. There is a simple command to automate this process further below.

1. Diagnose the type of media.

   1. _Background Image_

      1. Open the `.css` file that imports an image with the `background-image` property.
      1. Change the format of the `url()` value.

         ```css
         * {
           background-image: url("https://diegobajetti.github.io/seg3125_p2.github.io/images/img-1.jpg");
         }
         ```

         > The `url()` value should follow this format: `https://{github_username}.github.io/{repo_name}/{file_path}`

   1. _Image Tag_

      1. Open the `.html` file that utilizes the `<img/>` tag.
      1. Change the format of the `src` attribute.

         ```html
         <img src="./seg3125_p2.github.io/images/img-1.jpg" />
         ```

         > The `src` attribute's value should follow this format: `./{repo_name}/{file_path}`

   1. _Background Video_

      1. Open the `.html` file that utilizes the `<video/>` tag.
      1. Change the format of the `src` attribute.

         ```html
         <video src={"./seg3125_p2.github.io/videos/video-1.mp4"}/>
         ```

         > The `src` attribute's value should follow this format: `{"./<repo_name>/<file_path>"}`

   Alternatively, run the following two commands to match the three cases above:

   ```sh
   cd $(git rev-parse --show-cdup)/src
   ```

   ```sh
   grep -RIlxP --include=\*.{html,css,js} '^.*\b(?:src=|background\-image:).*$'
   ```

   `grep` is a utility for searching strings through multiple text files. Here, it is invoked with the following parameters:

   - `R` — reads all files under each directory, recursively, across all symbolic links
   - `I` — ignore binary files; process a binary file as if it did not contain matching data
   - `l` — print the name of each file for which a match was found
   - `x` — select only those matches that exactly match the whole line
   - `P` — interpret patterns as Perl-compatible regular expressions (PCREs)
   - `--include=` — search only files whose base name matches the pattern
   - Regex — find an explanation for the regular expression [here][regex-example]

1. Create a `.env` file

   1. Navigate to the root of the project.

      ```bash
      cd $(git rev-parse --show-cdup)
      ```

   1. Create a `.env` file.

      ```bash
      touch .env
      ```

   1. Add the following property.

      ```bash
      echo "PUBLIC_URL=." >> .env
      ```

Push these changes to the remote repository and [deploy](#3-deploy-the-react-app) the application. This is not a foolproof method as it requires any `img` and `video` tags to be changed back in order to render the images when running locally. Additionally, it is **important** that these changes are not pushed to the remote repository, and to reference the external repository _before_ [deploying](#3-deploy-the-react-app). That is, change all references to image/video files anytime the application is deployed to the remote as shown above, and back to their original values when running locally.

[gh-pages]: https://github.com/gitname/react-gh-pages
[live-website]: https://diegobajetti.github.io/check-my-attendance/
[npm-doc]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[package-json-homepage]: https://github.com/diegobajetti/check-my-attendance/blob/master/package.json#L4
[package-json-predeploy]: https://github.com/diegobajetti/check-my-attendance/blob/master/package.json#L24
[package-json-deploy]: https://github.com/diegobajetti/check-my-attendance/blob/master/package.json#L25
[gh-pages-branch]: https://github.com/diegobajetti/check-my-attendance/tree/gh-pages
[github-action]: https://github.com/diegobajetti/check-my-attendance/actions
[regex-example]: https://regex101.com/r/iUYcBT/1
