// TODO: Why does `import { Duomo }` work but not `import Duomo`?
import { Duomo } from "../../src/runtime"

function sleep(forMs: number) {
	return new Promise(resolve => setTimeout(resolve, forMs))
}

test("integration", async () => {
	const defer = window.Duomo.init("development", { quiet: true })

	window.Duomo.setDarkMode(true)
	expect(window.Duomo.getDarkMode()).toBe(true)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("dark")

	window.Duomo.setDarkMode(false)
	await sleep(500)
	expect(window.Duomo.getDarkMode()).toBe(false)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("light")

	window.Duomo.setDarkMode(!window.Duomo.getDarkMode())
	await sleep(500)
	expect(window.Duomo.getDarkMode()).toBe(true)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("dark")

	defer()
})
