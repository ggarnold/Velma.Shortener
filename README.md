# Velma Link Shortener
Simple link shortener service for Velma.com.

To Setup:

    1. Open PowerShell in main source code folder (e.g. C:\Source\VelmaShortener\)
    2. Run 'npm install' to install all related node modules
    3. If you haven't already, run 'npm install http-server -g' to install simple node web server

To Run:

    1. In main source folder, run 'grunt watch'
    2. In build folder, run 'http-server -p 8082 -a localhost'

To Test:

    Open web browser to http://localhost:8082/#/<linkCode>

    The app will retrieve the code info from Velma's API and redirect to the associated url.

