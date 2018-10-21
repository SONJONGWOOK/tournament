import {aaa} from './comic.js'

console.log(aaa() )

//전체 데이터
let dataList = [ ]
for(let i=0; i<50 ; i++){
    dataList.push( {name : i , path : i})  
}
let test = document.querySelector('#test')
//라운드변수
let totalResult
let roundResult
let isFinalRound
let isfinished
let totalRound = 16
 
//대결변수
let leftObj 
let rightObj
let leftEl = document.querySelector('#leftObj')
let rightEl = document.querySelector('#rightObj')
let roundIndex 
//대진표에 사용될 리스트
let list = []

const _init = () =>{
    totalResult = new Array()
    isFinalRound = false

    //데이터준비
    //기존 모든 데이터 배열을 섞어서 토너먼트 횟수에 따라 다른 배열로 이동
    _shuffleArr(dataList)
    dataList.some( (data , index) =>{
       list.push(data)
       return index >= (totalRound-1)
    })
    _preProcess() 
    //클릭 이벤트
    _addEventLinsten(document.querySelector('#leftObj') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#rightObj') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#back') , 'click' , _prevBettle )

    _startBattle()
}

/*
    대진표 및 라운드 관련 함수
    라운드 및 대진표 준비
    라운드 이동
    라운드 시작
    배틀 상대 표시
*/
//리스트 랜덤섞기 2개씩 묶어서 라운드 대진표 및 총 대진표 만들기
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
    totalResult.push(roundResult)
}

//다음 라운드 이동
const _nextRound = () =>{

    alert("다음라운드")
    
    list = roundResult.map( data =>{
        return data.result
    })
     
    _preProcess()
    _startBattle()        
}

//라운드 시작
const _startBattle = () =>{
    // console.log('시작' , roundIndex)
    // console.log(roundResult)
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
//배틀 상대 표시
const _nextBattle = (leftIn , rightIn)=> {
    leftObj = leftIn
    rightObj = rightIn
    leftEl.innerHTML = leftObj.name
    rightEl.innerHTML = rightObj.name
}

/*
    클릭 이벤트 관련 프로세스
    선택
    뒤로가기
*/

// 선택시 프로세스
const _selectBettle = (e) =>{
    
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

     //결승전시 다음 배틀 시작을 함수 종료
     if(isFinalRound){
        isfinished = true
        console.log(roundResult)
        alert("종료 우승 :"+roundResult[roundResult.length-1].result.name)
        //이벤트 삭제 메서드
        return;
    }

    _startBattle()

}

//뒤로가기기능 
const _prevBettle = (e) =>{
    e.stopPropagation()
    //우승시 더이상 뒤로가지 않게 하는 기능
    if(isfinished) {
        alert("우승나옴")
    }
    
    roundIndex--
    

    if(roundIndex < 0){
        roundIndex=0
        
        if(totalResult.length <= 1){
            alert("하나라도 선택해야함")
            return
        }else{
            
            //넘어가기전에 마지막 배열삭제
            totalResult.pop()
            roundResult = totalResult[totalResult.length-1]           
            roundIndex=roundResult.length-1
            isFinalRound = false
        }
    }
    roundResult[roundIndex] = {
        left : roundResult[roundIndex].left,
        right : roundResult[roundIndex].right
    }
    _startBattle()
}


//대진표 뷰
const _viewTree  = () =>{
    
    let str = ''
    
    totalResult.map( outer => {
        outer.map( data =>{
            let result = data.result !== undefined ? data.result.name : '결과없음'
            str += (data.left.name + ' vs ' + data.right.name +' result ' + result + '   <br>' )
        })
    })
    
    
    str = parseInt(roundResult.length*2)+'강  '+(roundIndex)+"번째 게임  "+leftObj.name + ' vs ' + rightObj.name+"<br>" + str
    test.innerHTML = str
}

/*
    기타 함수들
    이벤트 추가
    배열랜덤 셔플
*/

//이벤트 리스너 추가
const _addEventLinsten = (element , event , handler ) =>{
    element.addEventListener(event , handler )
}

//배열 랜덤 셔플
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

//시작
_init()
