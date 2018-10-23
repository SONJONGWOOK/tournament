/*
    이상형 월드컵
    comic.js 케릭터 데이터
    tree.js 대진표 모듈
    util.js 유틸리티
*/

import {onepiece} from './comic.js'
import {_bracketBuild} from './tree.js'
import {_shuffleArr , _addEventLinsten , _removeEventLinsten} from './util.js'
import vs from '../img/vs1.png'
import logo from '../img/oneicon.png'


//전체 데이터 - 이상형 종류 선택 현재 1개
let dataList = onepiece()

let test = document.querySelector('#test')
let img = document.querySelector('#img')
//라운드변수
let totalResult
let roundResult
let isFinalRound
let isfinished
let totalRound
let roundInfo
 
//대결변수
let leftObj 
let rightObj
let leftImg 
let rightImg
let centerImg
let leftEl 
let rightEl
let roundIndex 

//대진표에 사용될 리스트
let list

//페이지 상단 준비
const _pageStartUp = () =>{
    let openModal = document.querySelector('.modalDialog')
    let selectRound = document.querySelector('#roundSelect')
    let startBtn = document.querySelector('#start')
    let history = document.querySelector('#history')
    let historyClose = document.querySelector('.close')
    let titleLogo = document.querySelector("#logo") 
    let blockOverlay = document.querySelector('.blockOverlay')       
    let objOption = document.createElement("option")        

    let totalItem = dataList.length
    //최소라운드
    let minRound = 8
    let maxRound = 0
    //기본값 16강 
    totalRound = 16
    let i=1
    
    titleLogo.src = logo
    titleLogo.style.width  = '2rem';
    titleLogo.style.height  = '2.5rem';
    
    //최대라운드는 아이템 요소의 갯수를 판별하여 결정
    while(maxRound < totalItem){
        maxRound = Math.pow(2, i++)
        if(minRound > maxRound) continue
        objOption = document.createElement("option");
        objOption.text = maxRound + "강"    
        objOption.value = maxRound
        selectRound.options.add(objOption)
    }
    //히스토리 view
    _addEventLinsten( history , 'click' , (e) =>{

        if(openModal.style.display == "block" ){
            openModal.style.display = "none"
            blockOverlay.style.display='none'
        }else{
            openModal.style.display = "block"
            blockOverlay.style.display='block'
        }
             
    })
    _addEventLinsten( historyClose , 'click' , (e) =>{
       
        blockOverlay.style.display='none'
        openModal.style.display = 'none'
    })
    
    //셀렉트박스값 변경
    _addEventLinsten( selectRound , 'change' , (e) =>{ 
        totalRound =  e.target.value
    })
    //시작
    _addEventLinsten(startBtn , 'click' , (e) =>{
        
        if(isFinalRound == false && isfinished != true){
            alert("아직 게임이 종료되지않았습니다. ")
            return
        }

        if( selectRound.value == undefined ||  selectRound.value == '') {
            alert("라운드 미선택시 "+totalRound +'강 으로 시작 합니다.')
        }
        _init()
    })       

}

//게임 초기 설정
const _init = () =>{
    leftImg = document.querySelector('#leftImg')
    rightImg = document.querySelector('#rightImg')
    centerImg = document.querySelector('#centerImg')
    leftEl = document.querySelector('#leftObj')
    rightEl = document.querySelector('#rightObj')
    roundInfo = document.querySelector('#roundInfo')
    
    totalResult = new Array()
    isFinalRound = false
    isfinished = false
    //데이터준비
    //기존 모든 데이터 배열을 섞어서 토너먼트 횟수에 따라 다른 배열로 이동
    _shuffleArr(dataList)
    list = []
    dataList.some( (data , index) =>{
       list.push(data)
       return index >= (totalRound-1)
    })
    _preProcess() 

    //클릭 이벤트
    _addEventLinsten(document.querySelector('#leftImg') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#rightImg') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#leftImg') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#rightImg') , 'click' , _selectBettle )
    _addEventLinsten(document.querySelector('#back') , 'click' , _prevBettle )
    centerImg.src = vs 
    _startBattle()
    let main = document.querySelector('.wrapper')
    main.style.display='flex'
    
}

const _end = () =>{
    _bracketBuild(totalResult)
    _removeEventLinsten(document.querySelector('#leftImg') , 'click' , _selectBettle )
    _removeEventLinsten(document.querySelector('#rightImg') , 'click' , _selectBettle )
    _removeEventLinsten(document.querySelector('#back') , 'click' , _prevBettle )
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
    
    list = roundResult.map( data =>{
        return data.result
    })     
    _preProcess()
    
    _startBattle()        
}

//라운드 시작
const _startBattle = () =>{
    
    _bracketBuild(totalResult)
    
   let roundCount =  parseInt(roundResult.length*2) 
   roundInfo.innerHTML = roundCount === 2 ? '결승전 ' : roundCount+'강 '+(roundIndex+1)+"번째 라운드"
   if(roundResult.length == 1){
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

    leftImg.src = leftObj.path
    rightImg.src = rightObj.path

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
        result : selectObj === 'leftImg' ? leftObj : rightObj 
     }
     
     roundIndex++
       

     //결승전시 다음 배틀 시작을 함수 종료
     if(isFinalRound){
        isfinished = true
        alert("우승 :"+roundResult[roundResult.length-1].result.name)
        //이벤트 삭제 메서드
        _end()
        return
    }

    _startBattle()

}

//뒤로가기기능 
const _prevBettle = (e) =>{
    e.stopPropagation()
    //우승시 더이상 뒤로가지 않게 하는 기능
    if(isfinished) {
        alert("우승자가 나왔기에 뒤로 가지 못합니다.")
        return
    }
    
    roundIndex--
    

    if(roundIndex < 0){
        roundIndex=0
        
        if(totalResult.length <= 1){
            alert("하나라도 선택 해야 합니다.")
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

_pageStartUp()