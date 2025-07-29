# n8n Agent for Google Sheets

This is an n8n node to interact with Google Sheets. It allows you to read and write data to a Google Sheet from your n8n workflows.

## Prerequisites

Before you can use this node, you need to have a Google Cloud Platform project with the Google Sheets API enabled. You also need to create a service account and download the JSON credentials file.

## Setup

1.  **Install the node:** Copy the `N8nAgentForGoogleSheets` directory to the `nodes` directory of your n8n installation.
2.  **Configure the node:**
    *   Add the "N8n Agent for Google Sheets" node to your workflow.
    *   Create a new "Google API" credential and upload your service account's JSON file.
    *   Select the desired operation (`Read` or `Write`).
    *   Enter the `Spreadsheet ID` and `Sheet Name`.
    *   If you are using the `Write` operation, enter the data to be written in the `Data to Write` field. The data should be a JSON array of arrays, where each inner array represents a row.

## Operations

### Read

The `Read` operation reads all the data from the specified sheet and returns it as a JSON array of arrays.

### Write

The `Write` operation appends the specified data to the sheet. The data should be provided as a JSON array of arrays.

## Example

Here is an example of how to use the `Write` operation to add two rows of data to a sheet:

```json
[
  ["Name", "Email"],
  ["John Doe", "john.doe@example.com"]
]
```
