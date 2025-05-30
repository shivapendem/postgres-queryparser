function parseQuery(querystring, parametersArray) {
	let array = querystring.split("$");
	if (array.length - 1 == parametersArray.length) {
		return parseQueryUpdated(querystring, parametersArray);
	} else {
		return "invalid query details";
	}
};

function generateQuery(query, args) {
	const regex = /\$(\d+)/g;
	let placeholderCount = 0;
	let match;
	while ((match = regex.exec(query)) !== null) {
		placeholderCount++;
	}
	if (args.length !== placeholderCount) {
		return { status: false, message: `Argument validation failed: Expected ${placeholderCount} argument(s), but received ${args.length}.` };
	}
	return { status: true, query: parseQueryUpdated(query, args) };
}

function parseQueryUpdated(query, args) {
	const regex = /\$(\d+)/g;
	return query.replace(regex, (match, index) => {
		const paramIndex = parseInt(index, 10) - 1;
		const value = args[paramIndex];
		if (value === null || value === undefined) {
			return 'NULL';
		} else if (Array.isArray(value)) {
			const formatted = value.map(v => {
				if (v === null || v === undefined) return 'NULL';
				if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
				if (typeof v === 'object') return `'${JSON.stringify(v)}'`;
				return v;
			}).join(',');
			return `ARRAY[${formatted}]`;
		} else if (typeof value === 'object') {
			return `'${JSON.stringify(value)}'`;
		} else if (typeof value === 'string') {
			return `'${value.replace(/'/g, "''")}'`;
		} else if (typeof value === 'boolean') {
			return value ? 'TRUE' : 'FALSE';
		}
		return value;
	});
}

module.exports = { parseQuery, generateQuery };