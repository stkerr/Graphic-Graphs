/* Grid Dimensions */
verticalMin = 0;
verticalMax = 0;
horizontalMin = 0;
horizontalMax = 0;

/* Relative size of the canvas */
var totalHeight;
var totalWidth;

/* Scaling factors */
var verticalScaleFactor;
var horizontalScaleFactor;

/* Tick increments */
var verticalTickIncrement;
var horizontalTickIncrement;

var horizontalLineCoordinate;
var verticalLineCoordinate;


/*
 * Description: Using the specified JSON object, configures the graph system
 * Prerequisites: None.
 * Arguments: configurationObject - A JSON object detailing the graph parameters
 */
function graphs_config(configurationObject)
{
	/* Perform the mapping from the configuration object to the internal objects */
	verticalMin 	= configurationObject.verticalMin;
	verticalMax 	= configurationObject.verticalMax;
	verticalTickIncrement 	= configurationObject.verticalTickIncrement;
	
	horizontalMin 	= configurationObject.horizontalMin;
	horizontalMax 	= configurationObject.horizontalMax;
	horizontalTickIncrement = configurationObject.horizontalTickIncrement;
}

/*
 * Description: Draws a point on the given canvas
 * Prerequisite: (x,y) is a valid point and the canvas is valid
 * Arguments: (x, y) - the relative coordinates of the point, canvasID - the ID of the canvas
 */
function graphs_drawPoint(x,y, canvasID)
{
    var canvas = document.getElementById(canvasID);
    var context = canvas.getContext('2d');
	
	graphs_internalConfiguration(canvas);
	
    if(x < horizontalMin || x > horizontalMax
        || y < verticalMin || y > verticalMax)
        return;

	context.beginPath();
	context.arc((x + verticalLineCoordinate) * horizontalScaleFactor ,  (horizontalLineCoordinate - y) * verticalScaleFactor, 5, 0, Math.PI * 2, false);
	context.stroke();
	context.fill();
	context.closePath();
}


/*
 * Description: Draws a line on the given canvas
 * Prerequisite: (x1,y1) & (x2,y2) are valid points and the canvas is valid
 * Arguments: (x1,y1) & (x2,y2) - the relative coordinates of the line, canvasID - the ID of the canvas
 */
function graphs_drawLine(x1,y1,x2,y2,canvasID)
{
    var canvas = document.getElementById(canvasID);
    var context = canvas.getContext('2d');
	
	graphs_internalConfiguration(canvas);
/*		
    if(x1 < horizontalMin || x1 > horizontalMax
        || y1 < verticalMin || y1 > verticalMax)
        return;
    if(x2 < horizontalMin || x2 > horizontalMax
        || y2 < verticalMin || y2 > verticalMax)
        return;
*/
	/* Start from the top-left point. */
	context.beginPath();
	context.moveTo((x1 - horizontalMin) * horizontalScaleFactor, (totalHeight-(y1 - verticalMin)) * verticalScaleFactor);
	context.lineTo((x2 - horizontalMin) * horizontalScaleFactor, (totalHeight-(y2 - verticalMin)) * verticalScaleFactor);
	context.stroke();
	context.closePath();
}

/*
 * Description: Given a set of data points, draws lines between all of them
 * Prerequisites: The data points are valid (x,y) coordinates and the canvas is valid
 * ARguments: dataPoints - an array of (x,y) coordinates, canvasID - the canvas to draw on
 */
function graphs_drawDataSet_Lines(dataPoints, canvasID)
{	
	for(var i = 0; i < dataPoints.length-1; i++)
	{
		graphs_drawLine(dataPoints[i][0],dataPoints[i][1],dataPoints[i+1][0], dataPoints[i+1][1],canvasID);
	}
}

/*
 * Description: Using the current configuration, applies the graph stylings to the given canvas
 * Prerequisites: The configuration information is already set up and graphId is a valid canvas element
 * Arguments: graphId - the ID of the canvas element to convert into a graph
 */
