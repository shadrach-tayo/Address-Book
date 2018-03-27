class AddressBook {
	constructor(name, contacts) {
		// firstclass props
		this.name = name;
		this.contacts = contacts;
		this.contactData = new Map();
		this.deletedContacts = new Map();
		
		// template views
		this.contactListTemplate = document.querySelector('.contacts');

		this.lastInit = this.lastInit.bind(this);
		this.currentView = this.currentView.bind(this);
		this.populateData = this.populateData.bind(this);
		this.addNewContact = this.addNewContact.bind(this);		
		this.deleteContact = this.deleteContact.bind(this);		
		this.renderContacts = this.renderContacts.bind(this);
		this.getViewButtons = this.getViewButtons.bind(this);
		this.refreshContacts = this.refreshContacts.bind(this);
		this.viewContactDetails = this.viewContactDetails.bind(this);
		this.removeDeletedContact = this.removeDeletedContact.bind(this);
		this.showNewContactTemplate = this.showNewContactTemplate.bind(this);
		this.attachListenerAndCallback = this.attachListenerAndCallback.bind(this);

		this.showNewContact = this.showNewContact.bind(this);

		this.populateData();
		this.renderContacts();
		this.addEventListeners();
		this.lastInit();
	}

	addNewContact(contact) {
		this.contactData.set(contact.id, contact);
		this.showNewContact(contact);
	}

	showNewContact(contact) {
		this.contactListTemplate.innerHTML += `
					<div class="contact text-center" data-key="${contact.id}">
						<span class="contact-image-block">
							<img class="contact-avatar" src="${contact.avatarUrl}" alt="${contact.name}'s avatar"></img>
						</span>
						<div class="contact-details">
							<span class="contact-name">${contact.name}
							</span>
							<span class="contact-number">${contact.phone}</span>
						</div>
		
						<button class="contact-btn js-view-contact" data-key="${contact.id}">view</button>
					</div>
				`;
		console.log('new contact displayed');
		this.getViewButtons();
	}

	attachListenerAndCallback(elem, event, callback, bind = false) {
		if(bind) {
			elem.addEventListener(event, callback.bind(null, elem));
		} else {
			elem.addEventListener(event, callback);
		}
	}

	addEventListeners() {
		[...this.contactViewButtons].forEach( button => button.addEventListener('click', this.viewContactDetails.bind({}, button.dataset.key)));
		this.attachListenerAndCallback(this.addContactButton, 'click', this.showNewContactTemplate);
	}

	showNewContactTemplate() {
		this.view.showTemplate(this.view.newContactTemplate);
	}

	populateData() {
		for(let contact of this.contacts) {
			this.contactData.set(contact.id, contact);
		}
	}

	currentView() {
		for(let view of this.viewList) {
			if(this.views[view] == 'active') {
				this.views[view] == "inactive";
				return view;
			}
		}
	}

	viewContactDetails(key) {
		for(let id of this.contactKeys) {
			if(this.contactData.has(key)) {
				let contact = this.contactData.get(key);
				App.view.showDetails(contact);
					break;
			}
		}
	}

	renderContacts() {
		let keys = [...this.contactData.keys()];
		this.contactListTemplate.innerHTML = "";
		for(let key of keys) {
			if(this.contactData.has(key)) {
				let contact = this.contactData.get(key);
				this.contactListTemplate.innerHTML += `
					<div class="contact text-center" data-key="${contact.id}">
						<span class="contact-image-block">
							<img class="contact-avatar" src="${contact.avatarUrl}" alt="${contact.name}'s avatar"></img>
						</span>
						<div class="contact-details">
							<span class="contact-name">${contact.name}
							</span>
							<span class="contact-number">${contact.phone}</span>
						</div>
		
						<button class="contact-btn js-view-contact" data-key="${contact.id}">view</button>
					</div>
				`;
			}
		}
		this.getViewButtons();

	}

	removeDeletedContact() {
		let contacts = [...document.querySelectorAll('.contact')];
		for(let contact of contacts) {
			if(!this.contactData.get(contact.dataset.key)) {
				contact.parentNode.removeChild(contact);
			}
		}
	}

	deleteContact(elem) {
		let key = elem.dataset.key;
		if(this.contactData.has(key)) {
			let contact = this.contactData.get(key);
			this.contactData.delete(key);
			this.deletedContacts.set(contact.id, contact);
			this.refreshContacts();
		}
		
	}

	refreshContacts() {
		this.view.removeTemplates();
		this.removeDeletedContact();
	}

	getViewButtons() {
		this.contactViewButtons = document.querySelectorAll('.js-view-contact');
		this.addContactButton = document.querySelector('.js-add-contact');
	}

	lastInit() {
		this.contactKeys = [...this.contactData.keys()];
	}
}


