const barChartDiv =  "#mainbar"
const allBars = '#bars'
const singlebar = [1,2,3,4,5,6,7,8,9,15]

const overTenArr = [5,23,6,7,9]

const longArray = [88,55,11, 4,6,3,8,7,34,49]

// Obj of obj
/*
const testObj = {
  1:{
    values: [88,55,11]
  },
  2:{
    values: [21,69,42]
  },
  3:{
    values: [29,31,52]
  },
  4:{
    values: [4,6,49]
  },
  5:{
    values: [8,7,34]
  }
}
*/

const twoDimArr = [1,2,[3,4], 10]
const bigTwoDim = [[88,55,11],[21,69,42],[29,31,52],[4,6,49]]

// should assign during creation.

const optionsExample = {
  //bar colors
  colour: '#3e13d6',// or list of exact colors for each, same size as data
  // Bar label
  labcolour: 'black', // or list of exact colors same size as data
  // barlab pos
  labPos: 'center',// this should be the llabel position
  // align items, flex-end, flex-start, center

  // Barchart margins, must be in percent string
  spacing: '1%',//0-7.4% spacing
  // main title
  title: 'Example Barchart #1',
  titleVis: true, // toggles if there's a main title at all
  titleCol:'red',
  titleSize:'200',//between 100 and 200%
  // shoudl affect mainbar and yaxis pos top

  //Xlabel
  xlab: 'this is x',
  //y label
  ylab: 'this is y',




}


// event listeners aways need an own function wrapping the
// other processes
function changeText(selector){
  let tempstore = $(selector).text()
  setTimeout(() => {
    $(selector).text(tempstore)}
    , 2000)
  //$(selector).text("I've changed the text, dw it'll return in 2")
  //$(selector).text("We're now gonna create the barchart")


  // Testing for height changer
  /*
  let maxheight = parseInt($('li').css('max-height').substring(0,2))
  let height = (7 / 25) * (maxheight)
  $(selector).text(`height: ${height}%`)
  */
}
// Dom manipulation.
// function makeBarStruct takes a html selector str
// and creates the entire basic structure for makeBarChart
// in that element

// str -> none
// effects: adds a bunch of sections and uls to the html element
const makeBarStruct = (selector) => {
  //Remove everything first
  $("#barchart").remove();


  $(selector).append(`
      <section id = 'barchart'>
        <header >
          <h2 id = 'tbltitle'>This is the main title of the barchart</h2>
        </header>
        <section id = 'mainbar'>
          <!--<h3 id = 'barplacehold'>This is the main graph section</h3>-->
          <ul class = 'ticks'>
            <li class = 'tick'>tick 0</li>
            <li class = 'tick'>tick 1</li>
            <li class = 'tick'>tick 2</li>
            <li class = 'tick'>tick 3</li>
            <li class = 'tick'>tick 4</li>
          </ul>
          <ul id = 'bars'>
            <!--All these should be length based on max-->
            <!--max bar, margin right and left-->
            <li class = 'maxbar'>this is the max bar</li>
            <li class = 'text test'>98</li>
            <li>element 2</li>
            <li>element 3</li>
            <li id = 'array-elem-n'>there doesn't need to be text here</li>
          </ul>
        </section>
        <aside class = 'axis' id = 'yaxis'>
          <h4 id = ytitle>Y axis</h4>
          <section id = 'ylabs'>
            <ul class = ticks>
              <li class = 'tick'>tick 0</li>
              <li class = 'tick'>tick 1</li>
              <li class = 'tick'>tick 2</li>
              <li class = 'tick'>tick 3</li>
              <li class = 'tick'>tick 4</li>
            </ul>
          </section>
        </aside>
        <footer class = 'axis' id = 'xaxis'>
          <h4 id = xtitle>X axis</h4>
          <section id = 'xlabs'>
            <ul class = 'bars'>
            <!--All these should be length based on max-->
            <!--max bar, margin right and left-->
            <li class = 'maxbar'>this is the max bar</li>
            <li class = 'text test'>98</li>
            <li>element 2</li>
            <li>element 3</li>
            <li id = 'array-elem-n'>there doesn't need to be text here</li>
          </ul>
          </section>
        </footer>
      </section>
  `)
}


// Testing button---------------------------------
$(document).ready(() => {
  $("#btn1").click(() => {
    //changeText('#tbltitle')
    //removeBars(allBars)
    drawBarChart(twoDimArr, optionsExample,  '#main-content')
//    setTimeout(() => {
//      addBars(barChartDiv)
//    }, 1000)
  })
  /*$("#btn1").click(function(){
    $('.maxbar').text("I've changed the text")
    //setTimeout($('.maxbar').text("Why so quick"), 5000)
  })*/
  //new fn
});



//Horizontally

  // jQuery methods go here...
// function removebars removes all elements
// from the input section
const removeBars = (section) => {
  $(section + " .ticks").remove();
  $(section + " .bars").remove();

}

