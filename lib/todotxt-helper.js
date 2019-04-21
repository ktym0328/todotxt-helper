'use babel';


import TodotxtHelperView from './todotxt-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  todotxtHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(
      atom.workspace.addOpener(uri=>{
        if(uri=='atom://todotxt-helper'){
          return new TodotxtHelperView();
        }
      })
    );

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      "todotxt-helper:InsertDate": () => this.InsertDate(),
      "todotxt-helper:OpenTaskView": () => this.OpenTaskView(),
      "todotxt-helper:ChangeState": () => this.ChangeState(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.todotxtHelperView.destroy();
  },

  dateNow(){
    NowDate = new Date()
    return `${NowDate.getFullYear()}-${(NowDate.getMonth() < 8) ? '0' : ''}${NowDate.getMonth() + 1}-${NowDate.getDate() < 10? '0' : ''}${NowDate.getDate()}`
  },

  OpenTaskView(){
    uri = 'atom://todotxt-helper'
    atom.workspace.toggle(uri)
    atom.workspace.getRightDock()
    openpanel = atom.workspace.getRightDock()
    openpanel.paneContainer.element.addEventListener("click", function(e){
      if (openpanel.getActivePaneItem().element.className == "todotxt-helper"){
        console.log(openpanel.getActivePaneItem().element.className)

        tagvalue = e.target.closest('li')
        console.log("TagValue")
        console.log(tagvalue.innerText)
        
      }
    });
  },

  InsertDate() {
    now = new Date();
    y = now.getFullYear();
    m = now.getMonth() + 1;
    d = now.getDate();
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }
    outputData = y + '-' + m + '-' + d;
    editor = atom.workspace.getActiveTextEditor()
    editor.insertText(outputData)
  },

  ChangeState(){
      ActiveEditor = atom.workspace.getActiveTextEditor()
      CursolPosition = ActiveEditor.getCursorBufferPosition()
      BufferLine = ActiveEditor.lineTextForBufferRow(CursolPosition.row)
      if (!BufferLine.match(/^x /)){
        console.log("Not finished Task!!")
        PriorityCheck = BufferLine.match(/^\(([A-Z])\) /)
        if(PriorityCheck){
          Priority = PriorityCheck[1]
          BufferLine =  `${BufferLine.substr(PriorityCheck[0].length)} Priority:${Priority}`
        }
        now = this.dateNow()
        BufferLine = `x ${now} ${BufferLine}`
        } else {
          console.log("already finished task!!")
          //すでに終了済みのタスクでChangeStateを呼ばれた場合
          // Priorityを取得する（なければそのまま）
          FlagMatch = /^x [0-9]{4}-[0-9]{2}-[0-9]{2}/
          BufferLine = BufferLine.replace(FlagMatch,'')
          console.log("BufferLine is " + BufferLine)
          console.log("MatchResult is " + BufferLine.match(FlagMatch))
          PriorityMatch = / Priority:([A-Z])/
          PriorityCheck = BufferLine.match(PriorityMatch)
//          PriorityCheck = BufferLine.match(/ Priority:([A-Z])/
          if(PriorityCheck){
            console.log("There is defined Priority")
            Priority = PriorityCheck[1]
            BufferLine = BufferLine.replace(PriorityMatch,'')
            BufferLine = BufferLine.trim()
            BufferLine = `(${Priority}) ${BufferLine}`
        }
      }
      ActiveEditor.moveToBeginningOfLine()
      ActiveEditor.deleteToEndOfLine()
      ActiveEditor.insertText(BufferLine)
      ActiveEditor.moveToBeginningOfLine()
  },
};