var contacts = [
	{id: '11a', name: 'Adeokun Victory', phone: +23418933925, email: 'adeokun.victory@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '12a', name: 'Kelvin Doe', phone: +23418933925, email: 'kelvindoe@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '13a', name: 'Jemimah Samuel', phone: +23418933925, email: 'Jemimahsamuel@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '14a', name: 'Duyile John', phone: +23418933925, email: 'duyilejohn@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '15a', name: 'Shadrach Morgan', phone: +23418933925, phone2: +35982359852, email: 'shadrachmorgan@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '16a', name: 'James Bond', phone: +23418933925, email: 'shadrachbond@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '17a', name: 'Brandy Morgan', phone: +23418933925, email: 'brandymorgan@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '18a', name: 'Zoey felix', phone: +23418933925, email: 'zoeyfelix@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '19a', name: 'Chris Sean', phone: +23418933925, email: 'chrissean@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'},
	{id: '11b', name: 'Lydia Hallie', phone: +23418933925, email: 'lydiahallie@gmail.com', avatarUrl: './assets/images/avatar.jpg', backgroundUrl: '../images/avatar.jpg'}
];


class View {
	constructor() {
		// get templates

		this.defaultTemplate = document.querySelector('.contacts');
		this.detailsTemplate =  document.querySelector('.contact-view');
		this.newContactTemplate = document.querySelector('.new-contact');
		this.editTemplate = '';

		this.templates = [this.detailsTemplate, this.newContactTemplate]

		// bind methods 
		this.showDetails = this.showDetails.bind(this);
		this.hideDefault = this.hideDefault.bind(this);
		this.showDefault = this.showDefault.bind(this);
		this.showTemplate = this.showTemplate.bind(this);
		this.clearTemplate = this.clearTemplate.bind(this);
		this.hideTemplates = this.hideTemplates.bind(this);
		this.getUtilButtons = this.getUtilButtons.bind(this);
		this.getBackButtons = this.getBackButtons.bind(this);
		this.removeTemplates = this.removeTemplates.bind(this);

		this.getBackButtons();
	}

	getBackButtons() {
		this.removeButtons = document.querySelectorAll('.js-remove-template');
		[...this.removeButtons].forEach(button => App.attachListenerAndCallback(button, 'click', this.removeTemplates));

	}

	showDefault() {
		this.defaultTemplate.style.display = 'block';
	}

	hideDefault() {
		this.defaultTemplate.style.display = 'none';
	}

	showDetails(contact) {
		this.hideTemplates();
		this.clearTemplate(this.detailsTemplate);
		this.detailsTemplate.innerHTML += `
			<div class="details-header" style="background-image: url(${contact.backgroundUrl})">
				<button class="back-btn js-remove-template"></button>
				<div class="action-buttons">
					<button class="edit-btn js-edit-contact" data-key="${contact.id}">
					</button>
					<button class="delete-btn js-delete-contact" data-key="${contact.id}"></button>
				</div>
				<div class="contact-name">${contact.name}</div>
			</div>
			<div class="details-content">
				<ul class="details-list">
					<li class="detail-item">
						<span class="detail-title">Mobile :</span>
						<span class="detail">${contact.phone}</span>
					</li>
					<li class="detail-item">
						<span class="detail-title">Email :</span>
						<span class="detail-name">${contact.email}</span>
					</li>
				</ul>
			</div>
		`;
		this.detailsTemplate.classList.add('active-template');
		this.getUtilButtons();
	}