// function addBars adds an emptyunordered list to section
// with id = 'bars'
const addBars = (section) => {
  $(section).append(`
  <ul class = 'bars'></ul>
  <li class = barplacehold></li>
  `)
}

//${$('#mainbar').css("top")}


// function addBarElem adds a list item to a list section
// also at that time, adds a variable height value
// based on the value relative to max val
const addBarElem = (section, dataArray, sumArray, width, arrayMax) => {

  for (let i = 0; i < dataArray.length; i++){
    $(section).append(`
    <li class = 'bar currbar${i}'></li>
    `)
    //console.log(arrayMax)
    // Set this bar's height relative to max
    let maxheight = parseInt((($('.bar').css('max-height')).split('%'))[0])
    //console.log(maxheight)
    let height = (sumArray[i] / arrayMax) * (maxheight)
    //console.log(height)
    //console.log(`#currbar${i}`)
    //console.log(`${height}%`)
    $(`${section} .currbar${i}`).css(`height`, `${height}%`)
    // set width in list

    // If element array and not single value
    if (Array.isArray(dataArray[i])){
      //add ul subbar
      let currArr = dataArray[i]
      $(section + ` .currbar${i}`).append(`
      <ul class = 'subbars'></li>
      `)
      // add to subbars
      let currBar = section + ` .currbar${i} .subbars`
      for (let x = 0; x < currArr.length; x++){
        console.log(currBar)
        $(currBar).append(`
          <li class ="subbar subbar${x}">${currArr[x]}</li>
          `)
        // set sub bar heights
        let subHeight = (currArr[x]/sumArray[i]) * 100
        console.log(subHeight)
        $(currBar + ` .subbar${x}`).css(`height`, `${subHeight}%`)
      }
      // If single value
    } else {
      $('#mainbar ' + section + ` .currbar${i}`).text(`${dataArray[i]}`)
    }
  }
  // set all bar widths of list items
  $(section+' .bar').css(`width`, `${width}%`)

}

// funciton makeRange takes a start, an end and
// an step and return an array with the range
// of integers from start to end inclusive
const makeRange = (start, end, step) => {
  ansArr = []
  for (let i =  start; i <= end; i += step){
    ansArr.push(i)
  }
  return ansArr
}

// function getArrayMax returns the maximum number
// of an array
const getArrayMax = (data) => {
  let maxvalue
  for (let elem of data) {
    if (maxvalue === undefined){
      maxvalue = elem
    } else if (elem > maxvalue){
      maxvalue = elem
    }
  }
  return maxvalue
}
// mergeSort function takes an unsorted numeric array and sorts it
// order of smallest to largest
const mergeSort = (workarry) => {
  if (workarry.length <= 1){
    return workarry
  } else {
    //console.log('inpivot')
    let pivotinx = Math.floor(workarry.length / 2)

    let pivotval = workarry[pivotinx]
    //console.log(pivotval)

    let leftarr = workarry.slice(0, pivotinx)

    //console.log('leftarr')
    //console.log(leftarr)
    let rightarr = workarry.slice(pivotinx+1,workarry.length)
    //console.log('rightarr')
    //console.log(rightarr)

    let leftans = []
    let rightans = []

    for (let elem of leftarr){
      if (elem < pivotval){
        leftans.push(elem)
      } else {
        rightans.push(elem)
      }
    }
    for (let elem of rightarr){
      if (elem < pivotval){
        leftans.push(elem)
      } else {
        rightans.push(elem)
      }
    }

    let ans = mergeSort(leftans).concat([pivotval]).concat(mergeSort(rightans))
    return ans
  }
}

const addYTick = (section) => {
  $(section).append(`
  <ul class = 'ticks'></ul>
  <li id = tickplacehold></li>
  `)
}

// function sumArrays takes a array of arrays(inArr) of nums
// and returns an array with the sum of for each array
// in inArr

// arrayOf arrayOf num -> arrayOf num
const sumArrays = (inArr) => {
  let ansArr = []
  for (let elem of inArr){
    if (Array.isArray(elem)){
      let ansSum = 0;
      for (let nums of elem){
        ansSum += nums;
      }
      ansArr.push(ansSum)
    } else {
      ansArr.push(elem)
    }

  }
  return ansArr
}

// function yTicks takes the array of values and adds line
// represented by borders of list elems
// Lines should be evenly spaced according to bar heights
const addYTicks = (section, numOfTick) => {


  for (let i = 0; i< numOfTick; i++){
    $(section).append(`
    <li class = "tick  currtick${i}"></li>
    `)
  }
}

// drawBarChart takes an array of numbers(data) or arraysOf nums, a options object(options)
// and a selector str(element) and adds a bar graph
// showing the values of data into element

// barchart will stack if an array elem is an array

