var purchaseObj = {
  height: -1,
  width: -1,
  gauge: 18,
  sheetSizeSquareInches: 24,
  numberPerSheet: -1,
  material: "",
  quantity: 10,
  markupFactor: 1.5,
  design: {
    file: "",
    aspectRatio: -1,
    img: new Image(),
    displayWidth: -1,
    displayHeight: -1,
    displayMaxWidth: 300,
    displayDefaultHeight: 5000,
    boundingBox: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  materialPrices: {
    // $ / oz
    "Aluminum": 13.76,
    "Silver": -1,
    "Gold": -1,
    "Rose Gold": -1,
  },
  metalWeightPerSqIn: {
    // Material: {Gauge: oz / in^2}
    "Gold": { "18": "0.2068", "20": "0.1646", "22": "0.1317", "24": "0.1097" },
    "Silver": { "18": "0.2331", "20": "0.1893", "22": "0.1481", "24": "0.1207" },
    "Rose Gold": { "18": "0.2068", "20": "0.1646", "22": "0.1317", "24": "0.1097" },
    "Aluminum": { "18": "0.2117", "20": "0.1646", "22": "0.1317", "24": "0.1097" },
  },
  updateMetalPrices: function ()
  {
    purchaseObj.materialPrices["Gold"] = 1310.90 * 0.029;  // 58% pure * 5% gold by mass
    purchaseObj.materialPrices["Rose Gold"] = 1310.90 * 0.029;  // 58% pure * 5% gold by mass
    purchaseObj.materialPrices["Silver"] = 15.66 * 0.925; // 92.5% silver by mass
    setPriceStrings();
    return;
    // Grab prices for gold and silver from getMetalPrices.php
    // Prices are formatted as goldPrice,silverPrice
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
      xmlhttp = new XMLHttpRequest();
    }
    else
    {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function ()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        purchaseObj.materialPrices["Gold"] = xmlhttp.responseText.split(",")[0] * 0.029;  // 58% pure * 5% gold by mass
        purchaseObj.materialPrices["Rose Gold"] = xmlhttp.responseText.split(",")[0] * 0.029;  // 58% pure * 5% gold by mass
        purchaseObj.materialPrices["Silver"] = xmlhttp.responseText.split(",")[1] * 0.925; // 92.5% silver by mass
        setPriceStrings();
      }
    }
    xmlhttp.open("POST", "getMetalPrices.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("");
  },
  getSize: function ()
  {
    return this.height * this.width;
  },
  getUnitPrice: function ()
  {
    return 1.02;
    return (this.getSize() * this.metalWeightPerSqIn[this.material][this.gauge] * this.materialPrices[this.material] * this.numberPerSheet).toFixed(2);
  },
}

function getVariants() 
{
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp = new XMLHttpRequest();
  }
  else
  {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function ()
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      console.log(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", "/admin/products/1575248560180/variants/count.json", true);
  xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xmlhttp.send("");
}

function addVariant() 
{
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp = new XMLHttpRequest();
  }
  else
  {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function ()
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      getVariants();
      console.log(xmlhttp.responseText);
    }
  }
  // change this eventually

  xmlhttp.open("POST", "https://d884f03561948f48dcd353d73942b02e:9c1594bc5de7088f0c8b6b308352101d@metal-jewelry-blanks.myshopify.com/admin/products.json", false);
  //xmlhttp.open("POST", "https://d884f03561948f48dcd353d73942b02e:9c1594bc5de7088f0c8b6b308352101d@metal-jewelry-blanks.myshopify.com/admin/products/1575248560180/variants.json", true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.dataType = "json";
  xmlhttp.send(JSON.stringify({
    "product": {
      "title": "Burton Custom Freestyle 1518",
      "body_html": "<strong>Good snowboard!</strong>",
      "vendor": "Burton",
      "product_type": "Snowboard",
      "tags": "Barnes & Noble, John's Fav, \"Big Air\"",
      "price": "100.00"
    }
  }));
}

function setProduct() 
{

}

