'use babel';

export default class TodotxtHelperView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('todotxt-helper');
    
    const message = document.createElement('div');
    message.textContent = 'The TodoTextHelper package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
    this.subscriptions = atom.workspace.getCenter().observeActivePaneItem(item => {
      message.innerHTML = `
        <div></div>
        <div></div>
        <div>
        <h2 class="todotxt-helper-projectlist ">Project List</h2>
        <div id="projectlist-data"></div>
        </div>
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
}