// arrayOf num || objOf arrayOf num, options obj, str -> none
// modifies a js element
const drawBarChart = (data,  options,  element) => {



  //append basic structure to the section/page.
  makeBarStruct(element)

  // test if we have an 2 dimensional object or a single array
  // for dat elem


  //const twoDim = !Array.isArray(data)



  // This is the ordered array, but it's not necessary
  let ordDat
  let max

  // us sumArray for bar dimensions

  let dimArray = sumArrays(data)


  //FInd max in array
  if (ordDat){
    max = ordDat[ordDat.length-1]
    // if there is 2 dimensional data
  } else {
    max = getArrayMax(dimArray)
  }

  // max should be rounded and based on scale tick max
  max = (Math.round(max/5)*5)+5

  console.log(max)
  // height calculator
  let listlen = dimArray.length

  // This is about how high the bars should be
  removeBars('#mainbar')


  // add variable ticks before bars
  addYTick('#mainbar')

  // add y label holders
  removeBars("#ylabs")
  addYTick('#ylabs')
  //$("#yaxis .ylabs ").remove();

  // Add label holders for xlabels
  removeBars('#xlabs')
  addBars('#xlabs')

  //Calc tick height
  let numTicks = max/5
  let stepper = 5;

  if (numTicks <= 4){
    numTicks = max-5
    max = max-5
    stepper = 1
  }
  let ticksArray = []

  ticksArray = makeRange(0, max, stepper)




  //Because of how I'm calculating margin?
  const tickMargin = 0.2
  const tickHeight = (100/numTicks)-tickMargin
  //console.log(tickHeight)

  // Why can't I change the css here?

  //$('.tick').css('margin', `${tickMargin}% 0% 0%`)
  //$('.tick').css('height',`${tickHeight}%`)
  // Add ticks
  addYTicks('.ticks',numTicks)

  //add Bar container
  addBars('#mainbar')

  // if margin is being changed
  let workingMargin = $("li").css("margin")
  if (options.spacing !== undefined){
    workingMargin = options.spacing
    $("li").css("margin", options.spacing)
  }
  //margin should be changed here
  let barWidth = (100 +(parseInt(workingMargin.split('%')[0]) * listlen + 1)) / listlen

  // if main title not visible
  if (options.titleVis === false){
    $('#tbltitle').css('display','none')
    //  move yaxis and mainbar
    $('#mainbar').css('top', '0')
    $('#mainbar').css('height', '90%')

    $('#yaxis').css('top', '0')
    $('#yaxis').css('height', '90%')
  }




  // Add the bars into the bar chart
  if (ordDat) {
    addBarElem('.bars', ordDat, dimArray, barWidth, max)
  } else {
    addBarElem('.bars', data, dimArray, barWidth, max)
  }


  // adding columns for bar labels


  // Customising the graph
  if (Object.keys(options).length> 0) {
    const listItem = '.bars li'

    // bar colour, exclude subbar
    $(listItem+ ':not(.subbar)').css('background-color', options.colour)
    //if has subbar child, transparent
    $(listItem + ":has(.subbar)").css('background-color','transparent')
    //$(listitem).css('background-color', options.labcolour)


    // label colour
    $(listItem).css('color', options.labcolour)

    // Bar margin
    $(listItem).css("margin-right", options.spacing)
    $('.currbar0').css("margin-left", options.spacing)
    // also sets the max height
    //$(listItem).css("max-height", (100 - 2*parseInt(workingMargin.split('%')[0])).toString(10)+'%')

    //console.log($(listItem).css("max-height"))

    // label position in bars
    $(listItem).css("align-items",options.labPos)

    //Bar Main title
    $('#tbltitle').text(options.title)
    $('#tbltitle').css('font-size',options.titleSize)
    $('#tbltitle').css('color',options.titleCol)

        //adding labels to y ticks
    for (let i = ticksArray.length-2; i > 0 ;i--){
      $(`#ylabs .ticks .currtick${ticksArray.length-1 - i}`).text(`${ticksArray[i]}`)
    }
    //adjust ylabel text
    $('#ytitle').text(options.ylab)

    //adjust x labels and adding them
    $(`#xlabs .bars .bar`).css('height', '100%')
    $(`#xlabs .bars .bar`).css('background-color','transparent')
    $(`#xlabs .bars .bar`).css('opacity','1')
    $(`#xlabs .bars .bar`).css('color','black')

    //xtitle
    $('#xtitle').text(options.xlab)

    for (let i = 0; i < data.length; i++){
      $(`#xlabs .bars .currbar${i}`).text(`${i+1}`)
    }
    //$('.tick').css('border-top-width',`${borderHeight}%`)

    //temporary fixes
    //$('.tick').css('margin', `${tickMargin}% 0% 0% 0%`)
    // tick margin/breakboints
    $('.tick').css('margin', `1.016px`)
    $('.tick').css('height',`${tickHeight}%`)
    //tick size
    $('.tick').css('font-size','100%')
    $('#bars').css('display',`none`)

    $(`#ylabs .ticks .tick`).css('background-color','transparent')

  }

}