function setPriceStrings()
{
  // Set prices in the material dropdowns
  var options = document.getElementById("obj-material-input").getElementsByClassName("obj-material-option");
  for (var i = 0; i < options.length; ++i)
  {
    options[i].innerText = options[i].value + " ($" + (purchaseObj.materialPrices[options[i].value] * purchaseObj.metalWeightPerSqIn[options[i].value][purchaseObj.gauge]).toFixed(2) + " / in\u00B2)";
  }
}

function loadDesign(file)
{
  var uploadElement = document.getElementById("design-upload");
  console.log("Loading " + uploadElement.file);
  var img = purchaseObj.design.img;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var svg = document.getElementById("design-display-canvas");
  var svgDoc;
  var reader = new FileReader();
  reader.onloadend = function (e)
  {
    var file = e.target.result;
    canvas.width = 2500;
    canvas.height = 2500;
    purchaseObj.design.file = file;
    purchaseObj.design.img.src = file;
    purchaseObj.design.img.onload = function ()
    {
      // fix this for tall images
      context.drawImage(purchaseObj.design.img, 0, 0, canvas.width, img.height * canvas.width / img.width);
      getBoundingBox(canvas);
      handleSizeChange(document.getElementById("obj-height-input"));
      drawDesign(canvas, document.getElementById("design-display-canvas"));

    }
  }
  reader.readAsDataURL(file);
}

function drawProductImage(itemImageElement) 
{
  if (itemImageElement.src.split(":")[0] != "data")
  {
    var canvas = document.createElement("canvas");
    var canvas2 = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var context2 = canvas2.getContext("2d");
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = itemImageElement.src;
    canvas.width = 2500;
    canvas.height = 2500;
    canvas2.width = 95;
    canvas2.height = 95;
    img.onload = function ()
    {
      context.drawImage(img, 0, 0, canvas.width, img.height * canvas.width / img.width);
      getBoundingBox(canvas);
      if (purchaseObj.design.displayDefaultHeight * purchaseObj.design.aspectRatio > purchaseObj.design.displayMaxWidth)
      {
        purchaseObj.design.displayWidth = 95;
        purchaseObj.design.displayHeight = purchaseObj.design.displayWidth / purchaseObj.design.aspectRatio;
      }
      else
      {
        purchaseObj.design.displayHeight = 60;
        purchaseObj.design.displayWidth = purchaseObj.design.displayHeight * purchaseObj.design.aspectRatio;
      }
      var imageDisplayHeight = purchaseObj.design.displayHeight * (purchaseObj.design.boundingBox.bottom - purchaseObj.design.boundingBox.top) / purchaseObj.design.displayHeight;
      var imageDisplayWidth = purchaseObj.design.displayWidth * (purchaseObj.design.boundingBox.right - purchaseObj.design.boundingBox.left) / purchaseObj.design.displayWidth;

      context2.drawImage(canvas,
        purchaseObj.design.boundingBox.left,
        purchaseObj.design.boundingBox.top,
        purchaseObj.design.boundingBox.right - purchaseObj.design.boundingBox.left,
        purchaseObj.design.boundingBox.bottom - purchaseObj.design.boundingBox.top,
        canvas2.width / 2 - purchaseObj.design.displayWidth / 2, canvas2.height / 2 - purchaseObj.design.displayHeight / 2,
        purchaseObj.design.displayWidth,
        purchaseObj.design.displayHeight);
      itemImageElement.src = canvas2.toDataURL("image/png");
    }
  }
}

