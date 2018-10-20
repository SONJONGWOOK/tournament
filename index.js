//전체 데이터
let dataList = [ ]
for(let i=0; i<20 ; i++){
    dataList.push( {name : i , path : i})  
}
let test = document.querySelector('#test')
//라운드변수
let totalResult
let roundResult
let isFinalRound

//대결변수
let leftObj 
let rightObj
let leftEl = document.querySelector('#leftObj')
let rightEl = document.querySelector('#rightObj')
let roundIndex 

//사용될 리스트
let list = []
const _init = () =>{
    //데이터준비
    //기존 모든 데이터 배열을 섞어서 토너먼트 횟수에 따라 다른 배열로 이동
    _shuffleArr(dataList)
    dataList.some( (data , index) =>{
       list.push(data)
       return index >= 7
    })

    _preProcess()

    totalResult = new Array()
    isFinalRound = false
    
    
    //이벤트
    _addEventLinsten(document.querySelector('#leftObj') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#rightObj') , 'click' , _selectBettle )

    _startBattle()
}

//이벤트 리스너 추가
const _addEventLinsten = (element , event , handler ) =>{
    element.addEventListener(event , handler )
}

//배열 셔플
const _shuffleArr = (array) =>{
    let currentIdx = array.length
    let temp
    let randomIdx
    
    while( 0 !== currentIdx ){
        randomIdx = Math.floor(Math.random() * currentIdx)
        currentIdx-=1
        temp = array[currentIdx]
        array[currentIdx] = array[randomIdx]
        array[randomIdx] = temp
    }

    return array
}

const _preProcess = () =>{

    _shuffleArr(list)
    roundResult = new Array() 
    for(let i=0; i<list.length ; i=i+2){
        roundResult.push({
            left : list[i],
            right : list[i+1]
        })
    }
    roundIndex = 0
}

const _saveRoundResult = () =>{

}

const _nextRound = () =>{

    alert("다음라운드")
    totalResult.push(roundResult)
    list = roundResult.map( data =>{
        return data.result
    })
    
      
    _preProcess()

    _startBattle()
        
}

const _startBattle = () =>{
    // console.log('시작' , roundIndex)
    

   if(roundResult.length == 1){
        alert("결승전")
        isFinalRound = true
   }  

   if(roundIndex >= roundResult.length){
        _nextRound()
        return
   }
   
    _nextBattle (roundResult[roundIndex].left   ,roundResult[roundIndex].right)
}

const _nextBattle = (leftIn , rightIn)=> {
    leftObj = leftIn
    rightObj = rightIn
    leftEl.innerHTML = leftObj.name
    rightEl.innerHTML = rightObj.name
}

const _selectBettle = (e) =>{
    // console.log(roundResult)
    // console.log(e.target.id)
    e.stopPropagation()
    let selectObj = e.target.id;
    
    roundResult[roundIndex] = {
        left : leftObj,
        right : rightObj,
        result : selectObj === 'leftObj' ? leftObj : rightObj 
     }
     roundIndex++
     _viewTree()
     if(isFinalRound){
        
        alert("종료 우승 :"+roundResult[roundResult.length-1].result)
        //이벤트 삭제 메서드
        return;
    }

    _startBattle()

}

const _viewTree  = () =>{
    // test.innerHTML = 
    let str = ''
    roundResult.map( data => {
        let result = data.result !== undefined ? data.result.name : '결과없음'
        console.log(result)
        str += (data.left.name + ' vs ' + data.right.name +' result ' + result + '   <br>' )
    })

    totalResult.map( outer => {
        outer.map( data =>{
            let result = data.result !== undefined ? data.result.name : '결과없음'
            str += (data.left.name + ' vs ' + data.right.name +' result ' + result + '   <br>' )
        })
    })

    // console.log(str)
    test.innerHTML = str
}

_init()



