function parseQuery(querystring,parametersArray) {
	
	let array=querystring.split("$");
	if(array.length -1 == parametersArray.length)
	{
		for(var loopvar=array.length-1;loopvar>=0;loopvar-- )
		{
			if(typeof parametersArray[loopvar] == "object")
				querystring=querystring.split("$"+(loopvar+1)).join("'"+JSON.stringify(parametersArray[loopvar])+"'");
			else		
				querystring=querystring.split("$"+(loopvar+1)).join("'"+refineescapecharacters(parametersArray[loopvar])+"'");
		}
		return replaceAll(querystring,"({[[{()}]]})","$");
	}
	else
	{
		console.log("invalid query details");
		return "invalid query details";
	}
};
function refineescapecharacters(str){
	return replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(str,"$", "({[[{()}]]})"),"\'", "\\\'"),"\"", "\\\""),"'", "\\'"),"\\x00", "\\0"),"\\x1A", "\\Z"),"\t", "\\t"),"\r", "\\r"),"\n","\\n"),"\b","\\b");
}
function replaceAll(str, match, replacement){
	//console.log(str);
	if(isNull(str) || isNull(match) || isNull(replacement))
	{
		return null;
	}
	if(isString(str))
	{
		return str.split(match).join(replacement);
	}
	else
	{
		return str;
	}

}
function isString(value) {
	return Object.prototype.toString.call(value) === "[object String]";
}
function isNull(data) {
	if ((data === null) || (typeof data === 'undefined')) {
		return true;
	}
	return false;
}

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
    console.log(`Argument validation passed: ${args.length} argument(s) match ${placeholderCount} placeholder(s).`);
    return { status: true, query: generateQuery(query, args) };
}

function generateQuery(query, args) {
    let resolvedQuery = query;
    const regex = /\$(\d+)/g;
    resolvedQuery = resolvedQuery.replace(regex, (match, index) => {
        const paramIndex = parseInt(index, 10) - 1; // Convert to 0-based index
        let value = args[paramIndex];
        if (typeof value === 'object' && value !== null) {
            value = `'${JSON.stringify(value)}'`;
        } else if (Array.isArray(value)) {
            value = `'{${value.join(',')}}'`;
        } else if (typeof value === 'string') {
            value = `'${value.replace(/'/g, "''")}'`;
        }
        return value;
    });
    return resolvedQuery;
}

module.exports = {parseQuery, generateQuery};