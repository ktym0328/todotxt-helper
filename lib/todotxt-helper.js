'use babel';

import TodotxtHelperView from './todotxt-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  todotxtHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.todotxtHelperView = new TodotxtHelperView(state.todotxtHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.todotxtHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'todotxt-helper:toggle': () => this.toggle(),
      "todotxt-helper:InsertDate": () => this.InsertDate(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.todotxtHelperView.destroy();
  },

  serialize() {
    return {
      todotxtHelperViewState: this.todotxtHelperView.serialize()
    };
  },

  toggle() {
    console.log('TodotxtHelper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
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
  }
};
