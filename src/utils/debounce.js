export const debounce = (func, time = 500) => {
	let timeout
	return function () {
		const fnCall = () => func.apply(this, arguments)
		clearTimeout(timeout)
		timeout = setTimeout(fnCall, time)
	}
}
