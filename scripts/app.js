class AddressBook {
	constructor(name, contacts) {
		this.name = name;
		this.contacts = contacts;
		this.contactData = new Map();
		this.views = {
			default: document.querySelector('.header'),
			edit: 'active',
			add: ''
		}
		// this.viewList = ['default', 'edit', 'add']
		this.contactListTemplate = document.querySelector('.contacts');
		// this.contactViewButtons = document.querySelectorAll('button.js-view-contact');

		this.populateData = this.populateData.bind(this);
		this.currentView = this.currentView.bind(this);
		this.renderContacts = this.renderContacts.bind(this);
		this.viewContactDetails = this.viewContactDetails.bind(this);
		this.getViewButtons = this.getViewButtons.bind(this);
		this.lastInit = this.lastInit.bind(this);

		this.populateData();
		this.renderContacts();
		this.addEventListeners();
		this.lastInit();
	}

	addEventListeners() {
		[...this.contactViewButtons].forEach( button => button.addEventListener('click', this.viewContactDetails.bind({}, button.dataset.key)))

	}

	populateData() {
		for(let contact of this.contacts) {
			this.contactData.set(contact.id, contact);
		}
		console.log(this.contactData);
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
				console.log(contact);
				break;
			}
		}
	}

	renderContacts() {
		let keys = [...this.contactData.keys()];
		console.log(keys);
		for(let key of keys) {
			if(this.contactData.has(key)) {
				let contact /*{id, name, phone, email, avatar}*/ = this.contactData.get(key);
				// this.displayContact(/*{id, name, phone}*/)
				this.contactListTemplate.innerHTML += `
					<div class="contact text-center">
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

	getViewButtons() {
		this.contactViewButtons = document.querySelectorAll('.js-view-contact');
	}

	lastInit() {
		this.contactKeys = [...this.contactData.keys()];
	}
}


var contacts = [
	{id: '11a', name: 'Adeokun Victory', phone: +23418933925, email: 'adeokun.victory@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '12a', name: 'Kelvin Doe', phone: +23418933925, email: 'kelvindoe@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '13a', name: 'Jemimah Samuel', phone: +23418933925, email: 'Jemimahsamuel@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '14a', name: 'Duyile John', phone: +23418933925, email: 'duyilejohn@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '15a', name: 'Shadrach Morgan', phone: +23418933925, email: 'shadrachmorgan@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '16a', name: 'James Bond', phone: +23418933925, email: 'shadrachbond@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '17a', name: 'Brandy Morgan', phone: +23418933925, email: 'brandymorgan@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '18a', name: 'Zoey felix', phone: +23418933925, email: 'zoeyfelix@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '19a', name: 'Chris Sean', phone: +23418933925, email: 'chrissean@gmail.com', avatarUrl: './assets/images/avatar.jpg'},
	{id: '11b', name: 'Lydia Hallie', phone: +23418933925, email: 'lydiahallie@gmail.com', avatarUrl: './assets/images/avatar.jpg'}
];

var App = new AddressBook('shadrach', contacts);

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

