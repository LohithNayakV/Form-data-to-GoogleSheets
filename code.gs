function doPost(e) {
  try {
  var sheet = SpreadsheetApp.openById("1Av965iVE_kcWx-fbNyi_o7M-Dn3BqynTV9qwdCT-UGM").getSheetByName("Sheet1");

    
    if (!e.parameter.name || !e.parameter.email || !e.parameter.phone) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "Missing fields"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

     var currentDate = new Date();
    var formattedDate = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
    var formattedTime = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "HH:mm:ss");


    sheet.appendRow([
      e.parameter.formID,
      formattedDate, 
      formattedTime, 
      e.parameter.name,
      e.parameter.email,
      e.parameter.phone,
      e.parameter["time-in"],
      e.parameter["time-out"],
      e.parameter.location
    ]);


    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
