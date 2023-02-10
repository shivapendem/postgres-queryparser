function parseQuery(querystring,parametersArray) {
    
    let str="";
    let array=querystring.split("$");
    //console.log(array.length,parametersArray.length);
    if(array.length -1 ==parametersArray.length)
    {
            for(var loopvar=array.length-1;loopvar>=0;loopvar-- )
            {
                    querystring=querystring.split("$"+(loopvar+1)).join("'"+parametersArray[loopvar]+"'");
            }
            return querystring;
    }
    else
    {
            console.log("invalid query details");
            return "invalid query details";
    }
};
module.exports = {
  parseQuery
}