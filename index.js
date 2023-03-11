function parseQuery(querystring,parametersArray) {
    
    let array=querystring.split("$");
    //console.log(array.length,parametersArray.length);
    if(array.length -1 == parametersArray.length)
    {
        for(var loopvar=array.length-1;loopvar>=0;loopvar-- )
        {
            querystring=querystring.split("$"+(loopvar+1)).join("'"+refineescapecharacters(parametersArray[loopvar])+"'");
        }
        return querystring;
    }
    else
    {
        console.log("invalid query details");
        return "invalid query details";
    }
};
function refineescapecharacters(str){
   return replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(replaceAll(str,"\'", "\\\'"),"\"", "\\\""),"'", "\\'"),"\\x00", "\\0"),"\\x1A", "\\Z"),"\t", "\\t"),"\r", "\\r"),"\n","\\n"),"\b","\\b");
}
function replaceAll(str, match, replacement){
    //console.log(str);
   return str.split(match).join(replacement);
}

module.exports = {parseQuery};