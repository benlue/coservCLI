@coserv/cli
-----------

This package is still in testing. Not recommend to install it yet.

## Prerequisites

Both the CLI and generated project have dependencies that require Node 8.9.0 or higher.

## Install

  npm install -g @coserv/cli

## Usage

To create a new web app:

    cd your_target_directory
    xs create app_name

To start coServ using CLI:

    # start the service
    xs service

    # stop the service
    xs service stop

    # restart the service
    xs service restart

CLI will start a coServ service at port 4040.

You can simply type **xs** to see help messages.