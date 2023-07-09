import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: "https://playground-8d904-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.querySelector("#input-field")
const addBtnEl = document.querySelector("#add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", () => {
	let inputValue = inputFieldEl.value
	push(shoppingListInDB, inputValue)
	clearInput()
})

onValue(shoppingListInDB, function (snapshot) {
	if (snapshot.exists()) {
		let itemsArray = Object.entries(snapshot.val())
		clearShoppingList()
		for (let i = 0; i < itemsArray.length; i++) {
			let currentItem = itemsArray[i]
			//let currentItemID = currentItem[0]
			//let currentItemValue = currentItem[1]

			appendItemShoppingListEl(currentItem)
		}
	} else {
		shoppingListEl.innerHTML = "No items here... yet"
	}
})

// Functions Block

function clearInput() {
	inputFieldEl.value = ""
}

function appendItemShoppingListEl(item) {
	let itemID = item[0]
	let itemValue = item[1]

	let newEl = document.createElement("li")
	newEl.textContent = itemValue

	newEl.addEventListener("dblclick", function () {
		let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
		remove(exactLocationOfItemInDB)
	})

	shoppingListEl.append(newEl)
}

function clearShoppingList() {
	shoppingListEl.innerHTML = ""
}
