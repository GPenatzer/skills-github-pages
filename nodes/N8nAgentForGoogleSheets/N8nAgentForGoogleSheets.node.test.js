const assert = require('assert');
const N8nAgentForGoogleSheets = require('./N8nAgentForGoogleSheets.node.js');

describe('N8nAgentForGoogleSheets', () => {
	it('should have a description', () => {
		const node = new N8nAgentForGoogleSheets.node();
		assert.ok(typeof node.description === 'object');
	});
});