function graphs_applyToCanvas(graphId)
{
    var canvas = document.getElementById(graphId);
    var context = canvas.getContext('2d');
		
	graphs_internalConfiguration(canvas);
	
	/* draw horizontal axis */
	if(verticalMin <= 0 && verticalMax >= 0)
	{		
		/* draw the actual axis */
		context.moveTo(0, 				horizontalLineCoordinate * verticalScaleFactor);
		context.lineTo(canvas.width, 	horizontalLineCoordinate * verticalScaleFactor);
		context.stroke();
		
		/* draw ticks on X axis */
		for(i = 0; i < Math.max(horizontalMax,Math.abs(horizontalMin))*2; i=i+horizontalTickIncrement)
		{
			context.beginPath();
			
			context.moveTo((verticalLineCoordinate+i)*horizontalScaleFactor, horizontalLineCoordinate * verticalScaleFactor + 2);
			context.lineTo((verticalLineCoordinate+i)*horizontalScaleFactor, horizontalLineCoordinate * verticalScaleFactor - 2);
			context.stroke();
			
			context.moveTo((verticalLineCoordinate-i)*horizontalScaleFactor, horizontalLineCoordinate * verticalScaleFactor + 2);
			context.lineTo((verticalLineCoordinate-i)*horizontalScaleFactor, horizontalLineCoordinate * verticalScaleFactor - 2);
			context.stroke();
			context.closePath();
		}
	}
	else
	{
	}
	
	/* draw vertical axis */
	if(horizontalMin <= 0 && horizontalMax >= 0)
	{				
		// draw the actual axis
		context.moveTo(verticalLineCoordinate * horizontalScaleFactor,0);
		context.lineTo(verticalLineCoordinate * horizontalScaleFactor,canvas.height);
		context.stroke();
		
		/* draw ticks on Y axis */
		for(i = 0; i < Math.max(verticalMax, Math.abs(verticalMin))*2; i=i+verticalTickIncrement)
		{
			/* draw a tick on the positive side */
			context.beginPath();
			context.moveTo(verticalLineCoordinate * horizontalScaleFactor + 2, (horizontalLineCoordinate + i) * verticalScaleFactor);
			context.lineTo(verticalLineCoordinate * horizontalScaleFactor - 2, (horizontalLineCoordinate + i) * verticalScaleFactor);
			context.stroke();

			
			context.moveTo(verticalLineCoordinate * horizontalScaleFactor + 2, (horizontalLineCoordinate - i) * verticalScaleFactor);			
			context.lineTo(verticalLineCoordinate * horizontalScaleFactor - 2, (horizontalLineCoordinate - i) * verticalScaleFactor);			
			context.stroke();	
			context.closePath();
		}
	}
	else
	{
	}
}

/*
 * Description: Erases a given canvas object
 * Prerequisites: graphId is a valid canvas object
 * Arguments: graphId - the ID of the canvas element to reset
*/
function graphs_resetCanvas(graphId)
{
	var canvas = document.getElementById(graphId);
	canvas.width = canvas.width;
}

/*
 * Description: Using the given configuration settings, configures and applies them to the given canvas
 * Prerequisites: The configuration object and the canvas ID are both valid
 * Arguments: configurationObject - the configuraiton settings, canvasID - the ID of the canvas object
 */
function graphs_configAndApply(configurationObject, canvasID)
{
	graphs_config(configurationObject);
	graphs_applyToCanvas(canvasID);
}

/*
 * Description: An internal function used to configure globals before certain operations take place.
 * Prerequisites: Not being called by the user, but by another function
 * Arguments: None
 */
function graphs_internalConfiguration(canvas)
{
	/* Calculate the total relative width */
	if(horizontalMax < 0)
		totalWidth = Math.abs(horizontalMin) - Math.abs(horizontalMax);
	else if(horizontalMin > 0)
		totalWidth = horizontalMax - horizontalMin;
	else
		totalWidth = Math.abs(horizontalMin) + horizontalMax;
	
	/* Calculate the total relative height */
	if(verticalMax < 0)
		totalHeight = Math.abs(verticalMin) - Math.abs(verticalMax);
	else if(horizontalMin > 0)
		totalHeight = verticalMax  - verticalMin;
	else
		totalHeight = Math.abs(verticalMin) + verticalMax;
		
	/* calculate the scale factor between the physical canvas and the desired dimensions */
	verticalScaleFactor = canvas.height / totalHeight;
		
	/* calculate the scale factor between the physical canvas and the desired dimensions */
	horizontalScaleFactor = canvas.width / totalWidth;
	
	/* Calculate the axis line coordinates - Uses the minimum as a relative offset to the axis */
    if(horizontalMin < 0 && horizontalMax > 0)
        horizontalLineCoordinate = totalHeight - Math.abs(verticalMin);
    else if(horizontalMin > 0)
        horizontalLineCoordinate = verticalMax;
    else
        horizontalLineCoordiante = verticalMin;

    if(verticalMin < 0 && verticalMax > 0)
        verticalLineCoordinate = Math.abs(horizontalMin);
    else if(verticalMin > 0)
        verticalLineCoordinate = horizontalMax;
    else
        verticalLineCoordinate = horizontalMin;
}
