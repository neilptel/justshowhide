# Just show hide
Simple library to show hide HTML elements using data attributes


## Show/Hide HTML elements on Radio button selection:

- Take an action when radio button value is “True”, Add data attribute on “True” option
    - To show: Add data element showdivid as jquery selectors
    - To hide: Add data element hidedivid as jquery selectors
- Take an action when radio button value is “False”, Add data attribute on “False” option
	- To show: Add data element showdivid as jquery selectors
	- To hide: Add data element hidedivid as jquery selectors
  
Sample HTML of radio button
```HTML
    <input data-hidedivid="#divsuv, #divtruck" data-showdivid="#divcar" id="vehicle_Car" name="vehicle" type="radio" >
    <label for="vehicle_Car">Car</label>

    <input data-hidedivid="#divtruck, #divcar" data-showdivid="#divsuv" id="vehicle_Suv" name="vehicle" type="radio" >
    <label for="vehicle_Suv">SUV</label>

    <input data-hidedivid="#divcar, #divsuv" data-showdivid="#divtruck" id="vehicle_Truck" name="vehicle" type="radio">
    <label for="vehicle_Truck">Truck</label>
    
    <div id="divcar" class="hidden">Car</div>
    <div id="divtruck" class="hidden">Truck</div>
    <div id="divsuv" class="hidden">SUV</div>
```


## Show/Hide HTML elements on dropdown item selection:
HTML for dropdown - No change in HTML
```HTML
    <select id="dropdownId">
        <option value="">--Select--</option>
        <option value="1">Car</option>
        <option value="2">SUV</option>
        <option value="3">Truck</option>
        <option value="4">I'm feeling lucky</option>
    </select>

    <div id="divcar" class="hidden">Car</div>
    <div id="divtruck" class="hidden">Truck</div>
    <div id="divsuv" class="hidden">SUV</div>
```

Add config object like below in script tag. 

```javascript 
var ddlShowHideConfiguration = ddlShowHideConfiguration || {
            config: [
                {
                    ddlId: "dropdownId",
                    defaultSetting: {
                        hideDivIds: "#divtruck, #divsuv",
                        showDivIds: "#divcar"
                    },
                    settings: [
                        { selectedText: "Truck", showDivIds: "#divtruck", hideDivIds: "#divsuv, #divcar" },
                        { selectedText: "SUV", showDivIds: "#divsuv", hideDivIds: "#divtruck, #divcar" }]
                }
            ]
        };
```




