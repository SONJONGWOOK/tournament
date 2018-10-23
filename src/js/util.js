/*
    기타 함수들
    이벤트 추가
    배열랜덤 셔플
*/

//이벤트 리스너 추가
const _addEventLinsten = (element , event , handler ) =>{
    element.addEventListener(event , handler )
}

const _removeEventLinsten =  (element , event , handler ) =>{
    element.removeEventListener(event , handler )
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

export {_addEventLinsten}
export {_removeEventLinsten}
export {_shuffleArr}