function parseQuery(querystring,parametersArray) {
	
	let array=querystring.split("$");
	//console.log(array.length,parametersArray.length);
	if(array.length -1 == parametersArray.length)
	{
		for(var loopvar=array.length-1;loopvar>=0;loopvar-- )
		{
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

module.exports = {parseQuery};