	hideTemplates() {
		this.defaultTemplate.style.display = 'none';
		for(let template of this.templates) {
			template.classList.remove('active-template');
		}
	}

	clearTemplate(template) {
		template.innerHTML = '';
	}

	removeTemplates() {
		this.showDefault();
		for(let template of this.templates) {
			template.classList.remove('active-template');
		}
	}

	showTemplate(template) {
		this.hideDefault();
		template.classList.add('active-template');
	}

	getUtilButtons() {
		this.editButton = document.querySelector('.js-edit-contact');
		this.deleteButton = document.querySelector('.js-delete-contact');
		this.getBackButtons();

		// this.attachListenerAndCallback(this.editButton, App.editContact);
		App.attachListenerAndCallback(this.deleteButton, 'click', App.deleteContact, true);
	}	

}


class Form {
	constructor() {
		this.getNewContactInputs();
		this.AddNewForm = document.querySelector('.contact-form');

		this.getNewContactValues = this.getNewContactValues.bind(this);
		this.getNewContactInputs = this.getNewContactInputs.bind(this);
		this.validateData = this.validateData.bind(this);
		this.generateId = this.generateId.bind(this);
		this.clearInputValues = this.clearInputValues.bind(this);

		this.getNewContactInputs()
		this.addEventListeners();
	}

	addEventListeners() {
		this.AddNewForm.addEventListener('submit', this.getNewContactValues);
	}

	getNewContactInputs() {
		this.newNameInput = document.querySelector('.new-contact-name');
		this.newPhoneInput = document.querySelector('.new-contact-phone');
		this.newEmailInput = document.querySelector('.new-contact-email');
		this.newContactSubmit = document.querySelector('.js-new-contact');

		App.attachListenerAndCallback(this.newContactSubmit, 'click', this.getNewContactValues);
	}

	getNewContactValues(e) {
		e.preventDefault();
		// this.newContactValues = [this.newNameInput.value, this.newPhoneInput.value, this.newEmailInput.value];
		let [name, phone, email] = [document.querySelector('.new-contact-name').value, document.querySelector('.new-contact-phone').value, document.querySelector('.new-contact-email').value];

		let result_ok = this.validateData(name, phone);
		if(result_ok) {
			let id = this.generateId();
			let contact = {
				id,
				name,
				phone,
				email,
				avatarUrl: './assets/images/avatar.jpg',
				backgroundUrl: '../images/avatar.jpg'
			}
			this.clearInputValues(this.newNameInput, this.newPhoneInput, this.newEmailInput);
			App.view.removeTemplates();
			App.addNewContact(contact);
		}
	}

	clearInputValues(...inputs) {
		inputs.forEach(input => input.value = " ");
	}

	validateData(name, phone) {
		if(name = '' && name.length > 20) return false;
		let phoneReg = /[0-9]{11,14}/;
		if(!phoneReg.test(phone)) return false

		return true;
	}

	generateId() { 
		let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
		let id = '';
		for(let i = 0; i < 3; i++) {
			if(i % 2 == 0) {
				id += num[Math.floor(Math.random() * 9)];
			} else {
				id += alpha[Math.floor(Math.random() * 9)];
			}
		}
		return id;
	}

}

var App = new AddressBook('shadrach', contacts);
App.view = new View();
var form = new Form();

// let values = [...contactList.values()];
// let keys = [...contactList.keys()];
// let entries = [...contactList.entries()];

// console.log(entries)

// contactList.delete('19a');

// for(key of keys) {
// 	if(contactList.has(key)) {
// 		let { name, phone} =  contactList.get(key);
// 		console.log(name, phone);
// 	}
// }