function drawDesign(offscreenCanvas, targetCanvas)
{
  // Draw the design stored in purchaseObject.design.file
  if (purchaseObj.design.displayDefaultHeight * purchaseObj.design.aspectRatio > purchaseObj.design.displayMaxWidth)
  {
    purchaseObj.design.displayWidth = purchaseObj.design.displayMaxWidth;
    purchaseObj.design.displayHeight = purchaseObj.design.displayWidth / purchaseObj.design.aspectRatio;
  }
  else
  {
    purchaseObj.design.displayHeight = purchaseObj.design.displayDefaultHeight;
    purchaseObj.design.displayWidth = purchaseObj.design.displayHeight * purchaseObj.design.aspectRatio;
  }
  var canvas = targetCanvas;
  var context = canvas.getContext("2d");
  var img = purchaseObj.design.img;
  var imageDisplayHeight = purchaseObj.design.displayHeight * (purchaseObj.design.boundingBox.bottom - purchaseObj.design.boundingBox.top) / purchaseObj.design.displayHeight;
  var imageDisplayWidth = purchaseObj.design.displayWidth * (purchaseObj.design.boundingBox.right - purchaseObj.design.boundingBox.left) / purchaseObj.design.displayWidth;
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw image at correct size and centered on the canvas
  context.drawImage(offscreenCanvas,
    purchaseObj.design.boundingBox.left,
    purchaseObj.design.boundingBox.top,
    purchaseObj.design.boundingBox.right - purchaseObj.design.boundingBox.left,
    purchaseObj.design.boundingBox.bottom - purchaseObj.design.boundingBox.top,
    canvas.width / 2 - purchaseObj.design.displayWidth / 2, canvas.height / 2 - purchaseObj.design.displayHeight / 2,
    purchaseObj.design.displayWidth,
    purchaseObj.design.displayHeight);
  drawDimensions();
}

function drawDimensions()
{
  var canvas = document.getElementById("design-display-canvas");
  var context = canvas.getContext('2d');
  var barCrossWidth = 10;
  var barPadding = 2;
  context.clearRect(0, 0, canvas.width / 2 - purchaseObj.design.displayWidth / 2, canvas.height);
  context.clearRect(0, canvas.height, canvas.width, -canvas.height / 2 + purchaseObj.design.displayHeight / 2);

  context.beginPath();
  context.moveTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding, canvas.height / 2 - purchaseObj.design.displayHeight / 2);
  context.lineTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding - barCrossWidth, canvas.height / 2 - purchaseObj.design.displayHeight / 2);
  context.moveTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding - barCrossWidth / 2, canvas.height / 2 - purchaseObj.design.displayHeight / 2);
  context.lineTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding - barCrossWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2);
  context.moveTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding, canvas.height / 2 + purchaseObj.design.displayHeight / 2);
  context.lineTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2 - barPadding - barCrossWidth, canvas.height / 2 + purchaseObj.design.displayHeight / 2);

  context.moveTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barPadding);
  context.lineTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barCrossWidth + barPadding);
  context.moveTo(canvas.width / 2 - purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barCrossWidth / 2 + barPadding);
  context.lineTo(canvas.width / 2 + purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barCrossWidth / 2 + barPadding);
  context.moveTo(canvas.width / 2 + purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barPadding);
  context.lineTo(canvas.width / 2 + purchaseObj.design.displayWidth / 2, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + barCrossWidth + barPadding);

  context.font = "15px Arial";
  context.fillText(purchaseObj.height.toFixed(2) + '"', canvas.width / 2 - purchaseObj.design.displayWidth / 2 - 45 - barPadding, canvas.height / 2);
  context.fillText(purchaseObj.width.toFixed(2) + '"', canvas.width / 2 - 20, canvas.height / 2 + purchaseObj.design.displayHeight / 2 + 25 + barPadding);
  context.stroke();
}

function getBoundingBox(canvas)
{
  // Calculate the bounding box for the image as it is drawn on the canvas
  var context = canvas.getContext('2d');
  var data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  var top = canvas.height - 1;
  var bottom = 0;
  var right = 0;
  var left = canvas.width - 1;
  for (var i = 0; i < data.length / 4; ++i)
  {
    // Check if each pixel is not white and not transparent
    if (data[4 * i] + data[4 * i + 1] + data[4 * i + 2] < 760 && data[4 * i + 3] > 0)
    {
      // Check if the pixel exists at an extreme position
      // If it does, save its x- or y-coordinate as appropriate
      var x = i % canvas.width;
      var y = (i - (i % canvas.width)) / canvas.width;
      if (x > right)
      {
        right = x;
      }
      else if (x < left)
      {
        left = x;
      }
      if (y < top)
      {
        top = y;
      }
      else if (y > bottom)
      {
        bottom = y;
      }
    }
  }
  purchaseObj.design.boundingBox.left = left;
  purchaseObj.design.boundingBox.right = right;
  purchaseObj.design.boundingBox.top = top;
  purchaseObj.design.boundingBox.bottom = bottom;
  purchaseObj.design.aspectRatio = (right - left) / (bottom - top);

}

