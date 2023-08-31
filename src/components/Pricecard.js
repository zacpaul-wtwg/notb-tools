// components/PriceCard.js

import React, { useEffect } from "react"
import styles from "@comp/Pricecard.module.css"

const PriceCard = () => {
	useEffect(() => {
		function getDepartment(a) {
			switch (a) {
				case "6":
					return "AERIAL SPINNER"
				case "7":
					return "AERIAL ASSORTMENT"
				case "8":
					return "BOTTLE ROCKET"
				case "9":
					return "REPEATER"
				case "10":
					return "FIRECRACKER"
				case "11":
					return "MISSILE"
				case "12":
					return "PARACHUTE"
				case "13":
					return "ROMAN CANDLE"
				case "14":
					return "MORTAR"
				case "15":
					return "ROCKETS"
				case "16":
					return "500 GRAM CAKE"
				case "17":
					return "FOUNTAIN"
				case "18":
					return "GROUNDWORKS ASSORTMENT"
				case "19":
					return "NOVELTIES"
				case "20":
					return "SPARKLER"
				case "21":
					return "GROUND SPINNER"
				case "22":
					return "SMOKE"
				case "23":
					return "CASE LOT"
				default:
					return "FIREWORK"
			}
		}

		async function getAccessToken() {
			const myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json")

			const raw = JSON.stringify({
				openApiKey: "yhhN8y6htmILa4Ku",
				pin: "9357",
				password: "getmyproducts",
			})

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			}

			try {
				const response = await fetch(
					"https://ssl-openapi-northoftheborder.comcash.com/employee/auth/signin",
					requestOptions
				)
				const result = await response.text()
				const jsonData = await JSON.parse(result)
				return jsonData.accessToken
			} catch (error) {
				return console.log("error", error)
			}
		}

		const getProductData = function getProductData(barcode) {
			getAccessToken().then(function (token) {
				const myHeaders = new Headers()
				myHeaders.append("Content-Type", "application/json")
				myHeaders.append("Authorization", "Bearer " + token)

				const raw = JSON.stringify({
					barcode: barcode,
					strict: 1,
					offset: 0,
					limit: 30,
					sort: "price",
					order: "desc",
				})

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow",
				}

				fetch(
					"https://ssl-openapi-northoftheborder.comcash.com/employee/product/searchByBarcode?session_id={{sessionId}}3613",
					requestOptions
				)
					.then((response) => response.text())
					.then(function (result) {
						function inner(id, value) {
							document.querySelector("#" + id).innerHTML = value
						}

						function createDepartment(department) {
							const upperCaseDepartment = department.toUpperCase()
							inner("department", upperCaseDepartment)
						}

						function createTitle(title) {
							const upperCaseTitle = title.toUpperCase()
							inner("title", upperCaseTitle)
						}

						function createAdditional(additional) {
							const upperCaseAdditional = additional.toUpperCase()
							inner("additional", upperCaseAdditional)
						}

						function createPrice(price) {
							const cents = price.slice(price.length - 2)
							const dollars = price.slice(0, -3)
							inner("dollars", dollars)
							inner("cents", cents)
						}

						function createDescription(desc) {
							if (desc.length > 375) {
								document.querySelector("#desc").style.fontSize = "11pt"
							} else if (desc.length > 300) {
								document.querySelector("#desc").style.fontSize = "12pt"
							}

							inner("desc", desc)
						}

						function createDuration(duration) {
							let durationDisplay

							if (duration == "unlisted") {
								durationDisplay = "UNLISTED"
							} else {
								durationDisplay = duration + " SEC"
							}

							inner("duration", durationDisplay.toUpperCase())
						}

						function createHeight(height) {
							let heightDisplay

							if (height == "unlisted") {
								document.querySelector("#height-container").style.display =
									"none"
								heightDisplay = ""
							} else {
								heightDisplay = height + " FT"
							}

							inner("height", heightDisplay.toUpperCase())
						}

						function createShots(shots) {
							let shotsDisplay

							if (shots == "unlisted") {
								document.querySelector("#shots-container").style.display =
									"none"
								shotsDisplay = ""
							} else {
								shotsDisplay = shots
							}

							inner("shots", shotsDisplay.toUpperCase())
						}

						function createStyle(style) {
							let styleDisplay

							if (style == "unlisted") {
								document.querySelector("#style-container").style.display =
									"none"
								styleDisplay = ""
							} else {
								styleDisplay = style
							}

							inner("style", styleDisplay.toUpperCase())
						}

						function createColors(colors) {
							inner("colors", colors.toUpperCase().replaceAll(" ", ", "))
						}

						function createEffects(effects) {
							inner("effects", effects.toUpperCase().replaceAll(" ", ", "))
						}

						function createSounds(sounds) {
							inner("sounds", sounds.toUpperCase().replaceAll(" ", ", "))
						}

						const finalResult = JSON.parse(result)

						console.log(finalResult)

						const custAttributes = finalResult[0].customAttributes
						const department = finalResult[0].categoryId
						const title = finalResult[0].title
						const price = finalResult[0].price
						const desc =
							custAttributes.filter((object) => {
								return object.title == "description"
							})[0]?.value ?? "unlisted"
						const duration =
							custAttributes.filter((object) => {
								return object.title == "duration"
							})[0]?.value ?? "unlisted"
						const height =
							custAttributes.filter((object) => {
								return object.title == "height"
							})[0]?.value ?? "unlisted"
						const shots =
							custAttributes.filter((object) => {
								return object.title == "shot count"
							})[0]?.value ?? "unlisted"
						const style =
							custAttributes.filter((object) => {
								return object.title == "type"
							})[0]?.value ?? "unlisted"
						const effects =
							custAttributes.filter((object) => {
								return object.title == "effects"
							})[0]?.value ?? "unlisted"
						const colors =
							custAttributes.filter((object) => {
								return object.title == "colors"
							})[0]?.value ?? "unlisted"
						const sounds =
							custAttributes.filter((object) => {
								return object.title == "sounds"
							})[0]?.value ?? "unlisted"

						let additionalSpecs
						if (
							custAttributes.filter((object) => {
								return object.title == "additional"
							})[0]?.value == "unlisted"
						) {
							additionalSpecs = " "
						} else {
							additionalSpecs =
								custAttributes.filter((object) => {
									return object.title == "additional"
								})[0]?.value ?? "unlisted"
						}

						createDepartment(getDepartment(department))
						createTitle(title)
						createPrice(price)
						createDescription(desc)
						createDuration(duration)
						createHeight(height)
						createShots(shots)
						createStyle(style)
						createColors(colors)
						createEffects(effects)
						createSounds(sounds)
						createAdditional(additionalSpecs.replace(",", "<br>"))
					})
					.catch((error) => console.log("error", error))
			})
		}

		const addItemsList = function () {
			getAccessToken().then(function (token) {
				var myHeaders = new Headers()
				myHeaders.append("Content-Type", "application/json")
				myHeaders.append("Authorization", "Bearer " + token)

				var raw = JSON.stringify({
					offset: 0,
					limit: 10000,
					sort: "price",
					order: "desc",
				})

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow",
				}

				const codesContainer = document.querySelector("#codes")

				fetch(
					"https://ssl-openapi-northoftheborder.comcash.com/employee/product/list?session_id={{sessionId}}{{params}}",
					requestOptions
				)
					.then((response) => response.json())
					.then(function (result) {
						console.log(result)
						result.forEach((x) => {
							let needed =
								x.customAttributes.filter((object) => {
									return object.title == "card needed"
								})[0]?.value ?? "no"
							console.log(needed)
							if (needed == "yes") {
								let link = document.createElement("li")
								link.innerHTML = `${x.title}`
								link.addEventListener("click", function () {
									getProductData(x.skuCodes[0])
								})
								codesContainer.appendChild(link)
							}
						})
					})
			})
		}

		// const codesArray = [{code: '192537311534', title: 'SPACE RACE VOYAGER'}, {code: '192537311527', title: 'SPACE RACE OPPORTUNITY'}]
		const codesArray = []
		addItemsList(codesArray)
	}, [])

	return (
		<div className={styles.card}>
			<div className={styles.containerLeft}>
				<div className={styles.leftBox}>
					<div className={styles.price} id="price">
						{/* Rest of the price JSX */}
					</div>
					<div className={styles.title} id="title">
						{/* Rest of the title JSX */}
					</div>
					<div className={styles.desc} id="desc">
						{/* Rest of the description JSX */}
					</div>
				</div>
			</div>
			<div className={styles.containerRight}>
				{/* Rest of the container right JSX */}
			</div>
			<h2 className={styles.codes}>
				Click an item below to load price card information.
			</h2>
			<ul className={styles.codes} id="codes">
				{/* Rest of the codes JSX */}
			</ul>
		</div>
	)
}

export default PriceCard
