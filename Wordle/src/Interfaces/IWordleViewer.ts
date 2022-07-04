export default  interface WordleViewer {
    userEntry: Array<string>, 
    isCompleted: boolean | false
    clearContents: boolean | false,
    focusElement: number
}