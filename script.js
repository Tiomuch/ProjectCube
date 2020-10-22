class Table {
	constructor(){
		this.rootOfTable = document.querySelector('table');
		this.buttonDeleteLine = document.querySelector('.buttonDeleteLine');
		this.buttonDeleteColumn = document.querySelector('.buttonDeleteColumn');
		this.buttonAddLine = document.querySelector('.buttonAddLine');
		this.buttonAddColumn = document.querySelector('.buttonAddColumn');
		this.tBody = this.rootOfTable.querySelector('tbody');

		this.buttonAddColumn.addEventListener('click', this.addColumn.bind(this));

		this.buttonAddLine.addEventListener('click', this.addLine.bind(this));

		this.rootOfTable.addEventListener('mouseover', this.controlDeleteButtons.bind(this));

		this.rootOfTable.addEventListener('mouseleave', this.timeOut.bind(this));

		this.buttonDeleteLine.addEventListener('click', this.deleteLine.bind(this));

		this.buttonDeleteColumn.addEventListener('click', this.deleteColumn.bind(this));

		this.buttonDeleteColumn.addEventListener('mouseover', this.mouseOnButton.bind(this));

		this.buttonDeleteLine.addEventListener('mouseover', this.mouseOnButton.bind(this));
	}

	addColumn (){
		let arrayOfLinesForAdd = this.rootOfTable.querySelectorAll('tr');
		for(let count = 0; count < arrayOfLinesForAdd.length; count++){
			let cubeNew = document.createElement('td');
			cubeNew.classList.add('column');
			arrayOfLinesForAdd[count].append(cubeNew);
		}
	}

	addLine (){
		let arrayOfLinesForAdd = this.rootOfTable.querySelectorAll('tr');
		let arrayOfColumnsForAdd = arrayOfLinesForAdd[0].querySelectorAll('td');
		let lineNew = document.createElement('tr');
		lineNew.classList.add('line');
		for(let count = 0; count < arrayOfColumnsForAdd.length; count++){
			let cubeNew = document.createElement('td');
			cubeNew.classList.add('column');
			lineNew.append(cubeNew);
		}
		this.tBody.append(lineNew);
	}

	timeOut(){
		this.variableTimeOut = setTimeout(this.hideButtons.bind(this), 400);
	}

	controlDeleteButtons (event){
		if(event.target.nodeName === "TD"){
			this.mouseOnButton();
			this.buttonDeleteLine.style.marginTop = `${event.target.offsetTop}px`;
			this.buttonDeleteColumn.style.marginLeft = `${event.target.offsetLeft}px`;
			this.eventCellIndex = event.target.cellIndex;
			this.eventRowIndex = event.target.parentNode.rowIndex;
		}
	}

	hideButtons (){
		this.buttonDeleteLine.style.display = "none";
		this.buttonDeleteColumn.style.display = "none";
	}

	mouseOnButton (){
		let arrayOfLinesForControl = this.rootOfTable.querySelectorAll('tr');
		let arrayOfColumnsForControl = arrayOfLinesForControl[0].querySelectorAll('td');
		if(arrayOfLinesForControl.length > 1){
			this.buttonDeleteLine.style.display = "inline-block";
		}
		if(arrayOfColumnsForControl.length > 1) {
			this.buttonDeleteColumn.style.display = "inline-block";
		}
		clearTimeout(this.variableTimeOut);
	}

	deleteLine (){
		let arrayOfLinesForDelete = this.rootOfTable.querySelectorAll('tr');
		arrayOfLinesForDelete[this.eventRowIndex].remove();
		this.hideButtons();
	}

	deleteColumn (){
		let cubesInLine;
		let arrayOfLinesForDelete = this.rootOfTable.querySelectorAll('tr');
		for(let count = 0; count < arrayOfLinesForDelete.length; count++){
			cubesInLine = arrayOfLinesForDelete[count].querySelectorAll('td');
			cubesInLine[this.eventCellIndex].remove();
		}
		this.hideButtons();
	}
}

new Table();
