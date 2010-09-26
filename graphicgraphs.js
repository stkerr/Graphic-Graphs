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
 * Description: Using the specified JSON object, configures the graph system
 * Prerequisites: None.
 * Arguments: configurationObject - A JSON object detailing the graph parameters
 */
function graphs_config(configurationObject)
{
	verticalMin 	= configurationObject.verticalMin;
	verticalMax 	= configurationObject.verticalMax;
	verticalTickIncrement 	= configurationObject.verticalTickIncrement;
	
	horizontalMin 	= configurationObject.horizontalMin;
	horizontalMax 	= configurationObject.horizontalMax;
	horizontalTickIncrement = configurationObject.horizontalTickIncrement;
}

/*
 * Description: A function used internally to set up some helper variables
 */
function graphs_internalCalculation()
{
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
	
	/* Calculate the total relative width */
	var totalWidth;
	if(horizontalMax < 0)
		totalWidth = Math.abs(horizontalMin) - Math.abs(horizontalMax);
	else if(horizontalMin > 0)
		totalWidth = horizontalMax - horizontalMin;
	else
		totalWidth = Math.abs(horizontalMin) + horizontalMax;
	
	/* Calculate the total relative height */
	if(verticalMax < 0)
		totalHeight = Math.abs(verticalMin) - Math.abs(verticalMax );
	else if(horizontalMin > 0)
		totalHeight = verticalMax  - verticalMin;
	else
		totalHeight = Math.abs(verticalMin) + verticalMax ;

	/* calculate the scale factor between the physical canvas and the desired dimensions */
	verticalScaleFactor = canvas.height / totalHeight;
		
	/* calculate the scale factor between the physical canvas and the desired dimensions */
	horizontalScaleFactor = canvas.width / totalWidth;
	
	/* Calculate the axis line coordinates - Uses the minimum as a relative offset to the axis */
	var horizontalLineCoordinate = Math.abs(verticalMin);
	var verticalLineCoordinate = Math.abs(horizontalMin);
	
	/* draw horizontal axis */
	if(verticalMin <= 0 && verticalMax >= 0)
	{		
		// draw the actual axis
		context.moveTo(0, horizontalLineCoordinate * verticalScaleFactor);
		context.lineTo(canvas.width, horizontalLineCoordinate * verticalScaleFactor);
		context.stroke();
		
		/* draw ticks on X axis */
		for(i = 0; i < Math.max(verticalMax,Math.abs(verticalMin))*2; i=i+verticalTickIncrement)
		{
			context.moveTo((verticalLineCoordinate+2)*horizontalScaleFactor, (horizontalLineCoordinate+i) * verticalScaleFactor);
			context.lineTo((verticalLineCoordinate-2)*horizontalScaleFactor, (horizontalLineCoordinate+i) * verticalScaleFactor);
			context.stroke();
			
			context.moveTo((verticalLineCoordinate+2)*horizontalScaleFactor, (horizontalLineCoordinate-i) * verticalScaleFactor);
			context.lineTo((verticalLineCoordinate-2)*horizontalScaleFactor, (horizontalLineCoordinate-i) * verticalScaleFactor);
			context.stroke();
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
		for(i = 0; i < Math.max(horizontalMax, Math.abs(horizontalMin))*2; i=i+horizontalTickIncrement)
		{
			/* draw a tick on the positive side */
			
			context.moveTo((verticalLineCoordinate+i) * horizontalScaleFactor, (horizontalLineCoordinate + 2) * verticalScaleFactor);
			context.lineTo((verticalLineCoordinate+i) * horizontalScaleFactor, (horizontalLineCoordinate - 2) * verticalScaleFactor);			
			context.stroke();
			
			context.moveTo((verticalLineCoordinate-i) * horizontalScaleFactor, (horizontalLineCoordinate + 2) * verticalScaleFactor);
			context.lineTo((verticalLineCoordinate-i) * horizontalScaleFactor, (horizontalLineCoordinate - 2) * verticalScaleFactor);			
			context.stroke();
						
			/*
			context.moveTo((horizontalLineCoordinate+2) * horizontalScaleFactor, (verticalLineCoordinate + i) * verticalScaleFactor);
			context.lineTo((horizontalLineCoordinate-2) * horizontalScaleFactor, (verticalLineCoordinate + i) * verticalScaleFactor);			
			context.stroke();
			
			context.moveTo((horizontalLineCoordinate+2) * horizontalScaleFactor, (verticalLineCoordinate - i) * verticalScaleFactor);
			context.lineTo((horizontalLineCoordinate-2) * horizontalScaleFactor, (verticalLineCoordinate - i) * verticalScaleFactor);			
			context.stroke();
			*/
			

			
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