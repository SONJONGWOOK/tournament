
let left = document.querySelector('.bracket-left')
let right = document.querySelector('.bracket-right')
let total 

const _output  = () => {
            
    let bracket = document.querySelector('#bracket')
    let leftBracket = document.querySelector('.bracket-left')
    let rightBracket = document.querySelector('.bracket-right')
    
    left.map( node =>{
        leftBracket.appendChild(node)
    })

    right.map( node =>{
        rightBracket.appendChild(node)
    })

    console.log(bracket)
    
    
}

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

const _fixedList = (list) =>{
    let listsize = list.length-1
    let fixList = []
    let last =list[listsize]
    fixList.push(last)   
     
    for(let i= listsize ; i>0 ; i--){
        let dData  = []
        let preRound = list[i-1]
        let arr = [preRound.length]
        console.log('arr 길이' , arr.length)
        let k=0
        let j=0
        list[i].map( data =>{
            dData.push(data.left.name)
            dData.push(data.right.name)
        })     
        while(true){
            if(dData[k] == preRound[j].left.name || dData[k] == preRound[j].right.name){
                //이부분 
                
                // console.log(dData[k] , preRound[j].left.name , preRound[j].right.name)
                // arr.push(preRound[j])
                arr[k] = preRound[j]
                
                k++
            }

            j++
            if(j >= preRound.length) j=0    
            if(k>=dData.length){
                // preRound = []
                list[i-1] = [...arr]
                console.log('교체' , arr)
                console.log(list)
                break;
            }

        }

        fixList.unshift(arr)
    }
    console.log(fixList)
    total=fixList
}


const _buildName = (groupArr ,roundData , group) =>{
   
    let addGroup =group.cloneNode(true)
  
    addGroup.childNodes[0].innerHTML = roundData.left.name
    addGroup.childNodes[2].innerHTML = roundData.right.name
 
    // groupArr[groupArr.length-1].childNodes[0].innerHTML = roundData.left.name
    // groupArr[groupArr.length-1].childNodes[2].innerHTML = roundData.right.name
    
    // let round =document.createElement("div")
    // round.classList.add('round')
    // round.appendChild(addGroup)
        
    groupArr.appendChild(addGroup)
}



const _bracketBuild = (list) =>{
    total = []
    document.querySelector('#winner').innerHTML = " "
    while ( left.hasChildNodes() ){
        left.removeChild (left.firstChild)
    }
    while ( right.hasChildNodes() ){
        right.removeChild (right.firstChild)
    }



    // <div class="group">
    //                       <div class="group-team group-team-top">Team 1</div>
    //                       <div class="group-team group-team-divider"></div>
    //                       <div class="group-team group-team-bottom">Team 2</div>
    //                     </div>

    // objOption = document.createElement("option");
    // objOption.text = maxRound + "강"    
    // objOption.value = maxRound
    // selectRound.options.add(objOption)
      
    let groupLeft = document.createElement("div")
    groupLeft.classList.add('group')
    let groupRight = document.createElement("div")
    groupRight.classList.add('group')
    //group left vs rigth 1개
 

    _buildEl(groupLeft , false)
    _buildEl(groupRight , true)
    _fixedList(list)
     
    total.map( (inner , index) =>{
        let leftRound =document.createElement("div")
        let rightRound =document.createElement("div")
        leftRound.classList.add('round')
        rightRound.classList.add('round')
   

        inner.map ( (data , index)  =>{
            
            if(inner.length == 1){
                
                _lastBuildName(leftRound , false , data.left.name)
                _lastBuildName(rightRound , true , data.right.name)
                console.log(data)
                document.querySelector('#winner').innerHTML  = data.result == undefined ? ''   :  data.result.name 
                return
            }

            // _buildName(leftRound, data, groupLeft)

            if( index < inner.length / 2 ){
                _buildName(leftRound, data, groupLeft)
            }else{
                _buildName(rightRound, data, groupRight)
            }       
        })

        
         left.appendChild(leftRound)       
         right.appendChild(rightRound)

    })
    
  


    // console.log(left)
    // console.log(right)

    // _output()
    
    
}
export {_bracketBuild}
export {output}


