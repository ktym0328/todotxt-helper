'use babel';

export default class TodotxtHelperView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('todotxt-helper');
    console.log("Create New View")
    const message = document.createElement('div');
    message.textContent = 'The TodoTextHelper package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      message.innerHTML = `
        <div></div>
        <div></div>
        <div>
        <h2 class="todotxt-helper-projectlist ">Link List</h2>
        <ul>
          <li>Status List</li>
          <ul>
            <li>Not finished</li>
            <li>Finished</li>
            </ul>
        </ul>
      `;
    });
  }
  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
  getTitle(){
    return 'ToDo Manage';
  }
  getURI(){
    return 'atom://todotxt-helper';
  }
  getDefaultLocation(){
    return 'right';
  }
  getAllowedLocations(){
    return ['left', 'bottom', 'right'];
  }

  getProjects(){
    console.log("Call getProjects Function!")
/* 以下tree-viewのクリック時の関数
    entryClicked: (e) ->
  if entry = e.target.closest('.entry')
    isRecursive = e.altKey or false
    @selectEntry(entry)
    if entry.classList.contains('directory')
      entry.toggleExpansion(isRecursive)
    else if entry.classList.contains('file')
      @fileViewEntryClicked(e)
      */
  }
}