function handleSizeChange(dimensionInput)
{
  // Ensure that the size inputs maintain correct ratios
  // bug: if one input is at max, the other cannot be decreased
  var otherDimension;
  var ratio;
  if (dimensionInput.value > dimensionInput.getAttribute("max")) 
  {
    window.alert('Maximum size is 4"x4"');
    dimensionInput.value = dimensionInput.getAttribute("max");
  }
  else if (dimensionInput.value < dimensionInput.getAttribute("min")) 
  {
    window.alert('Minimum size is 0.1"x0.1"');
    dimensionInput.value = dimensionInput.getAttribute("min");
  }

  if (dimensionInput.id == "obj-width-input")
  {
    otherDimension = document.getElementById("obj-height-input");
    ratio = 1 / purchaseObj.design.aspectRatio;
  }
  else if (dimensionInput.id == "obj-height-input")
  {
    otherDimension = document.getElementById("obj-width-input");
    ratio = purchaseObj.design.aspectRatio;
  }
  if (dimensionInput.value * ratio > otherDimension.getAttribute("max"))
  {
    otherDimension.value = parseFloat(otherDimension.getAttribute("max")).toFixed(3);
    dimensionInput.value = (otherDimension.value / ratio).toFixed(3);
    return;
  }
  else if (dimensionInput.value * ratio < otherDimension.getAttribute("min"))
  {
    otherDimension.value = parseFloat(otherDimension.getAttribute("min")).toFixed(3);
    dimensionInput.value = (otherDimension.value / ratio).toFixed(3);
    return;
  }
  otherDimension.value = (dimensionInput.value * ratio).toFixed(3);
  dimensionInput.value = parseFloat(dimensionInput.value).toFixed(3);
  updateOptionsDisplay();
}

function updateOptionsDisplay()
{
  // Grab values from inputs and update displays
  purchaseObj.height = parseFloat(document.getElementById("obj-height-input").value);
  purchaseObj.width = parseFloat(document.getElementById("obj-width-input").value);
  purchaseObj.gauge = document.getElementById("obj-gauge-input").value.split(" ")[0];
  purchaseObj.material = document.getElementById("obj-material-input").value;
  purchaseObj.quantity = document.getElementById("obj-quantity-input").value;
  purchaseObj.numberPerSheet = Math.floor(purchaseObj.sheetSizeSquareInches / (purchaseObj.height * purchaseObj.width));
  //document.getElementById("obj-size-display").innerText = purchaseObj.height.toFixed(2) + "x" + purchaseObj.width.toFixed(2) + " = " + purchaseObj.getSize().toFixed(2) + " in\u00B2";
  //document.getElementById("obj-unit-price-display").innerText = "Unit Price: $" + purchaseObj.getUnitPrice();
  //document.getElementById("obj-total-price-display").innerText = "Total Price: $" + (purchaseObj.getUnitPrice() * purchaseObj.quantity * purchaseObj.numberPerSheet).toFixed(2);
  //document.getElementById("number-per-sheet").innerText = purchaseObj.numberPerSheet;
  document.getElementById("total-price").innerText = "$" + (purchaseObj.getUnitPrice() * purchaseObj.quantity).toFixed(2);
  setPriceStrings();
  if (purchaseObj.design.file != "")
  {
    drawDimensions();
  }
}

window.onload = function ()
{
  if (window.FileReader)
  {
    var dropzone = document.getElementById("file-drop-area");
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName =>
    {
      window.addEventListener(eventName, function (e) { e.preventDefault(); e.stopPropagation() }, false)
    })
    dropzone.addEventListener("dragover", function () { });
    dropzone.addEventListener("dragenter", function () { });
    dropzone.addEventListener("drop", function (e)
    {
      var transfer = e.dataTransfer;
      loadDesign(transfer.files[0]);
    });
  }
  purchaseObj.updateMetalPrices();
  updateOptionsDisplay();
}