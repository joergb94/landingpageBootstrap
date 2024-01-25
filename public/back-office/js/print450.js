//----------------------------------------------------------------------------
//
//  $Id: TextMarkup.js 16224 2011-10-03 21:29:50Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: QR-code
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2011, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------


(function()
{
    // stores loaded label info
    var barcodeLabel;
    var barcodeAsImageLabel;


    // called when the document completly loaded
    function onload()
    {
        var printersSelect = document.getElementById('printersSelect');
        var printButton = document.getElementById('printOneButton');
        var printMultipleButton = document.getElementById('printMultipleButton');
        var message ={
                            type:'warning',
                            text:'No DYMO printers are installed. Install DYMO printers.',
                            title:"Warning!",
                    };

    
        // loads all supported printers into a combo box 
        function loadPrinters()
        {
            var printers = dymo.label.framework.getLabelWriterPrinters();
            if (printers.length == 0)
            {   
                messages(message);
                return;
            }

            for (var i = 0; i < printers.length; i++)
            {
                var printer = printers[i];

                var printerName = printer.name;

                var option = document.createElement('option');
                option.value = printerName;
                option.appendChild(document.createTextNode(printerName));
                printersSelect.appendChild(option);
            }
        }



        printMultipleButton.onclick = function() {
            var printer = $('#printersSelect').val();
             var labes = transaction.take_serial_numbers(); 
             if(printer.length == 0){
                mensageError({title:'Error!',text:'The printer is not selected'});
                return false;
            }
           
            Swal.fire({
                title: "Do you want to print this labels ?",
                text: "The Labels will be print .",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, print it!'
              }).then((result) => {
                if (result.value) {
                    for (let index = 0; index < labes.length; index++) {
                        dataprint(labes[index]); 
                     }  
                }
              })
              
            
        }

        printButton.onclick = function () {
            var printer = $('#printersSelect').val();
            var sn = $('#serialNumber').val();
            var snQ = $('#serialNumberQ').val();

            if(printer.length == 0){
                mensageError({title:'Error!',text:'The printer is not selected'});
                return false;
            }
           
            Swal.fire({
                title: "Do you want to print this label with  sn: "+sn+"?",
                text: "The Label will be print "+snQ+" time(s).",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, print it!'
              }).then((result) => {
                if (result.value) {

                    for (let index = 0; index < snQ; index++) {
                        //console.log(index+'mm'+sn)
                        dataprint(sn); 
                     } 
                    
                }
              })
           
           
       }
        
        
        function dataprint(data)
        {
            try
            {
                if (!barcodeLabel)
                    throw "Load label before printing";

                if (!printersSelect.value)
                    throw "Select printer.";


                barcodeLabel.setObjectText('Barcode',data);
                barcodeLabel.setObjectText('Text',data);
                barcodeLabel.print(printersSelect.value);
                
            }
            catch(e)
            {
                alert(e.message || e);
            }
            $("#printOneButton").prop("disabled",false);
        }


        function getBarcodeLabelXml() {
            
            var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                            <DieCutLabel Version="8.0" Units="twips">\
                                <PaperOrientation>Landscape</PaperOrientation>\
                                <Id>Address</Id>\
                                <PaperName>30252 Address</PaperName>\
                                <DrawCommands>\
                                    <RoundRectangle X="0" Y="0" Width="2081" Height="5040" Rx="370" Ry="370" />\
                                </DrawCommands>\
                                <ObjectInfo>\
                                    <BarcodeObject>\
                                        <Name>Barcode</Name>\
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                                        <LinkedObjectName></LinkedObjectName>\
                                        <Rotation>Rotation0</Rotation>\
                                        <IsMirrored>False</IsMirrored>\
                                        <IsVariable>False</IsVariable>\
                                        <Text></Text>\
                                        <Type>QRCode</Type>\
                                        <Size>Large</Size>\
                                        <TextPosition>None</TextPosition>\
                                        <TextFont Family="Arial" Size="6" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                        <CheckSumFont Family="Arial" Size="6" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                        <TextEmbedding>None</TextEmbedding>\
                                        <ECLevel>0</ECLevel>\
                                        <HorizontalAlignment>Left</HorizontalAlignment>\
                                        <QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />\
                                    </BarcodeObject>\
                                    <Bounds X="331" Y="40" Width="2880" Height="1435" />\
                                </ObjectInfo>\
                                <ObjectInfo>\
                                <TextObject>\
                                  <Name>Text</Name>\
                                  <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                  <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                                  <LinkedObjectName></LinkedObjectName>\
                                  <Rotation>Rotation0</Rotation>\
                                  <IsMirrored>False</IsMirrored>\
                                  <IsVariable>True</IsVariable>\
                                  <HorizontalAlignment>Left</HorizontalAlignment>\
                                  <VerticalAlignment>Middle</VerticalAlignment>\
                                  <TextFitMode>ShrinkToFit</TextFitMode>\
                                  <UseFullFontHeight>True</UseFullFontHeight>\
                                  <Verticalized>False</Verticalized>\
                                  <StyledText/>\
                                </TextObject>\
                                <Bounds X="331" Y="57.9999999999999" Width="650" Height="650" />\
                              </ObjectInfo>\
                            </DieCutLabel>';
            return labelXml;
            
        }

        function getBarcodeAsImageLabelXml() {

            var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                            <DieCutLabel Version="8.0" Units="twips">\
                                <PaperOrientation>Landscape</PaperOrientation>\
                                <Id>Address</Id>\
                                <PaperName>30252 Address</PaperName>\
                                <DrawCommands>\
                                    <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
                                </DrawCommands>\
                                <ObjectInfo>\
                                    <ImageObject>\
                                        <Name>Image</Name>\
                                        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                                        <LinkedObjectName></LinkedObjectName>\
                                        <Rotation>Rotation0</Rotation>\
                                        <IsMirrored>False</IsMirrored>\
                                        <IsVariable>False</IsVariable>\
                                        <ImageLocation/>\
                                        <ScaleMode>Fill</ScaleMode>\
                                        <BorderWidth>0</BorderWidth>\
                                        <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                        <HorizontalAlignment>Left</HorizontalAlignment>\
                                        <VerticalAlignment>Top</VerticalAlignment>\
                                    </ImageObject>\
                                    <Bounds X="331" Y="57.9999999999999" Width="1440" Height="1440" />\
                                </ObjectInfo>\
                            </DieCutLabel>';
            return labelXml;
        }

        function loadLabelFromWeb()
        {                     
            // use jQuery API to load labels

            //$.get("Barcode.label", function(labelXml)
            //{
            barcodeLabel = dymo.label.framework.openLabelXml(getBarcodeLabelXml());
            //}, "text");

            //$.get("BarcodeAsImage.label", function(labelXml)
            //{
            barcodeAsImageLabel = dymo.label.framework.openLabelXml(getBarcodeAsImageLabelXml());
            //}, "text");
        }
        
        loadLabelFromWeb();

        // load printers list on startup
        loadPrinters();
    };

    function initTests()
	{
		if(dymo.label.framework.init)
		{
			//dymo.label.framework.trace = true;
			dymo.label.framework.init(onload);
		} else {
			onload();
		}
	}

	// register onload event
	if (window.addEventListener)
		window.addEventListener("load", initTests, false);
	else if (window.attachEvent)
		window.attachEvent("onload", initTests);
	else
		window.onload = initTests;

} ());