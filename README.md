@coserv/cli
-----------

A command line tool for coServ v1.0. You can use it to create (initialize) web applications and start/stop a coServ server instance. It can help you to save quite a few key strokes. Please note that this command line tool does NOT work with coServ pre-release versions (version &lt; 1.0).

## Prerequisites

Both the CLI and generated project have dependencies that require Node 8.9.0 or higher.

## Install

  npm install -g @coserv/cli

## Usage

To create a new web app:

    cd your_working_directory
    xs create app_name

To start coServ using CLI: stay in your working directory and use the following commands

    # start the service
    xs service

    # stop the service
    xs service stop

    # restart the service
    xs service restart

CLI will start a coServ service at port 4040.

You can simply type **xs** to see help messages.