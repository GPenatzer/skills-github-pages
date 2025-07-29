const { IExecuteFunctions } = require('n8n-core');
const { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } = require('n8n-workflow');
const { google } = require('googleapis');

class N8nAgentForGoogleSheets {
	description = {
		displayName: 'N8n Agent for Google Sheets',
		name: 'n8nAgentForGoogleSheets',
		group: ['transform'],
		version: 1,
		description: 'An n8n node to interact with Google Sheets',
		defaults: {
			name: 'N8n Agent for Google Sheets',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Credentials',
				name: 'credentials',
				type: 'googleApi',
				default: '',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Read',
						value: 'read',
					},
					{
						name: 'Write',
						value: 'write',
					},
				],
				default: 'read',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Spreadsheet ID',
				name: 'spreadsheetId',
				type: 'string',
				default: '',
				placeholder: '1a2b3c4d5e6f7g8h9i0j',
				description: 'The ID of the spreadsheet.',
			},
			{
				displayName: 'Sheet Name',
				name: 'sheetName',
				type: 'string',
				default: '',
				placeholder: 'Sheet1',
				description: 'The name of the sheet.',
			},
			{
				displayName: 'Data to Write',
				name: 'dataToWrite',
				type: 'string',
				default: '',
				description: 'The data to write to the sheet. Should be a JSON array of arrays.',
				displayOptions: {
					show: {
						operation: [
							'write',
						],
					},
				},
			},
		],
	};

	async execute() {
		const items = this.getInputData();
		let returnData = [];
		const credentials = await this.getCredentials('googleApi');
		const sheets = google.sheets({ version: 'v4', auth: credentials });

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i, 'read');
				const spreadsheetId = this.getNodeParameter('spreadsheetId', i, '');
				const sheetName = this.getNodeParameter('sheetName', i, '');

				if (operation === 'read') {
					const response = await sheets.spreadsheets.values.get({
						spreadsheetId,
						range: sheetName,
					});
					returnData.push(response.data.values);
				} else if (operation === 'write') {
					const dataToWrite = this.getNodeParameter('dataToWrite', i, '');
					const values = JSON.parse(dataToWrite);
					await sheets.spreadsheets.values.append({
						spreadsheetId,
						range: sheetName,
						valueInputOption: 'RAW',
						resource: {
							values,
						},
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

module.exports = {
	node: N8nAgentForGoogleSheets,
};
