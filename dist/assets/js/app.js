import contacts from './Data.js';
import { addListenerAndCallback, generateId, validateData } from './helper.js';

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
		this.editContact = this.editContact.bind(this);
		this.populateData = this.populateData.bind(this);
		this.addNewContact = this.addNewContact.bind(this);		
		this.deleteContact = this.deleteContact.bind(this);		
		this.renderContacts = this.renderContacts.bind(this);
		this.getViewButtons = this.getViewButtons.bind(this);
		this.refreshContacts = this.refreshContacts.bind(this);
		this.addEditedContact = this.addEditedContact.bind(this);
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

	addEditedContact(contact) {
		let id = contact.id;
		this.contactData.delete(id);
		this.refreshContacts();
		this.addNewContact(contact);
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
		this.renderContacts();
	}

	editContact(button) {
		let contactKey = button.dataset.key;
		if(this.contactData.has(contactKey)) {
			let contactToEdit = this.contactData.get(contactKey);
			this.view.showEditTemplate(contactToEdit);
		}
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
		form.newDetailsHeader.style.backgroundImage = 'url(../images/hero.jpg)';
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
		const contactsToRender = [];
		for(let key of keys) {
			if(this.contactData.has(key)) {
				let contact = this.contactData.get(key);
				contactsToRender.push(contact);
			}
		}
		contactsToRender.sort((a, b) => {
			return a.name[0].toLowerCase() > b.name[0].toLowerCase() ? 1 : -1;
		});
		contactsToRender.forEach(contact => {
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
					<span class="contact-view-button">
						<button class="contact-btn js-view-contact" data-key="${contact.id}">view</button>
					<span>
				</div>
			`;
		});
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

	deleteContact(elem, id) {

		let key = elem.dataset.key;
		console.log(key);

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
		this.addEventListeners();
	}

	lastInit() {
		this.contactKeys = [...this.contactData.keys()];
	}
}


class View {
	constructor() {
		// get templates

		this.defaultTemplate = document.querySelector('.contacts');
		this.detailsTemplate =  document.querySelector('.contact-view');
		this.newContactTemplate = document.querySelector('.new-contact');
		this.editContactTemplate = document.querySelector('.edit-contact');

		this.templates = [this.detailsTemplate, this.newContactTemplate, this.editContactTemplate]

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
		this.showEditTemplate = this.showEditTemplate.bind(this);

		this.getBackButtons();
	}

	getBackButtons() {
		this.removeButtons = document.querySelectorAll('.js-remove-template');
		[...this.removeButtons].forEach(button => addListenerAndCallback(button, 'click', this.removeTemplates));

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
						<span class="detail-value">${contact.phone}</span>
					</li>
					<li class="detail-item">
						<span class="detail-title">Email :</span>
						<span class="detail-value">${contact.email}</span>
					</li>
				</ul>
			</div>
		`;
		this.detailsTemplate.classList.add('active-template');
		this.getUtilButtons();
	}

	// write code to display contact to edit in a form
	showEditTemplate(contact) {
		this.hideTemplates();
		this.clearTemplate(this.editContactTemplate);
		this.editContactTemplate.innerHTML += `
			<div class="details-header edit-details-header" style="background-image: url(${contact.backgroundUrl})">
				<button class="back-btn js-remove-template"></button>
				<div class="action-buttons">
					<button type="submit" class="js-save-contact" data-key="${contact.id}"></button>
				</div>
				<div class="add-image">
					<label for="edit contact image" class="file-label"></label>
					<input type="file" class="edit-contact-avatar"></input>
				</div>
			</div>
			<div class="edit-contact-body">
				<h3 class="text-title">edit contact :</h3>
				<div class="contact-form-block">
					<form class="edit-contact-form">
						<input type="text" class="edit-contact-name" value="${contact.name}" placeholder="Name" autofocus required />
						<input type="tel" class="edit-contact-phone" value="${contact.phone}" placeholder="Phone" required />
						<input type="email" class="edit-contact-email" value="${contact.email}" placeholder="Email" required />
					</form>
				</div>
			</div>
		`;
		this.showTemplate(this.editContactTemplate);
		this.getUtilButtons();
		form.getEditedContactInputs();
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

		App.attachListenerAndCallback(this.editButton, 'click', App.editContact, true);
		App.attachListenerAndCallback(this.deleteButton, 'click', App.deleteContact, true);
	}	

}


// Form class handles form inputs for both new and edited contacts 

class Form {
	constructor() {
		this.getNewContactInputs();
		this.AddNewForm = document.querySelector('.contact-form');


		this.getImageUrl = this.getImageUrl.bind(this);
		this.clearInputValues = this.clearInputValues.bind(this);
		this.enableEditSubmit = this.enableEditSubmit.bind(this);
		this.disableEditSubmit = this.disableEditSubmit.bind(this);
		this.getNewContactValues = this.getNewContactValues.bind(this);
		this.getNewContactInputs = this.getNewContactInputs.bind(this);
		this.getEditedContactInputs = this.getEditedContactInputs.bind(this);
		this.getEditedContactValues = this.getEditedContactValues.bind(this);	
		this.changeNewImageBackground = this.changeNewImageBackground.bind(this);
		this.changeEditedImageBackground = this.changeEditedImageBackground.bind(this);

		this.getNewContactInputs()
		this.addEventListeners();
	}

	addEventListeners() {
		this.AddNewForm.addEventListener('submit', this.getNewContactValues);

		this.newImageInput.addEventListener('change', () => {
			this.getImageUrl(this.newImageInput.files, true);
		});
	}

	changeNewImageBackground() {
		this.newDetailsHeader.style.backgroundImage = `url(${this.newImageURL})`;
	} 

	changeEditedImageBackground() {
		this.editDetailsHeader.style.backgroundImage = `url(${this.editImageURL})`;
	}

	enableEditSubmit() {
		this.submitEditedContact.disabled = false;
	}
	disableEditSubmit() {
		this.submitEditedContact.disabled = true;
	}

	getEditedContactInputs() {
		this.editOldForm = document.querySelector('.edit-contact-form');
		this.editNameInput = document.querySelector('.edit-contact-name');
		this.editPhoneInput = document.querySelector('.edit-contact-phone');
		this.editEmailInput = document.querySelector('.edit-contact-email');
		this.editImageInput = document.querySelector('.edit-contact-avatar');
		this.editDetailsHeader = document.querySelector('.edit-details-header');
		this.submitEditedContact = document.querySelector('.js-save-contact');
		this.disableEditSubmit();

		// get all inputs that edits contact 
		this.editContactInputs = [this.editNameInput, this.editImageInput, this.editPhoneInput, this.editEmailInput].forEach(
			input => addListenerAndCallback(input, 'change', this.enableEditSubmit)
		);

		this.editOldForm.addEventListener('submit', this.getEditedContactValues);
		addListenerAndCallback(this.submitEditedContact, 'click', this.getEditedContactValues);

		this.editImageInput.addEventListener('change', () => {
			this.getImageUrl(this.editImageInput.files, false);
		});
	}

	getNewContactInputs() {
		this.newNameInput = document.querySelector('.new-contact-name');
		this.newPhoneInput = document.querySelector('.new-contact-phone');
		this.newEmailInput = document.querySelector('.new-contact-email');
		this.newImageInput = document.querySelector('.new-contact-avatar');
		this.newDetailsHeader = document.querySelector('.new-details-header');
		this.newContactSubmit = document.querySelector('.js-new-contact');

		addListenerAndCallback(this.newContactSubmit, 'click', this.getNewContactValues);
	}

	getImageUrl(files, New = true) {
		let reader = new FileReader();
		reader.onloadend = async () => {
			let url = await reader.result;
			if(New) { 
				this.newImageURL = url;
				this.changeNewImageBackground();
			} else {
				this.editImageURL = url;
				this.changeEditedImageBackground();
			}
		}
		
		for(let i = 0; i < files.length; i++) {
			reader.readAsDataURL(files[i]);
		}
	}

	getNewContactValues(e) {
		e.preventDefault();

		let [name, phone, email] = [document.querySelector('.new-contact-name').value, document.querySelector('.new-contact-phone').value, document.querySelector('.new-contact-email').value];
		let imageUrl = this.newImageURL;
		
		let result_ok = validateData(name, phone);
		
		if(result_ok) {
			let id = generateId();
			let contact = {
				id,
				name,
				phone,
				email,
				avatarUrl: imageUrl ? imageUrl : './assets/images/user-shape.svg',
				backgroundUrl: imageUrl ? imageUrl : './assets/images/user-shape.svg'
			}

			this.AddNewForm.reset();
			App.view.removeTemplates();
			App.addNewContact(contact);
		}
		
	}
	
	getEditedContactValues(e) {
		e.preventDefault();
		let id = document.querySelector('.js-save-contact').dataset.key;

		// get form values of the edited contact
		let [name, phone, email] = [this.editNameInput.value, this.editPhoneInput.value, this.editEmailInput.value];

		// validate inputs
		let result_ok = validateData(name, phone);
		if(result_ok) {
			let editedContact = App.contactData.get(id);
			let contact = {
				id,
				name,
				phone,
				email,
				avatarUrl: this.editImageURL ? this.editImageURL : editedContact.avatarUrl,
				backgroundUrl: this.editImageURL ? this.editImageURL : editedContact.backgroundUrl,
			}

			this.editOldForm.reset();
			App.view.removeTemplates();
			App.addEditedContact(contact);
		}
	}

	clearInputValues(...inputs) {
		inputs.forEach(input => input.value = " ");
	}

}

var App = new AddressBook('shadrach', contacts);
App.view = new View();
var form = new Form();



// TODO: Change edit-submit background-image when disabled
