const util = {
	isArray(v: any): boolean {
		if (Array.isArray) {
			return Array.isArray(v);
		} else {
			return Object.prototype.toString.call(v) === '[object Array]'
		}
	}
}
export {util}