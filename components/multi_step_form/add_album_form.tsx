import { ReactElement, useState } from 'react'

function Step_Form_Handler( steps: ReactElement[] ){
    const [currentStepIndex, setCurrenStepIndex] = useState(0);

    function next() { setCurrenStepIndex( i => { 
        if(i >= steps.length - 1) return i
        return i + 1
    })}
    function back() { setCurrenStepIndex( i => { 
        if(i <= 0) return i
        return i - 1
    })}
    function goTo(index: number) { setCurrenStepIndex(index) }

    const title:String[] = [
        "Create new album.",
        "Insert album tracks",
        "Preview"
    ]

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        firstStep: currentStepIndex === 0,
        lastStep: currentStepIndex === steps.length -1,
        goTo,
        back,
        next,
        title
    }
}

export default Step_Form_Handler