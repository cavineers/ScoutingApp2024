# ScoutingApp2024
Scouting App Code for the 2024 FRC Season


## Prerequisites

## for apple users
to install and store the Pypi packages, you need to download miniconda
- [`miniconda`](https://docs.conda.io/projects/miniconda/en/latest/)
NOTE: if you're on an apple M1 computer, download `Miniconda3 macOS Apple M1 64-bit bash` and if you're not, download `Miniconda3 macOS Intel x86 64-bit bash`

1. open up your terminal
   - search: F4 > terminal
2. use the following in order (case sensitive)
   - `cd downloads`
   - `ls -l`
   - then go and find where your miniconda install is located EX: Miniconda3-latest-MacOSX-arm64.sh
   - `./Miniconda-latest(filename)`
        - If you don't have permissions to download it, do the command `chmod +x ./Miniconda…`
   - read through the user agreement, READ IT, and THEN type `yes` in the terminal
   - `eval "(/Users/(name)/miniconda3/bin/conda shell.(name) hook)"`
   - `conda init`
3. install and initialize the pypi packages by making a conda environment in VSCode
   - now that ypu've initialized the download for miniconda, move into VSCode and open a new terminal (ctrl + shift + `)
   - `conda create -n (environment name) python=3.11` we are using python 3.11.3, so be sure to state what python version we're using
   - `conda activate (environment name)` this should've moved you into the environment you've created
4. below this are all of the pypi packages you will need to download, install all of them with the Linux/Apple command (`python3 -m pip install --upgrade Flask google-api-python-client google-auth-httplib2 google-auth-oauthlib waitress`). after you've done that, run the app using `python3 main.py`.
5. after that go into any browser and type `localhost:80` and thats it

if the app gives you an error about a token being missing when you run the python3 command, that means you dont have the apikeys.json file or api token. follow from step 2 to 2b to get that problem resolved. 

(hey, this is max. for now (as in as im still on the team) don't generate a new token. If you need the token just @ me on the discord or in dm's and ill give it to you. if you do end up generating a token, PLEASE send it to me so I can share it to others. if you're not on the discord or know me on discord at all, email me at `maxmaginnis@yahoo.com`. thanks for the cooperation.)
   

### Pypi Packages
- [`Flask`](https://pypi.org/project/Flask)
- [`google-api-python-client`](https://pypi.org/project/google-api-python-client)
- [`google-auth-httplib2`](https://pypi.org/project/google-auth-httplib2)
- [`google-auth-oauthlib`](https://pypi.org/project/google-auth-oauthlib)
- [`waitress`](https://pypi.org/project/waitress)

Install With
- Windows:  &emsp;`py -m pip install --upgrade Flask google-api-python-client google-auth-httplib2 google-auth-oauthlib waitress`
- Linux/Apple: &emsp;`python3 -m pip install --upgrade Flask google-api-python-client google-auth-httplib2 google-auth-oauthlib waitress`

## Setup for Windows & Linux
1. ### Pull repository
   `git pull https://github.com/cavineers/ScoutingApp-GEN`
2. ### Set up Google Sheets API and Credentials
   Follow (most of) this tutorial to help get everything set up: https://developers.google.com/sheets/api/quickstart/python

   2a. Setup OAuth for your Google Cloud Project and put the generated JSON in in file `ScoutingApp-GEN/token.json`

      Diagram:
      ```
      {
         "Sheets OAuth": ...
      }
      ```
      - Sheets OAuth
          - The OAuth JSON generated by Google Cloud
          - type: `dict[str, str]`

   2b. During first runtime, click the OAuth concent link printed to the console
      - If you already did so and have generated the `ScoutingApp-GEN/token.json` file, this file can be moved into other instances of the app to use the same token.
      - Note: The token will eventually expire, so the `token.json` file must be deleted and regenerated with the OAuth concent link, and any copies must be replaced with the new token.

## Run
The following commands must be ran in the repository directory.

<br>

### Quickrun
Quickly run the flask app on `0.0.0.0:80` with
- Windows:  &emsp;`py main.py`
- Linux/Apple: &emsp;`python3 main.py`

### Specify host IP and port
Specify IP and port to host with
- Windows:  &emsp;`py -m ScoutingApp.__main host=<ip> port=<port>`
- Linux/Apple: &emsp;`python3 -m ScoutingApp.__main host=<ip> port=<port>`

## Contact Info
hey, you, yes you, whoever you may be in the future, if you want to contact us or have any questions about the scouting app, do so by emailing us!

&emsp;Max Maginnis : &emsp;`maxmaginnis@yahoo.com`

&emsp;Jake Goodyear : &emsp;`jakengoodyear@gmail.com`

&emsp;Charles Hecker : &emsp;`thecheckerbro2007@gmail.com`

<br>

# Other

Do not delete the coconut -Maginnis and Goodyear
