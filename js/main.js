function BorderRow(left, right){
    this.left = left;
    this.right = right;
    this.ptop = 0;
}

function RaceWay(maxRows){
    this.maxRows = maxRows;
    this.rows = [];
    this.counter = 0;
}

RaceWay.prototype.addRow = function(row){
    var count = this.rows.unshift(row);
    if(count>this.maxRows){
        var removed = this.rows.pop();
        $("#bdl"+removed.id).remove();
//        $("#bdr"+removed.id).remove();
    }
};

RaceWay.prototype.update = function(){
    if(this.rows.length === 0){
        var newRow = new BorderRow(40,50);
    }else{
        var lastRow = this.rows[0];
        
        do{
        var action = Math.floor((Math.random()*10) % 3);
        
        if(0 === action){
            var newRow = new BorderRow(lastRow.left-0.25, lastRow.right-0.25);
        }else if(1 === action){
            var newRow = new BorderRow(lastRow.left, lastRow.right);
        }else{
            var newRow = new BorderRow(lastRow.left+0.25, lastRow.right+0.25);
        }
        }while(newRow.left < 0 || newRow.right>100);
    }
    newRow.id = this.counter++;
    this.addRow(newRow);
    var div = "<div class='border box_round' id='bdl" + newRow.id + "'><div class='road'></div></div>";
    $("#content").append(div);
  //  div = "<div class='border' id='bdr" + newRow.id + "'></div>";

    for(var i=0; i<this.rows.length;i++){
        var next = this.rows[i];
        var element = $("#bdl"+ next.id);
        element.css("left", next.left+"%");
        if(i === 0){
            element.css("top","0%");
        }else{
            next.ptop +=1;
            var c = next.ptop +"%";
            element.css("top", next.ptop +"%");
        }

/*
        var elementR = $("#bdr"+ next.id);
        elementR.css("left", next.right+"%");
        if(i === 0){
            elementR.css("top","0%");
        }else{
            elementR.css("top", next.ptop +"%");
        }
*/
    }

};


function updateRaceWay(){
    $.raceWay.update();
}


$(document).ready(function(){
    $.raceWay = new RaceWay(100);
    setInterval(updateRaceWay, 100);
});



