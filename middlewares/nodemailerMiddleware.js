import nodemailer from 'nodemailer';
import { FetchMonthlyInvoices } from './MonthlyInvoice.js';

export const sendEmail = async (req, res) => {

  const allinvs = await FetchMonthlyInvoices()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: "bz.devoloper@gmail.com",
      pass: "kfwa idol wgig sepv"
    }
  });

  const layout = `
     <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 520px) {
           .u-row {
             width: 500px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 500px !important;
           }
         }
         
         @media (max-width: 520px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
         
         #u_body a {
           color: #0000ee;
           text-decoration: underline;
         }
         
         @media (max-width: 480px) {
           #u_content_image_2 .v-src-width {
             width: auto !important;
           }
           #u_content_image_2 .v-src-max-width {
             max-width: 42% !important;
           }
         }
       </style>
     
     
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:39px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/230581/1714565487652-LOGO.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 303px;"
                                           width="303" class="v-src-width v-src-max-width" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                     <tbody>
                                       <tr style="vertical-align: top">
                                         <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                           <span>&#160;</span>
                                         </td>
                                       </tr>
                                     </tbody>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                   <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: arial,helvetica,sans-serif; font-size: 22px; font-weight: 400;"><span><span>Invoices of month May</span></span>
                                   </h1>
                                   <!--[if mso]></td></tr></table><![endif]-->
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table id="u_content_image_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/230581/1714564051619-9a08e4e9be173cb35fce26aa3fa1e00c.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 42%;max-width: 201.6px;"
                                           width="201.6" class="v-src-width v-src-max-width" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <div style="font-size: 17px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 140%;">All the invoices created on month of May has been sent by VISION-Web Manager.<br>Click the below button to navigate to the invoices</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                   <div align="center">
                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=${allinvs} style="height:44px; v-text-anchor:middle; width:480px;" arcsize="9%"  stroke="f" fillcolor="#000000"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                     <a href=${allinvs}
                                       target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #000000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:100%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                       <span style="display:block;padding:10px 20px;line-height:170%;"><span style="line-height: 23.8px;">View Invoices</span></span>
                                     </a>
                                     <!--[if mso]></center></v:roundrect><![endif]-->
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
     
                                   <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                     <tbody>
                                       <tr style="vertical-align: top">
                                         <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                           <span>&#160;</span>
                                         </td>
                                       </tr>
                                     </tbody>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>
   `;


  const mailOptions = {
    from: "bz.devoloper@gmail.com",
    to: "bezelelb260@gmail.com",
    subject: "VISION Web Manager",
    html: layout
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log("email send")
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
};



export const sendwelcomemail = (req, res) => {
  const { name, email } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: "bz.devoloper@gmail.com",
      pass: "kfwa idol wgig sepv"
    }
  });

  const layout = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
  
        .u-row .u-col {
          vertical-align: top;
        }
  
        .u-row .u-col-100 {
          width: 600px !important;
        }
  
      }
  
      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
  
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
  
        .u-row {
          width: 100% !important;
        }
  
        .u-col {
          width: 100% !important;
        }
  
        .u-col>div {
          margin: 0 auto;
        }
      }
  
      body {
        margin: 0;
        padding: 0;
      }
  
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
  
      p {
        margin: 0;
      }
  
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
  
      * {
        line-height: inherit;
      }
  
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
  
      table,
      td {
        color: #000000;
      }
  
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
  
      @media (max-width: 480px) {
        #u_column_7 .v-col-border {
          border-top: 0px solid transparent !important;
          border-left: 0px solid transparent !important;
          border-right: 0px solid transparent !important;
          border-bottom: 0px solid transparent !important;
        }
      }
    </style>
  
  
  
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://assets.unlayer.com/projects/224626/1711458478593-LOGO.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 32%;max-width: 179.2px;" width="179.2" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                <h2 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 20px; font-weight: 400;"><span><span>Welcome to VISION Quartz Community!</span></span></h2>
                                <!--[if mso]></td></tr></table><![endif]-->
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Thank you for signing up to VISION Quartz.</span></p>
                                  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Experience the beauty of Indian Natural Rosewood Wall clocks </span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                <div align="center">
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:45px; v-text-anchor:middle; width:120px;" arcsize="9%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                  <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                    <span style="display:block;padding:10px 20px;line-height:120%;">Explore Now</span>
                                  </a>
                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div id="u_column_7" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`;

  const mailOptions = {
    from: "bz.devoloper@gmail.com",
    to: email,
    subject: `Welcome ${name} to VISION Quartz Community`,
    html: layout
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
};


export const sendOTP = (req, res) => {
  const { OTP, Email } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: "bz.devoloper@gmail.com",
      pass: "kfwa idol wgig sepv"
    }
  });



  const mailOptions = {
    from: "bz.devoloper@gmail.com",
    to: Email,
    subject: "Your One Time Password for password change - VISION QUARTZ",
    text: `Your One Time Password is ----  ${OTP}  ------`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
};