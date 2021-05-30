import React from "react"
import "./calculator.css"

class Calculator extends React.Component {
    constructor () {
        super()
        this.state = {value:"", justSolved:false, lastValue:""}
        this.addSymbol = this.addSymbol.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.validateAndSet = this.validateAndSet.bind(this)
        this.clear = this.clear.bind(this)
        this.solve = this.solve.bind(this)
    }

    addSymbol (symbol) {
        var valueToUse = "";
        if (!this.state.justSolved) {
            valueToUse = this.state.value
        }
        var regex = new RegExp(/[^x/+-.]/g)
        var isNonDecimal = new RegExp(/[x/+-]/g)
        var twoDecimalsWithinOneTerm = new RegExp(/\.(\d)*\./)
        if (valueToUse.length === 0) {
            if (symbol === ".") {
                this.setState({value: "0.", justSolved:false})
            }
        }
        else if (regex.test(valueToUse.charAt(valueToUse.length - 1))) {
            if (symbol === ".") {
                if (!twoDecimalsWithinOneTerm.test(valueToUse + symbol)) {
                    this.setState({value: valueToUse + symbol, justSolved:false})
                }
            }
            else {
                this.setState({value: valueToUse + symbol, justSolved:false})
            }
        }
        else if (symbol === "." && isNonDecimal.test(valueToUse.charAt(valueToUse.length - 1))) {
            this.setState({value: valueToUse + "0.", justSolved:false})
        }
        
    }

    addDigit (symbol) {
        var valueToUse = "";
        if (!this.state.justSolved) {
            valueToUse = this.state.value
        }
        this.setState({value: valueToUse + symbol, justSolved:false})
        
    }

    clear () {
        this.setState({value:"", justSolved:false})
    }

    solve () {
        var operationsCheck = new RegExp(/[x/+-]/)
        var brokenDown = [];
        var lastOperation = 0
        for (var i = 0; i < this.state.value.length; i++) {
            if (i===0 && this.state.value.charAt(i) === "-") {
                break;
            }
            if (operationsCheck.test(this.state.value.charAt(i))) {
                brokenDown.push(parseFloat(this.state.value.substring(lastOperation, i)))
                lastOperation = i + 1
                brokenDown.push(this.state.value.charAt(i))
            }
        }
        brokenDown.push(parseFloat(this.state.value.substring(lastOperation)))
        
        console.log(brokenDown)

        if (isNaN(brokenDown[brokenDown.length -1])) {
            brokenDown.pop()
            brokenDown.pop()
        }

        console.log(brokenDown)

        while (brokenDown.indexOf("x") > -1 || brokenDown.indexOf("/") > -1) {
            var mulIndex = brokenDown.indexOf("x")
            var divIndex = brokenDown.indexOf("/")
            var tempArray = []
            if (mulIndex > -1 && divIndex > -1) {
                if (mulIndex < divIndex) {
                    for (var i = 0; i < mulIndex -1; i++) {
                        tempArray.push(brokenDown[i])
                    }
                    tempArray.push(brokenDown[mulIndex-1] * brokenDown[mulIndex+1])
                    for (var i = mulIndex+2; i < brokenDown.length; i++) {
                        tempArray.push(brokenDown[i])
                    }
                }
                else {
                    for (var i = 0; i < divIndex -1; i++) {
                        tempArray.push(brokenDown[i])
                    }
                    tempArray.push(brokenDown[divIndex-1] / brokenDown[divIndex+1])
                    for (var i = divIndex+2; i < brokenDown.length; i++) {
                        tempArray.push(brokenDown[i])
                    }
                }
            }
            else if (mulIndex > -1) {
                for (var i = 0; i < mulIndex -1; i++) {
                    tempArray.push(brokenDown[i])
                }
                tempArray.push(brokenDown[mulIndex-1] * brokenDown[mulIndex+1])
                for (var i = mulIndex+2; i < brokenDown.length; i++) {
                    tempArray.push(brokenDown[i])
                }
            }
            else if (divIndex > -1) {
                for (var i = 0; i < divIndex -1; i++) {
                    tempArray.push(brokenDown[i])
                }
                tempArray.push(brokenDown[divIndex-1] / brokenDown[divIndex+1])
                for (var i = divIndex+2; i < brokenDown.length; i++) {
                    tempArray.push(brokenDown[i])
                }
            }
            else {
                console.log("calculation error!")
                break;
            }

            brokenDown = tempArray
        }

        while (brokenDown.indexOf("+") > -1 || brokenDown.indexOf("-") > -1) {
            var addIndex = brokenDown.indexOf("+")
            var subIndex = brokenDown.indexOf("-")
            var tempArray = []
            if (addIndex > -1 && subIndex > -1) {
                if (addIndex < subIndex) {
                    for (var i = 0; i < addIndex -1; i++) {
                        tempArray.push(brokenDown[i])
                    }
                    tempArray.push(brokenDown[addIndex-1] + brokenDown[addIndex+1])
                    for (var i = addIndex+2; i < brokenDown.length; i++) {
                        tempArray.push(brokenDown[i])
                    }
                }
                else {
                    for (var i = 0; i < subIndex -1; i++) {
                        tempArray.push(brokenDown[i])
                    }
                    tempArray.push(brokenDown[subIndex-1] - brokenDown[subIndex+1])
                    for (var i = subIndex+2; i < brokenDown.length; i++) {
                        tempArray.push(brokenDown[i])
                    }
                }
            }
            else if (addIndex > -1) {
                for (var i = 0; i < addIndex -1; i++) {
                    tempArray.push(brokenDown[i])
                }
                tempArray.push(brokenDown[addIndex-1] + brokenDown[addIndex+1])
                for (var i = addIndex+2; i < brokenDown.length; i++) {
                    tempArray.push(brokenDown[i])
                }
            }
            else if (subIndex > -1) {
                for (var i = 0; i < subIndex -1; i++) {
                    tempArray.push(brokenDown[i])
                }
                tempArray.push(brokenDown[subIndex-1] - brokenDown[subIndex+1])
                for (var i = subIndex+2; i < brokenDown.length; i++) {
                    tempArray.push(brokenDown[i])
                }
            }
            else {
                console.log("calculation error!")
                break;
            }

            brokenDown = tempArray
        }

        console.log(brokenDown)

        var lastVal = this.state.value;
        this.setState({value:brokenDown[0].toString(), justSolved:true, lastValue: lastVal})


        
    }



