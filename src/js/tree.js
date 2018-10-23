/*
    트리 대진표 작성
*/
let left = document.querySelector('.bracket-left')
let right = document.querySelector('.bracket-right')
let total 


/*
* 엘리먼트 생성
* 마지막 엘리먼트 생성
*/

//엘리먼트 생성
const _buildEl = (addEl , isRight) =>{
    let className =''
    if(isRight){
        className = '-right'
    }
    let groupTop = document.createElement("div")
    let groupDivider = document.createElement("div")
    let groupBottom = document.createElement("div")
    groupTop.classList.add('group-team' , 'group-team-top'+className)
    groupDivider.classList.add('group-team' , 'group-team-divider'+className)
    groupBottom.classList.add('group-team' , 'group-team-bottom'+className)

    addEl.appendChild(groupTop)
    addEl.appendChild(groupDivider)
    addEl.appendChild(groupBottom)
}

//마지막 엘리먼트는 1개 엘리먼트 
const _lastBuildName = (groupArr , isRight , name) =>{
    
    let group =document.createElement("div")
    group.classList.add('group')
    let addGroup = group.cloneNode(true)

    let className =''
    if(isRight){
        className = '-right'
        
    }

    let groupTop = document.createElement("div")
    groupTop.classList.add('group-team' , 'group-team-top'+className)
    groupTop.innerHTML = name


    addGroup.appendChild(groupTop)
    groupArr.appendChild(addGroup)
}


/*
    대진표가 라운드 올라가면서 랜덤으로 변경
    변경된 대진표를 상위부터 내려가면서 리스트 생성
    L,R 형태를 맞춰서 리스트 생성
*/
const _fixedList = (list) =>{
    let listsize = list.length-1
    let fixList = []
    let last =list[listsize]
    fixList.push(last)   
     
    for(let i= listsize ; i>0 ; i--){
        let dData  = []
        let preRound = list[i-1]
        let arr = [preRound.length]   
        let k=0
        let j=0
        list[i].map( data =>{
            dData.push(data.left.name)
            dData.push(data.right.name)
        })     

        //상위 라운드의 데이터와 하위 라운드의 데이터를 비교한다.
        while(true){
            if(dData[k] == preRound[j].left.name || dData[k] == preRound[j].right.name){
                arr[k] = preRound[j]
                k++
            }
            j++
            if(j >= preRound.length) j=0    
            if(k>=dData.length){
                //데이터 변경하고 교체
                list[i-1] = [...arr]
                break;
            }

        }

        fixList.unshift(arr)
    }
    total=fixList
}


//엘리먼트에 대전 상대 이름 넣기
const _buildName = (groupArr ,roundData , group) =>{
   
    let addGroup =group.cloneNode(true)
    addGroup.childNodes[0].innerHTML = roundData.left.name
    addGroup.childNodes[2].innerHTML = roundData.right.name       
    
    //승자컬러변경
    if(roundData.result != undefined ){
        if(roundData.left.name == roundData.result.name){
            addGroup.childNodes[0].style.color   = "blue";
        }else{
            addGroup.childNodes[2].style.color  = "red";
        }
    }


    groupArr.appendChild(addGroup)
}



const _bracketBuild = (list) =>{
    total = []
    document.querySelector('#winner').innerHTML = " "
    //라운드 올라갈때마다 엘리먼트 하위 노드 초기화
    while ( left.hasChildNodes() ){
        left.removeChild (left.firstChild)
    }
    while ( right.hasChildNodes() ){
        right.removeChild (right.firstChild)
    }
      
    //좌우 그룹 따로 생성
    let groupLeft = document.createElement("div")
    groupLeft.classList.add('group')
    let groupRight = document.createElement("div")
    groupRight.classList.add('group')
    

    _buildEl(groupLeft , false)
    _buildEl(groupRight , true)
    _fixedList(list)
     
    total.map( (inner , index) =>{
        let leftRound =document.createElement("div")
        let rightRound =document.createElement("div")
        leftRound.classList.add('round')
        rightRound.classList.add('round')


        inner.map ( (data , index)  =>{
            
            //대전은 1쌍씩 하다 마지막 라운드는 1번의 대전이기때문에 이때 결승관련된 엘리먼트를 생성
            if(inner.length == 1){
                _lastBuildName(leftRound , false , data.left.name)
                _lastBuildName(rightRound , true , data.right.name)
                if(data.result != undefined){
                    document.querySelector('#winner').innerHTML  = data.result.name 
                    data.result.name == data.left.name  ? document.querySelector('#winner').style.color="blue" : document.querySelector('#winner').style.color="red" 
                }

                return
            }

            //L R 반씩
            if( index < inner.length / 2 ){
                _buildName(leftRound, data, groupLeft)
            }else{
                _buildName(rightRound, data, groupRight)
            }       
        })
        
         left.appendChild(leftRound)       
         right.appendChild(rightRound)

    })   
}
export {_bracketBuild}
export {output}


