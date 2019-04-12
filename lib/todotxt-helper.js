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
  OpenTaskView(){
    atom.workspace.toggle('atom://todotxt-helper')
  }
};
