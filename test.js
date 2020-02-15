// CLEAR THE SEARCH OBJECT / ADD LIST PARAMETERS (ACTSUBS) FOR NEW SEARCH
searchObj = {
title: "",
filters: {
    url: "",
    retrospective: [2],
    ward_focused: [2],
    indication_focused: [2],
    active_substance: [actSubs],
}
};
// DESTROY ACTSUBS IF NONE IS SELECETED
if (actSubs === "None") {
searchObj['filters']['active_substance'] = "";
}
// MIRROR THE FULL DATA ON THE CONSOLE
let myData = JSON.parse(dataReq.responseText);
console.log(myData);
// SET THE NEW SEARCH DATA ACCORDING TO THE FILTER DATA
if (filterArr[0] === true) {
searchObj['filters']['retrospective'] = [1];
}
if (filterArr[1] === true) {
searchObj['filters']['ward_focused'] = [1];
}
if (filterArr[2] === true) {
searchObj['filters']['indication_focused'] = [1];
}