    validateAndSet (change) {
        var otherSymbols = new RegExp(/[^\dx/+-.]/g)
        var twoSymbolsInRow = new RegExp(/([x/+\-.]{2,})/)
        var symbolsFirst = new RegExp(/(^[+\-/x])/)
        var twoDecimalsWithinOneTerm = new RegExp(/\.(\d)*\./)
        if (!otherSymbols.test(change) && !twoSymbolsInRow.test(change) && !symbolsFirst.test(change) && !twoDecimalsWithinOneTerm.test(change)) {
            this.setState({value: change, justSolved:false})
        }
    }

    render () {
        var numButtons = [];
        for (var i=7; i > 0; i-=3) {
            for (var j = 0; j < 3; j++) {
                numButtons.push(<CalcButton key={i+j} type="number" execute={this.addDigit}>{i+j}</CalcButton>)
            }
        }

        return (
            <div className="Calculator">
                <h1>Simple Calculator</h1>
                <div className="inputBar grid">
                    <InputBox value={this.state.value} setValue={(proposed) => this.validateAndSet(proposed)} enterValue={()=> this.solve()}></InputBox>
                    <CalcButton type="function" execute={this.clear}>C</CalcButton>
                    <div className="button dummy"></div>
                    <CalcButton type="function solve" execute={this.solve}>=</CalcButton>
                </div>
                <div className="numpad grid">
                    {numButtons}
                    <CalcButton type="operation" execute={this.addSymbol}>.</CalcButton>
                    <CalcButton type="number" execute={this.addDigit}>0</CalcButton>
                    <div className="button dummy"></div>
                </div>
                <div className="oppad grid">
                    <CalcButton type="operation" execute={this.addSymbol}>+</CalcButton>
                    <CalcButton type="operation" execute={this.addSymbol}>-</CalcButton>
                    <div className="button dummy"></div>
                    <CalcButton type="operation" execute={this.addSymbol}>x</CalcButton>
                    <CalcButton type="operation" execute={this.addSymbol}>/</CalcButton>
                    <div className="button dummy"></div>
                </div>
            </div>
        )
    }

}

function InputBox (props) {

    return (
        <div className="input-box">
            <input type="text" value={props.value} onKeyPress={function (e) {if (e.key === "Enter") {props.enterValue()} } }onChange={(e) => props.setValue(e.target.value)}></input>
        </div>
    )
}

function CalcButton (props) {
    return (
        <div className={"button " + props.type} onClick={() => props.execute(props.children)}>
            {props.children}
        </div>
    )
}

export default Calculator;

