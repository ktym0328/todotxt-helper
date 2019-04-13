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
    console.log("Call ChangeState")
      ActiveEditor = atom.workspace.getActiveTextEditor()
      CursolPosition = ActiveEditor.getCursorBufferPosition()
      BufferLine = ActiveEditor.lineTextForBufferRow(CursolPosition.row)
      console.log(BufferLine)
      if (!BufferLine.match(/^x /)){
        PriorityCheck = BufferLine.match(/^\(([A-Z])\) /)
        if(PriorityCheck){
          Priority = PriorityCheck[1]
          BufferLine =  `${BufferLine.substr(PriorityCheck[0].length)} Priority:${Priority}`
        }
        now = this.dateNow()
        BufferLine = `x ${now} ${BufferLine}`
        ActiveEditor.moveToBeginningOfLine()
        ActiveEditor.deleteToEndOfLine()
        ActiveEditor.insertText(BufferLine)
        ActiveEditor.moveToBeginningOfLine()
      }
  },
  dateNow(){
    NowDate = new Date()
    return `${NowDate.getFullYear()}-${(NowDate.getMonth() < 8) ? '0' : ''}${NowDate.getMonth() + 1}-${NowDate.getDate() < 10? '0' : ''}${NowDate.getDate()}`
  },

  OpenTaskView(){
    atom.workspace.toggle('atom://todotxt-helper')
  }
};
